<template>
  <div class="authority">
    <warning-bar title="注:用户钱包列表" />
    <div class="gva-table-box">
      <div class="gva-btn-list">

        <!-- 按钮区域 -->
        <!-- 搜索框区域 -->
        <div class="search-section flex space-x-4">
          <el-input
            v-model="searchText"
            placeholder="请输入用户名"
            clearable
            style="width: 200px;"
            @clear="clearSearch"
            @keyup.enter.native="searchTask"
          />
          <el-button
            type="primary"
            icon="Search"
            @click="searchTask"
          >搜索</el-button>
          <el-button
            type="primary"
            icon="refresh"
            @click="getTableData"
          >刷新</el-button>
        </div>

      </div>

      <el-table
        :data="tableData"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="authorityId"
        style="width: 100%"
      >
        <el-table-column
          label="ID"
          min-width="180"
          prop="ID"
        />
        <el-table-column
          align="left"
          label="用户ID"
          min-width="180"
          prop="UserID"
        />
        <el-table-column
          align="left"
          label="UUID"
          min-width="180"
          prop="UserUUID"
        >
          <template #default="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.UserUUID"
              placement="top"
            >
              <div class="text-ellipsis">{{ scope.row.UserUUID.length > 10 ? scope.row.UserUUID.substr(0, 10) + '...' : scope.row.UserUUID }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="用户"
          min-width="180"
          prop="user_name"
        />
        <el-table-column
          align="left"
          label="状态"
          min-width="180"
        >
          <template #default="{ row }">
            <el-button
              :type="row.status = '正常' ? 'success' : 'danger'"
              size="small"
              plain
            >
              {{ row.Status }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="余额"
          min-width="180"
          prop="balance"
        />

        <el-table-column
          align="left"
          label="创建时间"
          min-width="180"
          prop="CreatedAt"
        />
        <el-table-column
          align="left"
          label="更新时间"
          min-width="180"
          prop="UpdatedAt"
        />
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
          />
        </el-form-item>

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
            @click="submitForm"
          >提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>

      </el-form>
    </el-drawer>
    <el-drawer
      v-model="drawer2"
      :direction="direction"
    >
      <template #header>
        <h4>set title by slot</h4>
      </template>
      <template #default>
        <div>
          <el-radio
            v-model="radio1"
            label="Option 1"
            size="large"
          >Option 1</el-radio>
          <el-radio
            v-model="radio1"
            label="Option 2"
            size="large"
          >Option 2</el-radio>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button
            type="primary"
            @click="confirmClick"
          >confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { getUserWalletList } from '@/api/wallet'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { formatTimeToStr } from '@/utils/date'
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const drawer2 = ref(false)
const direction = ref('rtl')

const handleClose = () => {
  drawer.value = false
}
function cancelClick() {
  drawer2.value = false
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false
    })
    .catch(() => {
    })
}

const drawer = ref(false)

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchText = ref('')
const currentSearchText = ref('')

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
  getTableData() // 重新获取数据，不带搜索条件
}

// 查询
const getTableData = async() => {
  const table = await getUserWalletList(page.value, pageSize.value, currentSearchText.value)
  if (table.code === 0) {
    tableData.value = []
    setTimeout(() => {
      table.data.list.forEach((item) => {
        item.CreatedAt = item.CreatedAt ? formatTimeToStr(item.CreatedAt, 'yyyy-MM-dd hh:mm:ss') : ''
        item.UpdatedAt = item.UpdatedAt ? formatTimeToStr(item.UpdatedAt, 'yyyy-MM-dd hh:mm:ss') : ''
      })

      tableData.value = table.data.list
    }, 100)
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

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
  </style>

