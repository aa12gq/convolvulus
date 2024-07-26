<template>
  <div class="authority">
    <!-- <info-bar title="{rand_num}纯数字随机，{rand}字母+数字随机，{city}自动定位城市" />
    <info-bar title="参考：socks5://aabb-region-{city}-session-{rand}-sessTime-20:dsfasdf@sdfdsf.aabb.vip（这个代表自动选择对应国家代理和20分钟内同一个号固定ip）, 系统会自动根据关键词进行处理" /> -->

    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- 按钮区域 -->
        <!-- 搜索框区域 -->
        <div class="search-section flex space-x-4">
          <el-input v-model="searchText" placeholder="请输入代理名称" clearable style="width: 200px" @clear="clearSearch" @keyup.enter.native="searchTask" />
          <el-button type="primary" icon="Search" @click="searchTask">搜索</el-button>
          <el-button type="primary" icon="plus" @click="openDialog('add')">添加代理</el-button>
        </div>
      </div>

      <el-table :data="tableData" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="authorityId" style="width: 100%">
        <el-table-column label="ID" min-width="180" prop="ID" />
        <el-table-column align="left" label="代理名称" min-width="180" prop="name" show-overflow-tooltip/>

        <el-table-column align="left" label="代理IP" min-width="300" prop="proxy_url" show-overflow-tooltip/>

        <el-table-column align="left" label="创建时间" min-width="180" prop="CreatedAt" show-overflow-tooltip/>
        <el-table-column align="left" label="更新时间" min-width="180" prop="UpdatedAt" show-overflow-tooltip/>
        <el-table-column align="left" fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button icon="edit" type="primary" link @click="editProxyFunc(scope.row)">编辑</el-button>
            <!-- <el-button
                icon="delete"

                type="primary"
                link
                @click="deleteProxyFunc(scope.row)"
              >删除</el-button> -->
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

    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="dialogTitle">
      <warning-bar title="新增代理" />
      <el-form ref="apiForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="代理ip" prop="name">
          <el-input v-model="form.proxy_url" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getProxyInfoList, createProxyInfo, updateProxyInfo, findProxyInfo, deleteProxyInfo } from '@/api/proxy';
import InfoBar from '@/components/infoBar/infoBar.vue';
import { formatTimeToStr } from '@/utils/date';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const drawer2 = ref(false);
const direction = ref('rtl');

const handleClose = () => {
  drawer.value = false;
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {});
}

const drawer = ref(false);

const page = ref(1);
const total = ref(0);
const pageSize = ref(10);
const tableData = ref([]);
const searchText = ref('');
const currentSearchText = ref('');

const handlePageChange = val => {
  page.value = val;
  getTableData();
};

const handleSizeChange = val => {
  pageSize.value = val;
  getTableData();
};

const searchTask = async () => {
  currentSearchText.value = searchText.value;
  await getTableData();
};

const clearSearch = () => {
  searchText.value = '';
  currentSearchText.value = '';
  getTableData(); // 重新获取数据，不带搜索条件
};

// 查询
const getTableData = async () => {
  const table = await getProxyInfoList(page.value, pageSize.value, currentSearchText.value);
  if (table.code === 0) {
    tableData.value = [];
    setTimeout(() => {
      table.data.list.forEach(item => {
        item.CreatedAt = item.CreatedAt ? formatTimeToStr(item.CreatedAt, 'yyyy-MM-dd hh:mm:ss') : '';
        item.UpdatedAt = item.UpdatedAt ? formatTimeToStr(item.UpdatedAt, 'yyyy-MM-dd hh:mm:ss') : '';
      });

      tableData.value = table.data.list;
    }, 100);
    total.value = table.data.total;
    page.value = table.data.page;
    pageSize.value = table.data.pageSize;
  }
};

getTableData();

// 新建任务
const formRef = ref(null);

const fileList = ref([]);
const handleUploadChange = (file, fileListUpdated) => {
  fileList.value = fileListUpdated;
  if (fileListUpdated.length > 0) {
    form.value.file = fileListUpdated[0].raw;
  } else {
    form.value.file = null;
  }
};

const type = ref('');

const dialogTitle = ref('新增代理');
const dialogFormVisible = ref(false);
const openDialog = key => {
  switch (key) {
    case 'add':
      dialogTitle.value = '新增代理';
      break;
    case 'edit':
      dialogTitle.value = '编辑代理';
      break;
    default:
      break;
  }
  type.value = key;
  dialogFormVisible.value = true;
};

const form = ref({
  id: null,
  name: '',
  proxy_url: '',
});
const apiForm = ref(null);
const initForm = () => {
  apiForm.value.resetFields();
  form.value = {
    null: null,
    name: '',
    proxy_url: '',
  };
};

const closeDialog = () => {
  initForm();
  dialogFormVisible.value = false;
};

const enterDialog = async () => {
  apiForm.value.validate(async valid => {
    if (valid) {
      switch (type.value) {
        case 'add':
          {
            const res = await createProxyInfo(form.value);
            if (res.code === 0) {
              ElMessage({
                type: 'success',
                message: '添加成功',
                showClose: true,
              });
            }
            getTableData();
            closeDialog();
          }

          break;
        case 'edit':
          {
            const res = await updateProxyInfo(form.value);
            if (res.code === 0) {
              ElMessage({
                type: 'success',
                message: '编辑成功',
                showClose: true,
              });
            }
            getTableData();
            closeDialog();
          }
          break;
        default:
          // eslint-disable-next-line no-lone-blocks
          {
            ElMessage({
              type: 'error',
              message: '未知操作',
              showClose: true,
            });
          }
          break;
      }
    }
  });
};

const editProxyFunc = async row => {
  const res = await findProxyInfo(row.ID);
  console.log("ces",res);
  // form.value.name = res.data.reproxyInfo.name
  // form.value.proxy_url = res.data.reproxyInfo.proxy_url
  // form.value.id = res.data.reproxyInfo.id
  Object.assign(form.value, res.data.reproxyInfo);
  openDialog('edit');
};

const deleteProxyFunc = async row => {
  ElMessageBox.confirm('此操作将永久删除标签, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteProxyInfo(row.ID);
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      });
      if (tableData.value.length === 1 && page.value > 1) {
        page.value--;
      }
      getTableData();
    }
  });
};

const rules = ref({
  name: [{ required: true, message: '请输入代理名称', trigger: 'blur' }],
  proxy_url: [{ required: true, message: '请输入代理ip', trigger: 'blur' }],
});
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
