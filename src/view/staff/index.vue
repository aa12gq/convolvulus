<template>
  <div class="authority">
    <warning-bar title="用户管理" />
    <div class="gva-table-box">
      <div class="gva-btn-list" />
      <div class="gva-btn-list">
        <el-button
          color="#626aef"
          icon="refresh"
          :dark="isDark"
          plain
          @click="getTableData"
        >刷新</el-button>

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
          label="用户名称"
          min-width="180"
          prop="user_name"
        />
        <el-table-column
          align="left"
          label="电话号码"
          min-width="180"
          prop="phone_number"
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
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { getStaffInfoList } from '@/api/staff'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref, onMounted } from 'vue'
import { formatTimeToStr } from '@/utils/date'

defineOptions({
  name: 'Staff',
})

const currentPage = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref(null)

// 监听currentPage变化，获取对应页数的数据
const handlePageChange = (page) => {
  currentPage.value = page
  getTableData()
}

// 查询数据
const getTableData = async() => {
  const table = await getStaffInfoList(
    currentPage.value,
    pageSize.value
  )
  if (table.code === 0) {
    table.data.list.forEach((item) => {
      item.CreatedAt = item.CreatedAt ? formatTimeToStr(item.CreatedAt, 'yyyy-MM-dd hh:mm:ss') : ''
      item.UpdatedAt = item.UpdatedAt ? formatTimeToStr(item.UpdatedAt, 'yyyy-MM-dd hh:mm:ss') : ''
    })
    tableData.value = []
    setTimeout(() => {
      tableData.value = table.data.list
    }, 100)
    total.value = table.data.total
    currentPage.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

// 初始化时获取第一页数据
onMounted(getTableData)
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
