<template>
  <div class="authority">
    <warning-bar title="注：账号批量注册" />
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-input
          v-model="searchText"
          placeholder="请输入任务名称"
          clearable
          style="width: 200px"
        />
        <el-button
          type="primary"
          icon="Search"
        >搜索</el-button>
        <el-button
          type="primary"
          icon="CirclePlus"
          @click="()=>{drawer = true
                       RefreshAvailableConcurrency()
          }"
        >新建任务</el-button>
        <el-tooltip placement="top">
          <template #content> 选择任一任务并暂停。请注意，发送暂停信号后可能会有短暂延迟才能完全停止<br> </template>
          <el-button
            icon="Bell"
            type="primary"
            :disabled="multipleSelection.length != 1 ? true : false"
            @click="pauseTask()"
          >暂停任务</el-button>
        </el-tooltip>

        <el-tooltip placement="top">
          <template #content> 选择任一已暂停任务。请注意，发送恢复信号后可能会有短暂延迟才能完全停止<br> </template>
          <el-button
            icon="Bell"
            type="primary"
            :disabled="multipleSelection.length != 1 ? true : false"
            @click="resumeTask()"
          >恢复任务</el-button>
        </el-tooltip>

        <el-button
          type="primary"
          icon="refresh"
          @click="getTableData()"
        >刷新</el-button>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="暂未开发，敬请期待"
          placement="top-start"
        />
        <el-tooltip
          class="box-item"
          effect="dark"
          content="暂未开发，敬请期待"
          placement="top-start"
        />

        <el-tooltip
          class="box-item"
          effect="dark"
          content="暂未开发，敬请期待"
          placement="top-start"
        />
      </div>
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="authorityId"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="ID"
          min-width="180"
          prop="ID"
        />
        <el-table-column
          align="left"
          label="任务名称"
          min-width="180"
          prop="task_name"
        />
        <el-table-column
          align="left"
          label="文件名称"
          min-width="180"
          prop="file_name"
        />
        <el-table-column
          align="left"
          label="任务状态"
          min-width="180"
        >
          <template #default="{ row }">
            <el-button
              :type="getButtonType(row.status)"
              size="small"
              :loading="row.status == 'Running'"
              :icon="getButtonIcon(row.status)"
              plain
            >{{ getStatusButtonType(row.status) }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="并发数"
          min-width="180"
          prop="concurrency"
        />
        <el-table-column
          align="left"
          label="成功"
          min-width="180"
          prop="success_count"
        />
        <el-table-column
          align="left"
          label="封号"
          min-width="180"
          prop="blocked_count"
        />
        <el-table-column
          align="left"
          label="风控1小时"
          min-width="180"
        >
          <template #default="scope">
            {{ scope.row.no_routes_count + scope.row.too_recent_count }}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="非官方"
          min-width="180"
          prop="office_count"
        />
        <el-table-column
          align="left"
          label="总数"
          min-width="180"
          prop="totalNumber"
        />
        <el-table-column
          align="left"
          label="创建时间"
          min-width="180"
          prop="formattedCreatedAt"
        />
        <el-table-column
          align="left"
          label="更新时间"
          min-width="180"
          prop="formattedUpdatedAt"
        />
        <el-table-column
          align="left"
          label="操作"
          width="260"
          fixed="right"
        >
          <template #default="scope">
            <div class="button-group">
              <el-button
                icon="Files"
                type="primary"
                link
                @click="
                  $router.push({
                    name: 'subtask',
                    params: { id: scope.row.ID },
                  })
                "
              >详情</el-button>
              <!-- <el-button
                icon="Edit"
                link
                type="primary"
              >更新并发数</el-button> -->
              <el-button
                icon="delete"
                type="primary"
                link
                :disabled="scope.row.status == 'Running'"
                @click="deleteTask(scope.row)"
              >删除</el-button>

              <el-dropdown
                trigger="click"
                class="el-button-like"
              >
                <el-button
                  class="button-with-icon-right ml-3"
                  type="primary"
                  link
                  icon="More"
                >更多操作</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-if="
                        scope.row.nonDisabledAccounts > 0 &&
                          scope.row.DisabledAccounts > 0
                      "
                    >什么都没有</el-dropdown-item>
                    <el-dropdown-item
                      @click="downloadNonExecutionAccountsAsTxt(scope.row)"
                    >下载未执行账号(txt)</el-dropdown-item>
                    <el-dropdown-item
                      @click="downloadNonExecutionAccountsAsExcel(scope.row)"
                    >下载未执行账号(excel)</el-dropdown-item>
                    <el-dropdown-item
                      @click="downloadBlockedAccountsAsTxt(scope.row)"
                    >下载封号账号(txt)</el-dropdown-item>
                    <el-dropdown-item
                      @click="downloadBlockedAccountsAsExcel(scope.row)"
                    >下载封号账号(xlsx)</el-dropdown-item>
                    <el-dropdown-item
                      @click="downloadRiskControlAccountsAsTxt(scope.row)"
                    >下载风控账号(txt)</el-dropdown-item>
                    <el-dropdown-item
                      @click="downloadRiskControlAccountsAsExcel(scope.row)"
                    >下载风控账号(xlsx)</el-dropdown-item>
                    <el-dropdown-item
                      @click="downloadSuccessAccountsAsTxt(scope.row)"
                    >下载成功账号(txt)</el-dropdown-item>
                    <el-dropdown-item
                      @click="downloadSuccessAccountsAsExcel(scope.row)"
                    >下载成功账号(xlsx)</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>

    <el-drawer
      v-model="drawer"
      title="新建任务"
      :before-close="handleClose"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item
          label="任务名称"
          prop="taskName"
        >
          <el-input
            v-model="form.taskName"
            autocomplete="off"
            placeholder="请输入任务名称"
          />
        </el-form-item>

        <el-form-item
          label="国家区号"
          prop="country"
        >
          <el-select
            v-model="form.country_id"
            filterable
            placeholder="请选择国家区号"
            style="width: 100%"
          >
            <el-option
              v-for="item in countryInfoList"
              :key="item.ID"
              :label="`${item.code} ${item.name} ${item.dialingCode}`"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="并发数"
          prop="concurrency"
        >
          <el-input
            v-model.number="form.concurrency"
            type="number"
            placeholder="并发数"
            :min="1"
            :max="1000"
            style="width: 100%"
          />
          <span class="text-sm text-orange-300 mt-2">当前可用并发数{{
            concurrencyInfo.concurrencyLimit -
              concurrencyInfo.currentConcurrency
          }}</span>
          <el-icon
            class="mt-2 cursor-pointer"
            :class="{ rotate: isRefreshing }"
            style="margin-left: 4px"
            :size="12"
            @click="RefreshAvailableConcurrency()"
          ><Refresh /></el-icon>
        </el-form-item>

        <!-- 标签和账号类型分为一行两列 -->
        <el-row>
          <el-col>
            <!-- 标签选项 -->
            <el-form-item label="标签">
              <el-select
                v-model="form.tag_id"
                class="w-full"
                placeholder="请选择标签"
              >
                <el-option
                  v-for="item in accoutTagInfo"
                  :key="item.ID"
                  :label="item.name"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 标签和账号类型分为一行两列 -->
        <el-row>
          <el-col>
            <!-- 标签选项 -->
            <el-form-item label="分组">
              <el-select
                v-model="form.group_id"
                class="w-full"
                placeholder="请选择分组"
              >
                <el-option
                  v-for="item in accoutGroupInfo"
                  :key="item.ID"
                  :label="item.name"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 标签和账号类型分为一行两列 -->
        <el-row :gutter="20" />
        <!-- <el-form-item label="任务操作">
          <el-radio-group v-model="form.immediate">
            <el-radio :label="true">立即开始</el-radio>
            <el-radio :label="false">仅创建任务</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item
          label="上传文件"
          prop="file"
        >
          <el-upload
            class="upload-demo"
            :file-list="fileList"
            :on-change="handleUploadChange"
            :before-upload="() => false"
          >
            <el-button slot="trigger">选择文件</el-button>
          </el-upload>
          <div v-if="form.file">{{ form.file.name }}</div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="Position"
            class="w-[7rem] rounded"
            @click="submitForm"
          >
            提交
          </el-button>

          <el-button
            icon="RefreshLeft"
            class="w-[7rem] rounded"
            @click="resetForm"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  getRegisterTaskList,
  createRegisterTask,
  DownloadBlockedAccountsAsTxt,
  DownloadBlockedAccountsAsExcel,
  DownloadRiskControlAccountsAsTxt,
  DownloadRiskControlAccountsAsExcel,
  DownloadSuccessAccountsAsTxt,
  DownloadSuccessAccountsAsExcel,
  DownloadNonExecutionAccountsAsTxt,
  DownloadNonExecutionAccountsAsExcel,
  deleteRegisterTask,
  PauseTask,
  ResumeTask,
} from '@/api/registerTask'
import { getCountryInfoList } from '@/api/country'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref, nextTick, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAvailableConcurrency } from '@/api/user'
import { getAccountTagInfoList } from '@/api/accoutTag'
import { getAccountGroupInfoList } from '@/api/accoutGroup'

const handleClose = (done) => {
  done()
}

defineOptions({
  name: 'Register',
})

const drawer = ref(false)

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchText = ref('')
const currentSearchText = ref('')
const isRefreshing = ref(false)
const handlePageChange = (val) => {
  page.value = val
  getTableData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

watch(() => drawer.value, (value) => {
  if (value) {
    initForm()
  }
})

const concurrencyInfo = ref({
  concurrencyLimit: 0,
  currentConcurrency: 0,
})

const RefreshAvailableConcurrency = async() => {
  isRefreshing.value = true

  const res = await getAvailableConcurrency()
  concurrencyInfo.value = res.data
  setTimeout(() => {
    isRefreshing.value = false
  }, 1000)
}

const getTableData = async(sortProp, sortOrder) => {
  const table = await getRegisterTaskList({
    page: page.value,
    pageSize: pageSize.value,
    taskName: currentSearchText.value,
    sort: sortProp,
    order: sortOrder,
  })
  if (table.code === 0) {
    tableData.value = []
    setTimeout(() => {
      tableData.value = table.data.list

      // if (shouldAutoRefresh(table.data.list)) {
      //   startAutoRefresh()
      // } else {
      //   stopAutoRefresh()
      // }
    }, 100)
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// 删除任务
const deleteTask = (row) => {
  ElMessageBox.confirm('此操作将永久删除该任务及相关账号, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async() => {
      const res = await deleteRegisterTask({ ID: row.ID })
      if (res.code === 0 || res == null) {
        ElMessage({
          type: 'success',
          message: '任务删除成功 !',
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
        // 当删除后没有运行中的任务时，停止自动刷新
        if (!tableData.value.some((item) => item.status === 'Running')) {
          stopAutoRefresh()
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

// 暂停任务
const pauseTask = (row) => {
  if (multipleSelection.value.length !== 1) {
    ElMessage({
      type: 'info',
      message: '目前暂停任务只支持单个任务进行暂停',
    })
  }
  ElMessageBox.confirm('此操作将暂停该任务, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async() => {
      const res = await PauseTask(multipleSelection.value[0].ID)
      if (res.code === 0 || res == null) {
        ElMessage({
          type: 'success',
          message: '任务暂停成功 !',
        })
        getTableData()
        // 当删除后没有运行中的任务时，停止自动刷新
        if (!tableData.value.some((item) => item.status === 'Running')) {
          stopAutoRefresh()
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消暂停',
      })
    })
}

// 恢复任务
const resumeTask = (row) => {
  if (multipleSelection.value.length !== 1) {
    ElMessage({
      type: 'info',
      message: '目前恢复任务只支持单个任务进行恢复',
    })
  }
  ElMessageBox.confirm('您确定要恢复该任务吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async() => {
      const res = await ResumeTask(multipleSelection.value[0].ID)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '任务恢复成功 !',
        })
        getTableData()
        // 当删除后没有运行中的任务时，停止自动刷新
        if (!tableData.value.some((item) => item.status === 'Running')) {
          stopAutoRefresh()
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消恢复任务',
      })
    })
}

const getStatusButtonType = (status) => {
  switch (status) {
    case 'Pending':
      return '等待'
    case 'Success':
      return '已成功'
    case 'Failed':
      return '失败'
    case 'Running':
      return '运行中'
    case 'Pause':
      return '已暂停'
    default:
      return ''
  }
}

const getButtonType = (status) => {
  switch (status) {
    case 'Pending':
      return 'warning'
    case 'Success':
      return 'success'
    case 'Failed':
      return 'danger'
    case 'Running':
      return 'info'
    case 'Pause':
      return 'danger'
    default:
      return ''
  }
}

const getButtonIcon = (status) => {
  switch (status) {
    case 'Pending':
      return 'el-icon-clock'
    case 'Success':
      return 'CircleCheck'
    case 'Failed':
      return 'el-icon-circle-close'
    case 'Running':
      return 'el-icon-loading'
    case 'Pause':
      return 'VideoPlay'
    default:
      return ''
  }
}
// 新建任务
const formRef = ref(null)

const fileList = ref([])
const handleUploadChange = (file, fileListUpdated) => {
  fileList.value = fileListUpdated
  if (fileListUpdated.length > 0) {
    form.file = fileListUpdated[0].raw
  } else {
    form.file = null
  }
}

const form = reactive({
  taskName: '',
  country_id: null,
  concurrency: 1,
  file: null,
  tag_id: null,
  immediate: true, // 默认为立即开始
  group_id: null,
})

const initForm = () => {
  // 使用 nextTick 确保在 DOM 更新完成后执行 resetFields
  nextTick(() => {
    // 检查 Form.value 是否已经被正确设置为表单实例
    if (Form.value) {
      Form.value.resetFields()
    } else {
      // 如果 Form.value 是 null，这可能意味着 <el-form> 还未挂载
      // 或 ref="Form" 未能正确绑定。请检查你的模板部分。
      console.error('The form reference \'Form\' is not available.')
    }
  })

  refreshAccoutTagInfo()
  refreshAccoutGroupInfo()
  refreshCountryInfoList()

  // 重置 form 对象以匹配默认值
  form.value = {
    taskName: '',
    country: null,
    concurrency: 1,
    file: null,
    tag_id: null,
    immediate: true, // 默认为立即开始
    group_id: null,
  }
}

const rules = {
  taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  file: [{ required: true, message: '请上传文件', trigger: 'change' }],
  countryCode: [
    { required: true, message: '请选择国家区号', trigger: 'change' },
  ],
  concurrency: [
    { required: true, message: '请输入并发数', trigger: 'blur' },
    { type: 'number', message: '并发数必须为数字值', trigger: 'blur' },
  ],
}

const submitForm = async() => {
  const valid = await formRef.value.validate()
  if (!valid) return

  // 创建一个 FormData 对象
  const formData = new FormData()
  formData.append('taskName', form.taskName)
  formData.append('country_id', form.country_id)
  formData.append('concurrency', form.concurrency)
  formData.append('tag_id', form.tag_id)
  formData.append('group_id', form.group_id)
  formData.append('immediate', form.immediate)
  // 检查是否有文件要上传
  if (form.file) {
    formData.append('file', form.file, form.file.name)
  }

  try {
    // 调用 API 并传入 FormData
    const res = await createRegisterTask(formData)
    if (res.code === 0) {
      ElMessage.success('创建成功！')
      setTimeout(() => {
        getTableData()
      }, 500)
    }

    // handleClose()
  } catch (error) {
    ElMessage.error(error.message || '创建任务失败')
  }
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 以TXT格式下载被封锁的帐号
const downloadBlockedAccountsAsTxt = async(row) => {
  await downloadFile(DownloadBlockedAccountsAsTxt, row, '封锁账号.txt')
}

// 以excel格式下载被封锁的帐户
const downloadBlockedAccountsAsExcel = async(row) => {
  await downloadFile(DownloadBlockedAccountsAsExcel, row, '封锁账号.xlsx')
}

// 以TXT格式下载风控账户
const downloadRiskControlAccountsAsTxt = async(row) => {
  await downloadFile(DownloadRiskControlAccountsAsTxt, row, '风控账号.txt')
}

// 以excel格式下载风控账号
const downloadRiskControlAccountsAsExcel = async(row) => {
  await downloadFile(DownloadRiskControlAccountsAsExcel, row, '风控账号.xlsx')
}

// 以excel格式下载成功账号
const downloadSuccessAccountsAsTxt = async(row) => {
  await downloadFile(DownloadSuccessAccountsAsTxt, row, '成功账号.txt')
}

// 以excel格式下载成功账号
const downloadSuccessAccountsAsExcel = async(row) => {
  await downloadFile(DownloadSuccessAccountsAsExcel, row, '成功账号.xlsx')
}

// 以excel格式下载未执行账号
const downloadNonExecutionAccountsAsTxt = async(row) => {
  await downloadFile(DownloadNonExecutionAccountsAsTxt, row, '未执行账号.txt')
}

// 以excel格式下载未执行账号
const downloadNonExecutionAccountsAsExcel = async(row) => {
  await downloadFile(DownloadNonExecutionAccountsAsExcel, row, '未执行账号.xlsx')
}

// 通用的下载文件函数
const downloadFile = async(downloadFunc, row, fileName, delay = 3000) => {
  try {
    ElMessage.info('准备下载，请稍候...')
    const response = await downloadFunc(row.ID)

    if (response && response.data) {
      console.log(`开始下载 ${fileName}`, response)
      const blob = new Blob([response.data], { type: 'text/plain' })

      setTimeout(() => {
        // 延迟下载
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        ElMessage.success('下载成功')
      }, delay)
    } else {
      ElMessage.error(`下载 ${fileName} 失败：没有数据返回`)
    }
  } catch (error) {
    ElMessage.error('下载出错')
    console.error('下载出错', error)
  }
}

const accoutGroupInfo = ref([])
// 查询
const refreshAccoutGroupInfo = async() => {
  const result = await getAccountGroupInfoList(1, 100)
  if (result.code === 0 && Array.isArray(result.data.list)) {
    accoutGroupInfo.value = []
    setTimeout(() => {
      accoutGroupInfo.value = result.data.list
    }, 100)
    total.value = result.data.total
    page.value = result.data.page
    pageSize.value = result.data.pageSize
  }
}

const accoutTagInfo = ref([])

const refreshAccoutTagInfo = async() => {
  const info = await getAccountTagInfoList(1, 100)
  if (info.code === 0) {
    accoutTagInfo.value = []
    setTimeout(() => {
      accoutTagInfo.value = info.data.list
    }, 100)
    total.value = info.data.total
    page.value = info.data.page
    pageSize.value = info.data.pageSize
  }
}
const countryInfoList = ref([])
const refreshCountryInfoList = async() => {
  const result = await getCountryInfoList(1, 300)
  if (result.code === 0 && Array.isArray(result.data.list)) {
    countryInfoList.value = []
    setTimeout(() => {
      countryInfoList.value = result.data.list
    }, 100)
    total.value = result.data.total
    page.value = result.data.page
    pageSize.value = result.data.pageSize
  }
}

const multipleTableRef = ref(null)
const multipleSelection = ref([])
const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value.clearSelection()
  }
}
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
</script>

<style lang="scss">
.authority {
  .el-input-number {
    margin-left: 15px;
    span {
      display: none;
    }
  }
}
.tree-content {
  margin-top: 10px;
  height: calc(100vh - 158px);
  overflow: auto;
}

.button-group {
  display: flex;
  align-items: center;
}

.el-button-like {
  line-height: normal;
  color: #409eff;
  padding: 0;
  border: none;
  background: none;
}

.el-button-like .el-button {
  padding: 0;
  margin-right: 10px;
}

.el-button-like .el-button:focus,
.el-button-like .el-button:hover {
  color: #66b1ff;
  background: none;
  border-color: transparent;
}

.rotate {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
