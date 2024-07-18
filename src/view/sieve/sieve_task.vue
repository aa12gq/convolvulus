<template>
  <div class="box">
    <warning-bar
      title="为确保系统顺畅运行，我们采用了先进的性能优化技术，系统将定期自动清理当天的账号检测信息以保障高效稳定的服务。请您及时下载并妥善保存信息 感谢您的理解与支持"
    />
    <warning-bar
      title="单次任务文件下号码大于20w暂不支持恢复"
    />
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- 按钮区域 -->
        <div class="button-section">
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
        <!-- 搜索框区域 -->
        <div class="search-section flex space-x-4 -ml-2">
          <el-input
            v-model="searchText"
            placeholder="请输入任务名称"
            clearable
            style="width: 200px"
            @clear="clearSearch"
            @keyup.enter.native="searchTask"
          />
          <el-button
            class="bg-[#4773C5] text-gray-100 hover:bg-[#729cea] active:bg-[#729cea] active:transform active:!scale-90 active:!shadow-lg"
            @click="searchTask"
          >查询</el-button>
          <el-button
            class="bg-[#4773C5] text-gray-100 hover:bg-[#729cea] active:bg-[#729cea] active:transform active:!scale-90 active:!shadow-lg"
            @click="
              () => {
                openDialog('add');
                RefreshAvailableConcurrency();
              }
            "
          >添加任务</el-button>
        </div>

        <el-Button
          class="bg-[#CFAB86] text-gray-100"
          :disabled="multipleSelection.length == 0"
          @click="batchPause()"
        >
          批量暂停
        </el-Button>
        <el-Button
          class="bg-[#CFAB86] text-gray-100"
          :disabled="multipleSelection.length == 0"
          @click="batchRecover()"
        >
          批量恢复
        </el-Button>
        <el-Button
          class="bg-[#CFAB86] text-gray-100"
          danger
          :disabled="multipleSelection.length == 0"
          @click="batchDelete()"
        >
          批量删除
        </el-Button>
        <el-Button
          class="bg-[#4773C5] text-gray-100 hover:bg-[#729cea] active:bg-[#729cea] active:transform active:!scale-90 active:!shadow-lg"
          @click="getTableData"
        >刷新一下</el-Button>
        <el-tooltip
          class="item"
          effect="dark"
          content="在任务完成后，如果系统未自动同步您的线程数，请点击此按钮以同步线程配置, 请注意，每半小时内最多只能同步五次。"
          placement="top"
        >
          <el-Button
            class="bg-[#28a745] text-white hover:bg-[#218838] active:bg-[#1e7e34] active:transform active:!scale-90 active:!shadow-lg ml-auto"
            @click="syncConcurrency"
          >同步线程配置</el-Button>
        </el-tooltip>

      </div>

      <el-table
        ref="multipleTableRef"
        :data="tableData"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        style="width: 100%"
        stripe
        :summary-method="customSummary"
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="ID"
          width="60"
          prop="ID"
        />
        <el-table-column
          v-if="userStore.userInfo.authorityId == 999"
          label="UID"
          width="60"
          prop="UserID"
        />
        <el-table-column
          v-if="userStore.userInfo.authorityId == 999"
          label="昵称"
          width="60"
          prop="nick_name"
        />
        <el-table-column
          v-if="userStore.userInfo.authorityId == 999"
          label="用户名"
          width="80"
          prop="user_name"
        />
        <el-table-column
          align="left"
          label="任务名称"
          min-width="120"
          prop="taskName"
        >
          <template #default="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.taskName"
              placement="top"
            >
              <div class="text-ellipsis">
                {{
                  scope.row.taskName.length > 6
                    ? scope.row.taskName.substr(0, 6) + "..."
                    : scope.row.taskName
                }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="文件名称"
          width="140"
          prop="file_name"
        >
          <template #default="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.file_name"
              placement="top"
            >
              <div class="text-ellipsis whitespace-nowrap">
                {{
                  scope.row.file_name.length > 10
                    ? scope.row.file_name.substr(0, 10) + "..."
                    : scope.row.file_name
                }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          align="left"
          label="状态"
          min-width="130"
        >
          <template #default="{ row }">
            <el-tag
              :color="getStatusTag(row.status)"
              effect="dark"
            >
              {{ getStatusButtonType(row.status, row) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          align="left"
          label="正常"
          min-width="140"
          prop="nonDisabledAccounts"
        >
          <template #default="{ row }">
            {{ row.nonDisabledAccounts }}
            <span v-if="row.totalNumber > 0">
              ({{
                row.nonDisabledAccounts === 0
                  ? "0%"
                  : ((row.nonDisabledAccounts / row.totalNumber) * 100).toFixed(
                    2
                  ) + "%"
              }})
            </span>
            <span v-else> (0%) </span>
          </template>
        </el-table-column>

        <el-table-column
          align="left"
          label="封禁"
          min-width="140"
          prop="disabledAccounts"
        >
          <template #default="{ row }">
            {{ row.disabledAccounts }}
            <span v-if="row.totalNumber > 0">
              ({{
                row.disabledAccounts === 0
                  ? "0%"
                  : ((row.disabledAccounts / row.totalNumber) * 100).toFixed(
                    2
                  ) + "%"
              }})
            </span>
            <span v-else>0%</span>
          </template>
        </el-table-column>

        <el-table-column
          align="left"
          label="无效"
          min-width="140"
          prop="invalidAccounts"
        >
          <template #default="{ row }">
            {{ row.invalidAccounts }}
            <span v-if="row.totalNumber > 0">
              ({{
                row.invalidAccounts === 0
                  ? "0%"
                  : ((row.invalidAccounts / row.totalNumber) * 100).toFixed(2) +
                    "%"
              }})
            </span>
            <span v-else>0%</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="总数"
          min-width="90"
          prop="totalNumber"
        >
          <template #default="{ row }">
            {{ row.totalNumber }}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="线程数"
          min-width="80"
          prop="realConcurrency"
        />
        <el-table-column
          v-if="userStore.userInfo.authorityId == 999"
          align="left"
          label="真实线程数"
          min-width="100"
          prop="concurrency"
        />
        <el-table-column
          align="left"
          label="添加时间"
          min-width="180"
          prop="createdAt"
          sortable="custom"
          :formatter="
            (row) => dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
          "
        />
        <el-table-column
          align="left"
          label="更新时间"
          min-width="180"
          prop="updatedAt"
          sortable="custom"
          :formatter="
            (row) => dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
          "
        />
        <el-table-column
          v-if="userStore.userInfo.authorityId == 999"
          align="left"
          label="任务耗时"
          min-width="160"
          sortable="custom"
        >
          <template #default="{ row }">
            {{
              row.status === "Running"
                ? formatDuration(dayjs().diff(dayjs(row.updatedAt), "second"))
                : formatDuration(
                  dayjs(row.updatedAt).diff(dayjs(row.createdAt), "second")
                )
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          width="150"
          fixed="right"
        >
          <template #default="scope">
            <!-- Button Group Container -->
            <div class="button-group">
              <el-button
                type="warning"
                link
                :disabled="scope.row.status == 'Running'"
                @click="deleteTask(scope.row)"
              >删除</el-button>
              <!-- 更多操作 Dropdown -->
              <el-dropdown
                trigger="click"
                class="el-button-like !text-[black]"
              >
                <el-button
                  class="button-with-icon-right ml-3 text-gray-500"
                  link
                >更多操作</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-if="scope.row.status === 'Pause' && scope.row.totalNumber <= 200000"
                      @click.native="openRecover(scope.row)"
                    >恢复</el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.status === 'Running'"
                      @click.native="openPause(scope.row)"
                    >暂停</el-dropdown-item>
                    <el-dropdown-item
                      v-if="
                        scope.row.nonDisabledAccounts > 0 &&
                          scope.row.DisabledAccounts > 0
                      "
                    >什么都没有</el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.normal_file_path !=''"
                      @click="downloadNormal(scope.row)"
                    >下载正常账号</el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.disabled_file_path != ''"
                      @click="downloadDisable(scope.row)"
                    >下载封禁账号</el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.invalid_file_path != ''"
                      @click="downloadInvalid(scope.row)"
                    >下载无效账号</el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.non_disabled_or_disabled_file_path != ''"
                      @click="downloadAll(scope.row)"
                    >下载正常及封禁账号</el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.file_path != ''"
                      @click="downloadOrigin(scope.row)"
                    >下载原始文件</el-dropdown-item>
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
    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      modal
      width="600px"
      :close-on-click-modal="false"
      draggable
      :show-close="false"
    >
      <template #header="{ close, titleId }">
        <div class="h-10 flex justify-between">
          <h4
            :id="titleId"
            class="text-xl"
          >{{ dialogTitle }}</h4>
          <el-button
            type="danger"
            class="mt-5"
            @click="()=>{
              close()
              if(form.filePath != ''){
                deleteFile(form.filePath)
              }
            }"
          >
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            关闭
          </el-button>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <div class="flex w-full space-x-2">
          <el-form-item
            label="任务名称"
            prop="taskName"
            class="w-full"
          >
            <el-input
              v-model="form.taskName"
              autocomplete="off"
              placeholder="请输入任务名称"
            />
          </el-form-item>
          <el-button
            class="bg-[#EEF1FE] text-sm"
            @click="generateRandomTaskName"
          >生成任务名称</el-button>
        </div>

        <!-- 添加按钮来触发生成随机任务名称的方法 -->

        <!-- <el-form-item
          label="国家区号"
          prop="country_id"
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
        </el-form-item> -->
        <el-form-item
          label="线程数"
          prop="concurrency"
        >
          <el-input
            v-model.number="form.concurrency"
            type="number"
            placeholder="线程数"
            :min="1"
            :max="1000"
            style="width: 100%"
          />
          <span class="text-sm text-orange-300 mt-2">当前可用线程数{{
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

        <el-form-item
          label="上传文件"
          prop="file"
        >
          <el-upload
            ref="uploadRef"
            class="upload-demo w-full"
            :file-list="fileList"
            :on-change="handleUploadChange"
            :auto-upload="false"
            drag
          >
            <template #trigger>
              <el-button class="bg-gray-100 rounded-none hover:text-">选择文件</el-button>
            </template>
            <el-tooltip
              effect="dark"
              content="为了最佳优化，请将手机号以.txt格式上传，并确保每行只包含一个手机号"
              placement="top"
            >
              <el-icon
                style="margin-left: 4px"
                :size="12"
              ><Warning /></el-icon>
            </el-tooltip>
          </el-upload>
          <el-progress
            v-if="uploadPercentage > 0"
            :percentage="uploadPercentage"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-preReClick
            type="primary"
            class="w-[7rem] cursor-pointer text-gray-100 button-click-effect"
            @click="submitForm"
          >添加</el-button>
          <el-button
            color="#DEDCD2"
            class="w-[7rem] rounded ml-2 button-click-effect"
            @click="resetForm"
          >清空</el-button>
        </el-form-item>
      </el-form>
      <el-progress
        v-if="isShowProgress"
        :percentage="loadingProgress"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSieveTask,
  DeleteFile,
  deleteSieveTask,
  downloadAllAccounts,
  downloadDisableAccounts,
  downloadInvalidAccounts,
  downloadNormalAccounts,
  downloadOriginFile,
  getSieveTaskList,
  pauseTask,
  recoverTask,
  SyncConcurrency,
  UploadFile
} from '@/api/sieve'
import {getAvailableConcurrency} from '@/api/user'
import {onMounted, onUnmounted, reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {CircleCloseFilled} from '@element-plus/icons-vue'
import WarningBar from '@/components/warningBar/warningBar.vue'
import dayjs from 'dayjs'
import {useUserStore} from '@/pinia/modules/user'

const userStore = useUserStore()
const loadingProgress = ref(0)
const isShowProgress = ref(false)
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchText = ref('')
const currentSearchText = ref('')
const isRefreshing = ref(false)
const uploadPercentage = ref(0)

const generateRandomTaskName = () => {
  form.taskName = '任务-' + Math.floor(Math.random() * 1000)
}

// 显示 一分钟5秒(65s) 一小时5分钟(3605s) 一天5小时(86405s
// 定义格式化耗时函数
const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds}秒`
  } else {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}分钟${
      remainingSeconds > 0 ? remainingSeconds + '秒' : ''
    }(${seconds}秒)`
  }
}

const handlePageChange = (val) => {
  page.value = val
  getTableData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const searchTask = async() => {
  currentSearchText.value = searchText.value
  await getTableData()
}

const clearSearch = () => {
  searchText.value = ''
  currentSearchText.value = ''
  pageSize.value = 10
  getTableData() // 重新获取数据，不带搜索条件
}

// 查询
const getTableData = async(sortProp, sortOrder) => {
  const params = {
    page: page.value,
    pageSize: pageSize.value,
    taskName: currentSearchText.value,
  }

  if (typeof sortProp === 'string' && typeof sortOrder === 'string') {
    params.sort = sortProp
    params.order = sortOrder
  }

  const table = await getSieveTaskList(params)
  if (table.code === 0) {
    setTimeout(() => {
      tableData.value = table.data.list
    }, 100)
    total.value = table.data.total
    page.value = table.data.page
    if (table.data.pageSize !== 0) {
      pageSize.value = table.data.pageSize
    }
  }
}

getTableData()

const handleSortChange = ({ prop, order }) => {
  if (!order) {
    order = null
    prop = null
  } else {
    order = order === 'ascending' ? 'asc' : 'desc'
    prop = prop ? camelToSnake(prop) : null // 将 prop 从 camelCase 转换为 snake_case
  }

  getTableData(prop, order)
}

function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function(m) {
      return m[0] + '_' + m[1]
    })
    .toLowerCase()
}

// 删除任务
const deleteTask = (row) => {
  ElMessageBox.confirm('此操作将永久删除该任务及相关账号, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async() => {
      const res = await deleteSieveTask({ ID: row.ID })
      if (res.code === 0) {
        ElMessage.success('任务删除成功！')
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        await getTableData()
      }
    })
    .catch(() => {
      ElMessage.warning('已取消删除')
    })
}

const getStatusButtonType = (status, row) => {
  switch (status) {
    case 'Init':
      return '初始化'
    case 'Pending':
      return '等待'
    case 'Success':
      return '成功'
    case 'Failed':
      return '失败'
    case 'Running':
      // 计算总进度百分比
      if (row.totalNumber > 0) {
        const totalProcessed =
          Number(row.nonDisabledAccounts) +
          Number(row.disabledAccounts) +
          Number(row.invalidAccounts)
        const totalProgress = Math.floor(
          (totalProcessed / Number(row.totalNumber)) * 100
        )
        return `运行中 ( ${totalProgress}%)`
      }
      return '运行中'
    case 'Pause':
      return '暂停'
    case 'Generating':
      return '文件生成中'
    case 'PartialSucceed':
      return '部分文件生成成功'
    case 'PhoneAdding':
      return '文件重制中'
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
    file.value = fileListUpdated[0].raw
    form.fileName = fileListUpdated[0].raw.name
    if (file.value) {
      uploadFile(file.value)
    } else {
      console.error('No file to upload')
    }
  } else {
    file.value = null
  }
}

const form = reactive({
  taskName: '',
  concurrency: null,
  file: null,
  filePath: '',
  immediate: true,
  country_id: null,
})

onMounted(() => {
  initForm()
})

const initForm = () => {
  // refreshCountryInfoList()

  // 重置 form 对象以匹配默认值
  form.taskName = ''
  form.country_id = null
  form.concurrency = null
  form.immediate = true
}

const rules = {
  taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  filePath: [{ required: true, message: '请上传文件', trigger: 'change' }],
  country_id: [
    { required: true, message: '请选择国家区号', trigger: 'change' },
  ],
  concurrency: [
    { required: true, message: '请输入线程数', trigger: 'blur' },
    { type: 'number', message: '线程数必须为数字值', trigger: 'blur' },
  ],
}

const submitForm = async() => {
  if (form.filePath === '') {
    ElMessage.warning('请您先上传文件')
    return
  }

  // 验证表单
  const valid = await formRef.value.validate()
  if (!valid) return

  // 显示进度条并初始化
  isShowProgress.value = true
  loadingProgress.value = 0

  // 初始化定时器ID
  const intervalId = setInterval(() => {
    if (loadingProgress.value < 90) {
      loadingProgress.value += 20 // 每次增加20%
    }
  }, 500)

  // 构建 formData
  const formData = new FormData()
  formData.append('taskName', form.taskName)
  formData.append('concurrency', form.concurrency)
  formData.append('immediate', form.immediate)
  formData.append('country_id', form.country_id)
  formData.append('fileName', form.fileName)
  formData.append('filePath', form.filePath)

  if (form.file) {
    formData.append('file', form.file, form.file.name)
  }

  try {
    // 提示用户正在为您提交
    ElMessage.info('正在为您提交...')
    // 发送请求
    const response = await createSieveTask(formData)
    console.log('response', response)

    // 根据响应结果处理
    if (response && response.code === 0) {
      ElMessage.success('添加成功！')

      // 如果响应成功，立即将进度条设置为100%
      clearInterval(intervalId)
      loadingProgress.value = 100

      // 关闭弹窗
      setTimeout(() => {
        isShowProgress.value = false
        closeDialog()

        // 3秒后刷新列表
        setTimeout(getTableData, 3000)
      }, 500)
    } else {
      // 如果响应失败，显示警告消息
      clearInterval(intervalId)
      loadingProgress.value = 100
      setTimeout(() => {
        isShowProgress.value = false
        closeDialog()
      }, 500)
    }
  } catch (error) {
    // 处理异常情况
    clearInterval(intervalId)
    loadingProgress.value = 100
    setTimeout(() => {
      isShowProgress.value = false
      closeDialog()
      ElMessage.warning('添加可能已经成功，但响应较慢，请稍后确认。')

      // 提示用户手动刷新或联系客服
      setTimeout(() => {
        ElMessage.info('如果未在表格数据中出现刚提交的任务，请手动刷新或联系客服。')
      }, 2000)
    }, 500)
  } finally {
    // 重置表单
    setTimeout(() => {
      resetForm()
    }, 500)
  }
}

const uploadFile = async(file) => {
  // 弹出提示，告诉用户正在上传
  ElMessage.info('正在为您将文件上传至云端')

  // 构建 formData
  const formData = new FormData()
  formData.append('file', file)

  // 确保 form 对象已初始化
  if (!form.value) {
    form.value = {}
  }

  try {
    const response = await UploadFile(formData, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        uploadPercentage.value = percentCompleted // 更新进度条
        console.log('上传进度:', percentCompleted) // 添加进度日志
      }
    })

    console.log('服务器响应:', response) // 打印服务器响应

    if (response && response.code === 0) {
      ElMessage.success('文件已上传至云端')
      // 将上传成功后的文件信息填充到表单中
      form.fileName = response.data.fileName
      form.filePath = response.data.filePath
      console.log('form', form.value)
    } else {
      ElMessage.error('上传失败')
      console.error('上传失败:', response) // 打印失败原因
    }
  } catch (error) {
    ElMessage.error('上传过程中出现错误')
    console.error('上传错误:', error) // 打印更详细的错误信息
  } finally {
    uploadPercentage.value = 0 // 上传完成后重置进度条
  }
}

const deleteFile = async(filepath) => {
  const response = await DeleteFile(filepath)
  if (response && response.code === 0) {
    form.fileName = ''
    form.filePath = ''
  } else {
    ElMessage.error('删除失败')
  }
}

const resetForm = () => {
  // 如果 formRef 是有效的，重置表单字段
  if (formRef.value) {
    formRef.value.resetFields()

    // 清空文件列表和文件字段
    fileList.value = []
    // file.value = null
    form.fileName = ''
    form.filePath = ''
  }
}

// 重置线程数函数
const syncConcurrency = async() => {
  try {
    // 调用重置线程数的接口
    const response = await SyncConcurrency()

    // 根据接口返回的 code 判断是否成功
    if (response && response.code === 0) {
      ElMessage.success(response.msg)
    } else {
      throw new Error(response.msg || '同步线程配置失败')
    }
  } catch (error) {
    // 显示具体的错误信息
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message || '同步线程配置出错'
    ElMessage.error(errorMessage)
    console.error('同步线程配置出错', error)
  }
}

const openPause = (row) => {
  ElMessageBox.confirm(`您确定要暂停"${row.taskName}"吗`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async() => {
      const res = await pauseTask(row.ID)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '暂停成功',
        })
        setTimeout(() => {
          getTableData()
        }, 500)
      } else {
        ElMessage({
          type: 'error',
          message: res.data.message || '暂停任务失败',
        })
      }
      getTableData()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作已取消',
      })
    })
}

const openRecover = (row) => {
  ElMessageBox.confirm(`您确定要恢复"${row.taskName}"吗`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async() => {
      try {
        const res = await recoverTask(row.ID)
        console.log('测试', res)
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: `任务 "${row.taskName}" 恢复成功!`,
          })
          setTimeout(() => {
            getTableData()
          }, 3000)
        } else {
          ElMessage({
            type: 'error',
            message: res.data.message || '恢复任务失败',
          })
        }
      } catch (error) {
        if (error && error.response) {
          ElMessage({
            type: 'error',
            message: error.response.data.message || '请求失败',
          })
        } else {
          // 用户取消操作不弹出提示
        }
      }
    })
    .catch(() => {
      // 用户取消操作不弹出提示
    })
}

// 通用的下载文件函数

// 通用的下载文件函数
const downloadFile = async(downloadFunc, row) => {
  // 显示准备下载的消息
  ElMessage.info('准备下载，请稍候...')

  try {
    const response = await downloadFunc(row.ID)
    if (response && response.data) {
      // 提取文件名
      const contentDisposition = response.headers['content-disposition']
      let fileName = 'download.txt' // 默认文件名

      if (contentDisposition) {
        const filenameMatch =
          contentDisposition.match(/filename\*?=UTF-8''(.+?)(;|$)/) ||
          contentDisposition.match(/filename="?(.+?)"?(;|$)/)
        if (filenameMatch && filenameMatch.length > 1) {
          fileName = decodeURIComponent(filenameMatch[1])
        }
      }

      console.log(`开始下载 ${fileName}`, response)
      const blob = new Blob([response.data], { type: 'text/plain' })

      // 创建下载链接并模拟点击进行下载
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      // 下载成功提示
      ElMessage.success('下载成功')
    } else {
      ElMessage.error('下载失败：服务器未返回文件')
    }
  } catch (error) {
    // 显示具体的错误信息
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : '下载出错'
    ElMessage.error(errorMessage)
    console.error('下载出错', error)
  }
}

// 下载禁用账号
const downloadDisable = async(row) => {
  await downloadFile(downloadDisableAccounts, row)
}

// 下载存活账号
const downloadNormal = async(row) => {
  await downloadFile(downloadNormalAccounts, row)
}

// 下载存活账号
const downloadInvalid = async(row) => {
  await downloadFile(downloadInvalidAccounts, row)
}

// 下载存活账号
const downloadAll = async(row) => {
  await downloadFile(downloadAllAccounts, row)
}

const downloadOrigin = async(row) => {
  await downloadFile(downloadOriginFile, row)
}

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

const customSummary = (param) => {
  const { columns, data } = param
  const sums = []

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }

    // 只对特定的列进行合计
    if (
      ['nonDisabledAccounts', 'disabledAccounts', 'totalNumber'].includes(
        column.property
      )
    ) {
      const values = data.map((item) => Number(item[column.property]))
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        return !isNaN(value) ? prev + curr : prev
      }, 0)
    } else {
      // 其他列可以设为空字符串或者其他标识
      sums[index] = ''
    }
  })

  return sums
}

const closeDialog = () => {
  initForm()
  dialogFormVisible.value = false
}

const type = ref('')
const dialogTitle = ref('新增Api')
const dialogFormVisible = ref(false)
const openDialog = (key) => {
  switch (key) {
    case 'add':
      dialogTitle.value = '添加筛号任务'
      // 重置表单
      resetForm()
      setTimeout(() => {
        form.concurrency =
          concurrencyInfo.value.concurrencyLimit -
          concurrencyInfo.value.currentConcurrency
        generateRandomTaskName()
      }, 400)
      break
    case 'edit':
      dialogTitle.value = '编辑筛号任务'
      break
    default:
      break
  }
  type.value = key
  dialogFormVisible.value = true
}

const getStatusTag = (status) => {
  switch (status) {
    case 'Init':
      return 'gray'
    case 'Pending':
      return '#fffdf1'
    case 'Success':
      return '#92c800'
    case 'Failed':
      return '#d72539'
    case 'Running':
      return '#88d0ff'
    case 'Pause':
      return '#ff6d00'
    case 'Generating' :
      return '#88d0ff'
    case 'PartialSucceed':
      return '#d72539'
    case 'PhoneAdding':
      return '#88d0ff'
    default:
      return ''
  }
}

const multipleTableRef = ref(null)
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const batchDelete = () => {
  // 显示确认对话框
  ElMessageBox.confirm('确认要删除选中的行数据吗？', '批量删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async(row) => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status !== 'Running') {
          // 调用删除任务的函数
          const res = await deleteSieveTask({ ID: row.ID })
          if (res.code === 0) {
            ElMessage.success('任务删除成功')
            if (tableData.value.length === 1 && page.value > 1) {
              page.value--
            }
            getTableData()
          }
        }
      })
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage.warning('已取消批量删除')
    })
}

const batchPause = () => {
  // 显示确认对话框
  ElMessageBox.confirm('确认要暂停选中的行数据吗？', '批量暂停', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async(row) => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status === 'Running') {
          // 调用删除任务的函数
          const res = await pauseTask(row.ID)
          if (res.code === 0) {
            ElMessage.success('任务暂停成功!')
            if (tableData.value.length === 1 && page.value > 1) {
              page.value--
            }
            getTableData()
          }
        }
      })
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage.warning('已取消批量暂停')
    })
}

const batchRecover = () => {
  // 显示确认对话框
  ElMessageBox.confirm('确认要暂停选中的行数据吗？', '批量恢复', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async(row) => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status === 'Pause') {
          // 调用删除任务的函数
          const res = await recoverTask(row.ID)
          if (res.code === 0) {
            ElMessage.success('任务恢复成功!')
            if (tableData.value.length === 1 && page.value > 1) {
              page.value--
            }
            getTableData()
          }
        }
      })
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage.warning('已取消批量恢复')
    })
}
onMounted(() => {
  const intervalId = setInterval(() => {
    if (document.visibilityState === 'visible') {
      const taskStatusMap = new Map()

      tableData.value.forEach(task => {
        if (taskStatusMap.has(task.id)) {
          if (task.status === 'Init' && taskStatusMap.get(task.id).createdAt + 60000 < Date.now()) {
            taskStatusMap.set(task.id, { status: task.status, createdAt: Date.now() })
          }
        } else {
          taskStatusMap.set(task.id, { status: task.status, createdAt: Date.now() })
        }
      })

      if (tableData.value.some(task =>
        (task.status === 'Running' || task.status === 'Generating' || task.status === 'PhoneAdding') ||
        (task.status === 'Init' && taskStatusMap.get(task.id).createdAt + 60000 >= Date.now())
      )) {
        getTableData()
      }
    }
  }, 10000)

  onUnmounted(() => {
    clearInterval(intervalId)
  })
})
</script>

<style lang="scss">
.box {
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
  color: #75b5fa;
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

/* 添加按钮的基础样式 */
.button-click-effect {
  transition: all 0.2s ease-in-out !important; /* 添加过渡效果使点击动画更平滑 */
  outline: none; /* 去除点击时的轮廓线 */
}

/* 定义按钮被点击时的样式 */
.button-click-effect:active {
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important; /* 按钮内部添加阴影，产生按下的效果 */
  transform: translateY(3px) !important; /* 按钮按下时轻微下移，增加真实感 */
}
</style>
