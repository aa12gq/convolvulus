<template>
  <div class="box">
    <info-bar title="为确保系统顺畅运行，我们采用了先进的性能优化技术，系统将定期自动清理当天的账号检测信息以保障高效稳定的服务。请您及时下载并妥善保存信息 感谢您的理解与支持" class="opacity-80" />
    <info-bar title="若筛选大量数据，请将筛选出的正常数据再筛选一次，以确保准确性（由于大量筛选时可能存在数据缓存，导致第一次筛选结果不够准确）" class="opacity-80" />
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <!-- 按钮区域 -->
        <div class="button-section">
          <el-tooltip class="box-item" effect="dark" content="暂未开发，敬请期待" placement="top-start" />
          <el-tooltip class="box-item" effect="dark" content="暂未开发，敬请期待" placement="top-start" />

          <el-tooltip class="box-item" effect="dark" content="暂未开发，敬请期待" placement="top-start" />
        </div>
        <!-- 搜索框区域 -->
        <div class="search-section flex space-x-4 -ml-2">
          <el-input v-model="searchText" placeholder="请输入任务名称" clearable style="width: 200px" @clear="clearSearch" @keyup.enter.native="searchTask" />
          <el-button type="primary" class="text-gray-100 opacity-90 active:transform active:!scale-90 active:!shadow-lg" @click="searchTask">查询</el-button>
          <el-button
            type="primary"
            class="text-gray-100 opacity-90 active:transform active:!scale-90 active:!shadow-lg"
            @click="
              () => {
                openDialog('add');
                RefreshAvailableConcurrency();
                uploadPercentage = 0;
              }
            "
          >
            添加任务
          </el-button>
        </div>

        <el-Button class="bg-orange-400 text-gray-100" :disabled="multipleSelection.length == 0" :class="multipleSelection.length == 0 ? 'opacity-50' : ''" @click="batchPause()">一键暂停</el-Button>
        <!--        <el-Button-->
        <!--          class="bg-[#CFAB86] text-gray-100"-->
        <!--          :disabled="multipleSelection.length == 0"-->
        <!--          @click="batchRecover()"-->
        <!--        >-->
        <!--          一键恢复-->
        <!--        </el-Button>-->
        <el-Button class="bg-red-400 text-gray-100" danger :disabled="multipleSelection.length == 0" :class="multipleSelection.length == 0 ? 'opacity-50' : ''" @click="batchDelete()">
          一键删除
        </el-Button>
        <el-Button type="info" class="text-gray-100 opacity-95 active:transform active:!scale-90 active:!shadow-lg" @click="getTableData">刷新一下</el-Button>
        <el-tooltip class="item" effect="dark" content="在任务完成后，如果系统未自动同步您的线程数，请点击此按钮以同步线程配置, 请注意，每半小时内最多只能同步五次。" placement="top">
          <el-Button class="bg-[#28a745] opacity-90 text-white hover:bg-[#218838] active:bg-[#1e7e34] active:transform active:!scale-90 active:!shadow-lg ml-auto" @click="syncConcurrency">
            同步线程配置
          </el-Button>
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
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" width="60" prop="ID" fixed="left" />
        <el-table-column v-if="userStore.userInfo.authorityId == 999" label="UID" width="50" prop="UserID" show-overflow-tooltip />
        <el-table-column v-if="userStore.userInfo.authorityId == 999" label="昵称" min-width="60" prop="nick_name" show-overflow-tooltip />
        <el-table-column v-if="userStore.userInfo.authorityId == 999" label="用户名" width="80" prop="user_name" fixed="left" show-overflow-tooltip />
        <el-table-column align="left" label="任务名称" min-width="90" prop="taskName" show-overflow-tooltip fixed="left" />
        <el-table-column align="left" label="文件名称" min-width="140" prop="file_name" show-overflow-tooltip fixed="left" />

        <el-table-column align="left" label="状态" min-width="130">
          <template #default="{ row }">
            <el-tag :color="getStatusTag(row.status)" effect="dark" class="px-2 text-xs opacity-80  border-none overflow-hidden rounded-[2px]">
              {{ getStatusButtonType(row.status, row) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="正常" min-width="140" prop="nonDisabledAccounts">
          <template #default="{ row }">
            {{ row.nonDisabledAccounts }}
            <span v-if="row.totalNumber > 0">({{ row.nonDisabledAccounts === 0 ? '0%' : ((row.nonDisabledAccounts / row.totalNumber) * 100).toFixed(2) + '%' }})</span>
            <span v-else>(0%)</span>
          </template>
        </el-table-column>

        <el-table-column align="left" label="封禁" min-width="140" prop="disabledAccounts">
          <template #default="{ row }">
            {{ row.disabledAccounts }}
            <span v-if="row.totalNumber > 0">({{ row.disabledAccounts === 0 ? '0%' : ((row.disabledAccounts / row.totalNumber) * 100).toFixed(2) + '%' }})</span>
            <span v-else>0%</span>
          </template>
        </el-table-column>

        <el-table-column align="left" label="无效" min-width="150" prop="invalidAccounts">
          <template #default="{ row }">
            {{ row.invalidAccounts }}
            <span v-if="row.totalNumber > 0">({{ row.invalidAccounts === 0 ? '0%' : ((row.invalidAccounts / row.totalNumber) * 100).toFixed(2) + '%' }})</span>
            <span v-else>0%</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="总数" min-width="90" prop="totalNumber">
          <template #default="{ row }">
            {{ row.totalNumber }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="线程数" min-width="80" prop="realConcurrency" />
        <el-table-column v-if="userStore.userInfo.authorityId == 999" align="left" label="真实线程数" min-width="100" prop="concurrency" />
        <el-table-column align="left" label="代理角色" min-width="80" prop="proxy_id">
          <template #default="{ row }">
            <el-tag :type="row.proxy_id === 0 ? 'success' : 'info'" class="opacity-90">
              {{ row.proxy_id === 0 ? '系统代理' : '个人代理' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="代理名称" min-width="80" prop="proxy_name" />
        <el-table-column
          align="left"
          label="添加时间"
          min-width="180"
          prop="createdAt"
          sortable="custom"
          :formatter="row => dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')"
          show-overflow-tooltip
        />
        <el-table-column
          align="left"
          label="更新时间"
          min-width="180"
          prop="updatedAt"
          sortable="custom"
          :formatter="row => dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')"
          show-overflow-tooltip
        />
        <el-table-column v-if="userStore.userInfo.authorityId == 999" align="left" label="任务耗时" min-width="160" sortable="custom" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.status === 'Running' ? formatDuration(dayjs().diff(dayjs(row.updatedAt), 'second')) : formatDuration(dayjs(row.updatedAt).diff(dayjs(row.createdAt), 'second')) }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" width="150" fixed="right">
          <template #default="scope">
            <!-- Button Group Container -->
            <div class="button-group">
              <el-button type="danger" link :disabled="scope.row.status == 'Running' && userStore.userInfo.authorityId !== 999" @click="deleteTask(scope.row)">删除</el-button>
              <!-- 更多操作 Dropdown -->
              <el-dropdown trigger="click" class="el-button-like !text-[black]">
                <el-button class="button-with-icon-right ml-3 text-gray-500" link>更多操作</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <!--                    <el-dropdown-item-->
                    <!--                      v-if="scope.row.status === 'Pause' && scope.row.totalNumber <= 200000"-->
                    <!--                      @click.native="openRecover(scope.row)"-->
                    <!--                    >恢复</el-dropdown-item>-->
                    <el-dropdown-item v-if="scope.row.status === 'Running'" @click.native="openPause(scope.row)">暂停</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.nonDisabledAccounts > 0 && scope.row.DisabledAccounts > 0">什么都没有</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.normal_file_path != ''" @click="downloadNormal(scope.row)">下载正常账号</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.disabled_file_path != ''" @click="downloadDisable(scope.row)">下载封禁账号</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.invalid_file_path != ''" @click="downloadInvalid(scope.row)">下载无效账号</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.non_disabled_or_disabled_file_path != ''" @click="downloadAll(scope.row)">下载正常及封禁账号</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.file_path != ''" @click="downloadOrigin(scope.row)">下载原始文件</el-dropdown-item>
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
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" modal width="600px" :close-on-click-modal="false" draggable :show-close="false">
      <template #header="{ close, titleId }">
        <div class="h-10 flex justify-between">
          <h4 :id="titleId" class="text-xl">{{ dialogTitle }}</h4>
          <el-button
            type="danger"
            class="mt-5"
            @click="
              () => {
                close();
                if (form.filePath != '') {
                  // deleteFile(form.filePath)
                }
              }
            "
          >
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            关闭
          </el-button>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="rounded-lg">
        <div class="flex w-full space-x-4 mb-4">
          <el-form-item label="任务名称" prop="taskName" class="w-full">
            <el-input v-model="form.taskName" autocomplete="off" placeholder="请输入任务名称" />
          </el-form-item>
          <el-button class="bg-blue-200 text-sm" @click="generateRandomTaskName">生成任务名称</el-button>
        </div>

        <el-form-item label="线程数" prop="concurrency" class="w-full mb-4">
          <el-input v-model.number="form.concurrency" type="number" placeholder="线程数" :min="1" :max="1000" class="w-full" />
          <div class="flex items-center mt-2 space-x-2 text-sm text-orange-300">
            <span>当前可用线程数{{ concurrencyInfo.concurrencyLimit - concurrencyInfo.currentConcurrency }}</span>
            <el-icon class="cursor-pointer" :class="{ 'animate-spin': isRefreshing }" style="margin-left: 4px" :size="12" @click="RefreshAvailableConcurrency()">
              <Refresh />
            </el-icon>
          </div>
        </el-form-item>

        <div class="flex items-center space-x-4 mb-4 ml-[120px]">
          <el-radio-group v-model="selectedProxyOption" @change="handleProxyOptionChange">
            <el-radio :label="1">系统代理</el-radio>
            <el-radio :label="2">个人代理</el-radio>
          </el-radio-group>
        </div>

        <el-form-item v-if="selectedProxyOption === 2" label="选择代理" prop="proxy_id" class="w-full mb-4">
          <el-select v-model="form.proxyId" class="w-full" placeholder="请选择代理">
            <el-option v-for="item in ProxyInfoList" :key="item.ID" :label="item.name" :value="item.ID" />
          </el-select>
          <div class="mt-2 text-sm text-gray-500">在使用个人代理的情况下，筛号速度会根据代理的配置和状况而有所变化。如果代理模板设置不准确，可能会导致号码检测失败。</div>
        </el-form-item>

        <el-form-item prop="file" class="relative w-full mb-4">
          <template #label>
            <div class="flex items-center">
              <el-tooltip effect="dark" content="为了最佳优化，请将手机号以.txt格式上传，并确保每行只包含一个手机号" placement="top">
                <el-icon class="mr-1" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
              <span>上传文件</span>
            </div>
          </template>
          <el-upload
            ref="uploadRef"
            class="upload-demo w-full"
            :file-list="fileList"
            :on-change="handleUploadChange"
            :auto-upload="false"
            accept=".txt"
            show-file-list
            drag
            :on-remove="handleFileRemove"
            :before-upload="handleFileRemove"
            :on-exceed="handleFileRemove"
          >
            <template #trigger>
              <el-button class="bg-gray-100 rounded-none hover:text-gray-700">选择文件</el-button>
            </template>
          </el-upload>
          <el-progress v-if="uploadPercentage > 0" :percentage="uploadPercentage" />
        </el-form-item>

        <el-form-item class="w-full flex space-x-4">
          <el-button v-preReClick type="primary" class="w-[7rem] bg-blue-600 text-white button-click-effect" @click="submitForm">提交任务</el-button>
          <el-button class="w-[7rem] bg-gray-300 text-gray-700 rounded button-click-effect" @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
      <el-progress v-if="isShowProgress" :percentage="loadingProgress" />
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
  UploadFile,
} from '@/api/sieve';
import { getAvailableConcurrency } from '@/api/user';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { CircleCloseFilled } from '@element-plus/icons-vue';
import InfoBar from '@/components/infoBar/infoBar.vue';
import dayjs from 'dayjs';
import { useUserStore } from '@/pinia/modules/user';
import { getProxyInfoList } from '@/api/proxy';

const userStore = useUserStore();
const loadingProgress = ref(0);
const isShowProgress = ref(false);
const page = ref(1);
const total = ref(0);
const pageSize = ref(10);
const tableData = ref([]);
const searchText = ref('');
const currentSearchText = ref('');
const isRefreshing = ref(false);
const uploadPercentage = ref(0);
const generateRandomTaskName = () => {
  form.taskName = '任务-' + Math.floor(Math.random() * 1000);
};

const selectedProxyOption = ref(1); // 默认选中“不使用代理”

// 显示 一分钟5秒(65s) 一小时5分钟(3605s) 一天5小时(86405s
// 定义格式化耗时函数
const formatDuration = seconds => {
  if (seconds < 60) {
    return `${seconds}秒`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分钟${remainingSeconds > 0 ? remainingSeconds + '秒' : ''}(${seconds}秒)`;
  }
};

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
  pageSize.value = 10;
  getTableData(); // 重新获取数据，不带搜索条件
};

// 查询
const getTableData = async (sortProp, sortOrder) => {
  const params = {
    page: page.value,
    pageSize: pageSize.value,
    taskName: currentSearchText.value,
  };

  if (typeof sortProp === 'string' && typeof sortOrder === 'string') {
    params.sort = sortProp;
    params.order = sortOrder;
  }

  const table = await getSieveTaskList(params);
  if (table.code === 0) {
    setTimeout(() => {
      tableData.value = table.data.list;
      console.log(table.data.list);
    }, 100);
    total.value = table.data.total;
    page.value = table.data.page;
    if (table.data.pageSize !== 0) {
      pageSize.value = table.data.pageSize;
    }
  }
};

getTableData();

const handleSortChange = ({ prop, order }) => {
  if (!order) {
    order = null;
    prop = null;
  } else {
    order = order === 'ascending' ? 'asc' : 'desc';
    prop = prop ? camelToSnake(prop) : null; // 将 prop 从 camelCase 转换为 snake_case
  }

  getTableData(prop, order);
};

function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + '_' + m[1];
    })
    .toLowerCase();
}

// 删除任务
const deleteTask = row => {
  ElMessageBox.confirm('此操作将永久删除该任务及相关账号, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await deleteSieveTask({ ID: row.ID });
      if (res.code === 0) {
        ElMessage.success('任务删除成功！');
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--;
        }
        await getTableData();
      }
    })
    .catch(() => {
      ElMessage.warning('已取消删除');
    });
};

const getStatusButtonType = (status, row) => {
  switch (status) {
    case 'Init':
      return '初始化';
    case 'Pending':
      return '等待';
    case 'Success':
      return '已完成';
    case 'Failed':
      return '失败';
    case 'Running':
      // 计算总进度百分比
      if (row.totalNumber > 0) {
        const totalProcessed = Number(row.nonDisabledAccounts) + Number(row.disabledAccounts) + Number(row.invalidAccounts);
        const totalProgress = Math.floor((totalProcessed / Number(row.totalNumber)) * 100);
        return `筛号中 ( ${totalProgress}%)`;
      }
      return '筛号中';
    case 'Pause':
      return '已暂停';
    case 'Generating':
      return '文件生成中';
    case 'PartialSucceed':
      return '部分文件生成已完成';
    case 'PhoneAdding':
      return '文件重制中';
    default:
      return '';
  }
};

// 新建任务
const formRef = ref(null);

const fileList = ref([]);

const handleUploadChange = (file, fileListUpdated) => {
  // 保证fileList只包含最新的一个文件
  fileList.value = fileListUpdated.slice(-1);
  if (fileList.value.length > 0) {
    const selectedFile = fileList.value[0].raw;
    if (selectedFile) {
      // 验证文件类型是否为txt
      if (selectedFile.type !== 'text/plain') {
        ElMessage.error('文件类型错误，请上传txt文件');
        return;
      }
      uploadFile(selectedFile);
    } else {
      console.error('没有要上传的文件');
    }
  } else {
    console.log('没有选择文件');
  }
};

const handleFileRemove = (file, fileListUpdated) => {
  fileList.value.length = 0;
  // 更新文件列表
  fileList.value = fileListUpdated;
  // 重置进度
  uploadPercentage.value = 0;
  console.log('文件已移除');
};

const form = reactive({
  taskName: '',
  concurrency: null,
  file: null,
  filePath: '',
  immediate: true,
  country_id: null,
  proxyId: null,
});

onMounted(() => {
  initForm();
});

const initForm = () => {
  // refreshCountryInfoList()

  // 重置 form 对象以匹配默认值
  form.taskName = '';
  form.country_id = null;
  form.concurrency = null;
  form.immediate = true;
  form.proxyId = null;
};

const rules = {
  taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  filePath: [{ required: true, message: '请上传文件', trigger: 'change' }],
  country_id: [{ required: true, message: '请选择国家区号', trigger: 'change' }],
  concurrency: [
    { required: true, message: '请输入线程数', trigger: 'blur' },
    { type: 'number', message: '线程数必须为数字值', trigger: 'blur' },
  ],
};

const submitForm = async () => {
  if (form.filePath === '') {
    ElMessage.warning('请您先上传文件');
    return;
  }

  // 验证表单
  const valid = await formRef.value.validate();
  if (!valid) return;

  // 显示进度条并初始化
  isShowProgress.value = true;
  loadingProgress.value = 0;

  // 初始化定时器ID
  const intervalId = setInterval(() => {
    if (loadingProgress.value < 90) {
      loadingProgress.value += 20; // 每次增加20%
    }
  }, 500);

  let proxyId = 0;
  if (form.proxyId !== null) {
    proxyId = form.proxyId;
  }

  // 构建 formData
  const formData = new FormData();
  formData.append('taskName', form.taskName);
  formData.append('concurrency', form.concurrency);
  formData.append('immediate', form.immediate);
  formData.append('country_id', form.country_id);
  formData.append('fileName', form.fileName);
  formData.append('filePath', form.filePath);
  formData.append('proxy_id', proxyId);

  if (form.file) {
    formData.append('file', form.file, form.file.name);
  }

  try {
    // 提示用户正在为您提交
    ElMessage.info('正在为您提交...');
    // 发送请求
    const response = await createSieveTask(formData);
    console.log('response', response);

    // 根据响应结果处理
    if (response && response.code === 0) {
      ElMessage.success('添加已完成！');

      // 如果响应已完成，立即将进度条设置为100%
      clearInterval(intervalId);
      loadingProgress.value = 100;

      // 关闭弹窗
      setTimeout(() => {
        isShowProgress.value = false;
        closeDialog();

        // 3秒后刷新列表
        setTimeout(getTableData, 1000);
      }, 500);
    } else {
      // 如果响应失败，显示警告消息
      clearInterval(intervalId);
      loadingProgress.value = 100;
      setTimeout(() => {
        isShowProgress.value = false;
        closeDialog();
      }, 500);
    }
  } catch (error) {
    // 处理异常情况
    clearInterval(intervalId);
    loadingProgress.value = 100;
    setTimeout(() => {
      isShowProgress.value = false;
      closeDialog();
      ElMessage.warning('添加可能已经已完成，但响应较慢，请稍后确认。');

      // 提示用户手动刷新或联系客服
      setTimeout(() => {
        ElMessage.info('如果未在表格数据中出现刚提交的任务，请手动刷新或联系客服。');
      }, 2000);
    }, 500);
  } finally {
    // 重置表单
    setTimeout(() => {
      resetForm();
    }, 500);
  }
};

const uploadFile = async file => {
  const calculateChunkSize = fileSize => {
    if (fileSize <= 10 * 1024 * 1024) {
      return 1 * 1024 * 1024;
    } else if (fileSize <= 100 * 1024 * 1024) {
      return 5 * 1024 * 1024;
    } else {
      return 10 * 1024 * 1024;
    }
  };

  const chunkSize = calculateChunkSize(file.size);
  console.log('每块大小', chunkSize);
  const totalParts = Math.ceil(file.size / chunkSize);
  const fileName = file.name;
  let uploadSuccess = true;

  // 初始化进度数组，每个块的初始进度为0
  const partProgress = new Array(totalParts).fill(0);

  // 更新总进度
  const updateTotalProgress = () => {
    const totalProgress = partProgress.reduce((acc, curr) => acc + curr, 0) / totalParts;
    console.log(`总进度: ${totalProgress}%`);
    uploadPercentage.value = Math.round(totalProgress);
  };

  for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
    const start = (partNumber - 1) * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    const blob = file.slice(start, end);

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('fileName', fileName);
    formData.append('partNumber', partNumber.toString());
    formData.append('totalParts', totalParts.toString());

    // 添加日志
    console.log(`上传块: ${partNumber}, fileName: ${fileName}, totalParts: ${totalParts}`);

    try {
      const response = await UploadFile(formData, {
        onUploadProgress: progressEvent => {
          // 更新当前块的进度
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(`第 ${partNumber} 块进度: ${progress}%`);
          partProgress[partNumber - 1] = progress;
          updateTotalProgress();
        },
      });

      if (response && response.data) {
        if (partNumber === totalParts) {
          form.filePath = response.data.filePath;
        }
      } else {
        uploadSuccess = false;
        ElMessage.error(`第 ${partNumber} 块上传失败`);
        break;
      }
    } catch (error) {
      uploadSuccess = false;
      ElMessage.error(`上传过程中出现错误: ${error}`);
      break;
    }
  }

  // 所有块上传完成后，统一提示
  if (uploadSuccess) {
    ElMessage.success('文件上传完成');
    form.fileName = fileName;
  } else {
    ElMessage.error('部分块上传失败，请重试');
  }
};

const resetForm = () => {
  // 如果 formRef 是有效的，重置表单字段
  if (formRef.value) {
    formRef.value.resetFields();

    // 清空文件列表和文件字段
    fileList.value = [];
    // file.value = null
    form.fileName = '';
    form.filePath = '';
  }
};

// 重置线程数函数
const syncConcurrency = async () => {
  try {
    // 调用重置线程数的接口
    const response = await SyncConcurrency();

    // 根据接口返回的 code 判断是否已完成
    if (response && response.code === 0) {
      ElMessage.success(response.msg);
    } else {
      throw new Error(response.msg || '同步线程配置失败');
    }
  } catch (error) {
    // 显示具体的错误信息
    const errorMessage = error.response && error.response.data ? error.response.data.message : error.message || '同步线程配置出错';
    ElMessage.error(errorMessage);
    console.error('同步线程配置出错', error);
  }
};

const openPause = row => {
  ElMessageBox.confirm(`您确定要暂停"${row.taskName}"吗`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await pauseTask(row.ID);
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '暂停已完成',
        });
        setTimeout(() => {
          getTableData();
        }, 500);
      } else {
        ElMessage({
          type: 'error',
          message: res.data.message || '暂停任务失败',
        });
      }
      getTableData();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作已取消',
      });
    });
};

const openRecover = row => {
  ElMessageBox.confirm(`您确定要恢复"${row.taskName}"吗`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        const res = await recoverTask(row.ID);
        console.log('测试', res);
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: `任务 "${row.taskName}" 恢复已完成!`,
          });
          setTimeout(() => {
            getTableData();
          }, 3000);
        } else {
          ElMessage({
            type: 'error',
            message: res.data.message || '恢复任务失败',
          });
        }
      } catch (error) {
        if (error && error.response) {
          ElMessage({
            type: 'error',
            message: error.response.data.message || '请求失败',
          });
        } else {
          // 用户取消操作不弹出提示
        }
      }
    })
    .catch(() => {
      // 用户取消操作不弹出提示
    });
};

// 通用的下载文件函数

// 通用的下载文件函数
const downloadFile = async (downloadFunc, row) => {
  // 显示准备下载的消息
  ElMessage.info('准备下载，请稍候...');

  try {
    const response = await downloadFunc(row.ID);
    if (response && response.data) {
      // 提取文件名
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'download.txt'; // 默认文件名

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename\*?=UTF-8''(.+?)(;|$)/) || contentDisposition.match(/filename="?(.+?)"?(;|$)/);
        if (filenameMatch && filenameMatch.length > 1) {
          fileName = decodeURIComponent(filenameMatch[1]);
        }
      }

      console.log(`开始下载 ${fileName}`, response);
      const blob = new Blob([response.data], { type: 'text/plain' });

      // 创建下载链接并模拟点击进行下载
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // 下载已完成提示
      ElMessage.success('下载已完成');
    } else {
      ElMessage.error('下载失败：服务器未返回文件');
    }
  } catch (error) {
    // 显示具体的错误信息
    const errorMessage = error.response && error.response.data ? error.response.data.message : '下载出错';
    ElMessage.error(errorMessage);
    console.error('下载出错', error);
  }
};

// 下载禁用账号
const downloadDisable = async row => {
  await downloadFile(downloadDisableAccounts, row);
};

// 下载存活账号
const downloadNormal = async row => {
  await downloadFile(downloadNormalAccounts, row);
};

// 下载存活账号
const downloadInvalid = async row => {
  await downloadFile(downloadInvalidAccounts, row);
};

// 下载存活账号
const downloadAll = async row => {
  await downloadFile(downloadAllAccounts, row);
};

const downloadOrigin = async row => {
  await downloadFile(downloadOriginFile, row);
};

const concurrencyInfo = ref({
  concurrencyLimit: 0,
  currentConcurrency: 0,
});

const RefreshAvailableConcurrency = async () => {
  isRefreshing.value = true;

  const res = await getAvailableConcurrency();
  concurrencyInfo.value = res.data;
  setTimeout(() => {
    isRefreshing.value = false;
  }, 1000);
};

const customSummary = param => {
  const { columns, data } = param;
  const sums = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计';
      return;
    }

    // 只对特定的列进行合计
    if (['nonDisabledAccounts', 'disabledAccounts', 'totalNumber'].includes(column.property)) {
      const values = data.map(item => Number(item[column.property]));
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr);
        return !isNaN(value) ? prev + curr : prev;
      }, 0);
    } else {
      // 其他列可以设为空字符串或者其他标识
      sums[index] = '';
    }
  });

  return sums;
};

const closeDialog = () => {
  initForm();
  dialogFormVisible.value = false;
};

const type = ref('');
const dialogTitle = ref('新增Api');
const dialogFormVisible = ref(false);
const openDialog = key => {
  switch (key) {
    case 'add':
      dialogTitle.value = '添加筛号任务';
      // 重置表单
      resetForm();
      setTimeout(() => {
        form.concurrency = concurrencyInfo.value.concurrencyLimit - concurrencyInfo.value.currentConcurrency;
        generateRandomTaskName();
      }, 400);
      break;
    case 'edit':
      dialogTitle.value = '编辑筛号任务';
      break;
    default:
      break;
  }
  type.value = key;
  dialogFormVisible.value = true;
};

const getStatusTag = status => {
  switch (status) {
    case 'Init':
      return '#808080'; // 灰色
    case 'Pending':
      return '#FFD700'; // 金色
    case 'Success':
      return '#28a745'; // 绿色
    case 'Failed':
      return '#dc3545'; // 红色
    case 'Running':
      return '#17a2b8'; // 青色
    case 'Pause':
      return '#ffa500'; // 橙色
    case 'Generating':
      return '#17a2b8'; // 青色
    case 'PartialSucceed':
      return '#ffc107'; // 黄色
    case 'PhoneAdding':
      return '#6c757d'; // 中灰色
    default:
      return '';
  }
};

const multipleTableRef = ref(null);
const multipleSelection = ref([]);
const handleSelectionChange = val => {
  multipleSelection.value = val;
};

const batchDelete = () => {
  // 显示确认对话框
  ElMessageBox.confirm('确认要删除选中的行数据吗？', '一键删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async row => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status !== 'Running') {
          // 调用删除任务的函数
          const res = await deleteSieveTask({ ID: row.ID });
          if (res.code === 0) {
            ElMessage.success('任务删除已完成');
            if (tableData.value.length === 1 && page.value > 1) {
              page.value--;
            }
            getTableData();
          }
        }
      });
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage.warning('已取消一键删除');
    });
};

const batchPause = () => {
  // 显示确认对话框
  ElMessageBox.confirm('确认要暂停选中的行数据吗？', '一键暂停', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async row => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status === 'Running') {
          // 调用删除任务的函数
          const res = await pauseTask(row.ID);
          if (res.code === 0) {
            ElMessage.success('任务暂停已完成!');
            if (tableData.value.length === 1 && page.value > 1) {
              page.value--;
            }
            getTableData();
          }
        }
      });
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage.warning('已取消一键暂停');
    });
};

const batchRecover = () => {
  // 显示确认对话框
  ElMessageBox.confirm('确认要暂停选中的行数据吗？', '一键恢复', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async row => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status === 'Pause') {
          // 调用删除任务的函数
          const res = await recoverTask(row.ID);
          if (res.code === 0) {
            ElMessage.success('任务恢复已完成!');
            if (tableData.value.length === 1 && page.value > 1) {
              page.value--;
            }
            getTableData();
          }
        }
      });
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage.warning('已取消一键恢复');
    });
};
onMounted(() => {
  const intervalId = setInterval(() => {
    if (document.visibilityState === 'visible') {
      const taskStatusMap = new Map();

      tableData.value.forEach(task => {
        if (taskStatusMap.has(task.id)) {
          if (task.status === 'Init' && taskStatusMap.get(task.id).createdAt + 60000 < Date.now()) {
            taskStatusMap.set(task.id, {
              status: task.status,
              createdAt: Date.now(),
            });
          }
        } else {
          taskStatusMap.set(task.id, {
            status: task.status,
            createdAt: Date.now(),
          });
        }
      });

      if (
        tableData.value.some(
          task => task.status === 'Running' || task.status === 'Generating' || task.status === 'PhoneAdding' || (task.status === 'Init' && taskStatusMap.get(task.id).createdAt + 60000 >= Date.now())
        )
      ) {
        getTableData();
      }
    }
  }, 10000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

const handleProxyOptionChange = () => {
  if (selectedProxyOption.value === 2) {
    refreshProxyInfoList();
  }
};

const ProxyInfoList = ref([]);
const refreshProxyInfoList = async () => {
  const result = await getProxyInfoList(1, 200);
  if (result.code === 0 && Array.isArray(result.data.list)) {
    ProxyInfoList.value = [];
    setTimeout(() => {
      console.log(result.data.list);
      ProxyInfoList.value = result.data.list;
    }, 100);
  }
};
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

// .el-tag{
//   color: white !important;
//   border: none !important;
//   border-radius: 2px !important;
//   overflow: hidden !important;
// }
</style>
