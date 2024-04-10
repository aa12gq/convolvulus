<template>
  <div class="box">
    <warning-bar
      title="注意：为确保系统顺畅运行，我们采用了先进的性能优化技术。系统将定期自动清理当天的账号检测信息，以保障高效稳定的服务。请您及时下载并妥善保存信息，感谢您的理解与支持"
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
            >查询</el-button
          >
          <el-button
            class="bg-[#4773C5] text-gray-100 hover:bg-[#729cea] active:bg-[#729cea] active:transform active:!scale-90 active:!shadow-lg"
            @click="
              () => {
                openDialog('add');
                RefreshAvailableConcurrency();
              }
            "
            >添加任务</el-button
          >
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
          >刷新一下</el-Button
        >
        <div class="ml-auto space-x-2">
          <el-select
            v-model="refreshTime"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="选择自动刷新时间"
            style="width: 155px"
            @change="selectRefreshTime"
          >
            <el-option
              v-for="item in refreshTimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-switch
            v-model="autoRefresh"
            size="large"
            inline-prompt
            active-text="自动刷新开启"
            inactive-text="自动刷新关闭"
            @change="controlRefresh"
          />
        </div>
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
        <el-table-column label="ID" width="60" prop="ID" />
        <el-table-column
          v-if="userStore.userInfo.authorityId == 999"
          label="UID"
          width="60"
          prop="UserID"
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

        <el-table-column align="left" label="状态" min-width="130">
          <template #default="{ row }">
            <el-tag :color="getStatusTag(row.status)" effect="dark">
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

        <!-- <el-table-column
          align="left"
          label="检测失败"
          min-width="120"
          prop="failedAccounts"
        >
          <template #default="{ row }">
            {{ row.failedAccounts }}
            <span v-if="row.totalNumber > 0">
              ({{
                row.failedAccounts === 0
                  ? "0%"
                  : ((row.failedAccounts / row.totalNumber) * 100).toFixed(2) +
                    "%"
              }})
            </span>
            <span v-else>0%</span>
          </template>
        </el-table-column> -->
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
        <el-table-column align="left" label="操作" width="150" fixed="right">
          <template #default="scope">
            <!-- Button Group Container -->
            <div class="button-group">
              <el-button
                type="warning"
                link
                :disabled="scope.row.status == 'Running'"
                @click="deleteTask(scope.row)"
                >删除</el-button
              >
              <!-- 更多操作 Dropdown -->
              <el-dropdown trigger="click" class="el-button-like !text-[black]">
                <el-button
                  class="button-with-icon-right ml-3 text-gray-500"
                  link
                  >更多操作</el-button
                >
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-if="scope.row.status === 'Pause'"
                      @click.native="openRecover(scope.row)"
                      >恢复</el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="scope.row.status === 'Running'"
                      @click.native="openPause(scope.row)"
                      >暂停</el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="
                        scope.row.nonDisabledAccounts > 0 &&
                        scope.row.DisabledAccounts > 0
                      "
                      >什么都没有</el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="scope.row.nonDisabledAccounts > 1"
                      @click="downloadNormal(scope.row)"
                      >下载正常账号</el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="scope.row.disabledAccounts > 1"
                      @click="downloadDisable(scope.row)"
                      >下载封禁账号</el-dropdown-item
                    >
                    <el-dropdown-item
                      v-if="scope.row.invalidAccounts > 1"
                      @click="downloadInvalid(scope.row)"
                      >下载无效账号</el-dropdown-item
                    >
                    <el-dropdown-item @click="downloadAll(scope.row)"
                      >下载正常及封禁账号</el-dropdown-item
                    >
                    <el-dropdown-item @click="downloadFailed(scope.row)"
                      >下载检测失败账号</el-dropdown-item
                    >
                    <el-dropdown-item @click="downloadOrigin(scope.row)"
                      >下载原始文件</el-dropdown-item
                    >
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
          <h4 :id="titleId" class="text-xl">{{ dialogTitle }}</h4>
          <el-button type="danger" class="mt-5" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            关闭
          </el-button>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <div class="flex w-full space-x-2">
          <el-form-item label="任务名称" prop="taskName" class="w-full">
            <el-input
              v-model="form.taskName"
              autocomplete="off"
              placeholder="请输入任务名称"
            />
          </el-form-item>
          <el-button
            class="bg-[#EEF1FE] text-sm"
            @click="generateRandomTaskName"
            >生成任务名称</el-button
          >
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
        <el-form-item label="线程数" prop="concurrency">
          <el-input
            v-model.number="form.concurrency"
            type="number"
            placeholder="线程数"
            :min="1"
            :max="1000"
            style="width: 100%"
          />
          <span class="text-sm text-orange-300 mt-2"
            >当前可用线程数{{
              concurrencyInfo.concurrencyLimit -
              concurrencyInfo.currentConcurrency
            }}</span
          >
          <el-icon
            class="mt-2 cursor-pointer"
            :class="{ rotate: isRefreshing }"
            style="margin-left: 4px"
            :size="12"
            @click="RefreshAvailableConcurrency()"
            ><Refresh
          /></el-icon>
        </el-form-item>

        <el-form-item label="上传文件" prop="file">
          <el-upload
            ref="uploadRef"
            class="upload-demo w-full"
            :file-list="fileList"
            :on-change="handleUploadChange"
            :before-upload="() => false"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button class="bg-gray-100 rounded-none hover:text-"
                >选择文件</el-button
              >
            </template>
            <el-tooltip
              effect="dark"
              content="为了最佳优化，请将手机号以.txt格式上传，并确保每行只包含一个手机号"
              placement="top"
            >
              <el-icon style="margin-left: 4px" :size="12"><Warning /></el-icon>
            </el-tooltip>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button
            v-preReClick
            :disabled="isShowProgress"
            type="primary"
            class="w-[7rem] cursor-pointer text-gray-100 button-click-effect"
            @click="submitForm"
            >添加</el-button
          >
          <el-button
            color="#DEDCD2"
            class="w-[7rem] rounded ml-2 button-click-effect"
            @click="resetForm"
            >清空</el-button
          >
        </el-form-item>
      </el-form>
      <el-progress v-if="isShowProgress" :percentage="loadingProgress" />
    </el-dialog>
  </div>
</template>

<script setup>
import {
  getSieveTaskList,
  createSieveTask,
  deleteSieveTask,
  pauseTask,
  recoverTask,
  downloadDisableAccounts,
  downloadNormalAccounts,
  downloadInvalidAccounts,
  downloadAllAccounts,
  downloadFailedAccounts,
  downloadOriginFile,
} from "@/api/sieve";
import { getAvailableConcurrency } from "@/api/user";
import { getCountryInfoList } from "@/api/country";
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import WarningBar from "@/components/warningBar/warningBar.vue";
import dayjs from "dayjs";
import { useUserStore } from "@/pinia/modules/user";

const handleClose = () => {
  drawer.value = false;
};

const userStore = useUserStore();
const drawer = ref(false);
const loadingProgress = ref(0);
const isShowProgress = ref(false);
const page = ref(1);
const total = ref(0);
const pageSize = ref(10);
const tableData = ref([]);
const searchText = ref("");
const currentSearchText = ref("");
const isRefreshing = ref(false);
const autoRefresh = ref(false);
const refreshTime = ref(5000);
const refreshTimeOptions = [
  {
    value: 5000,
    label: "5秒",
  },
  {
    value: 10000,
    label: "10秒",
  },
  {
    value: 15000,
    label: "15秒",
  },
  {
    value: 20000,
    label: "20秒",
  },
];
const selectRefreshTime = (time) => {
  refreshTime.value = time;
  if (!autoRefresh.value) {
    autoRefresh.value = true;
  }
  stopAutoRefresh();
  startAutoRefresh();
};

const generateRandomTaskName = () => {
  const randomName = "任务-" + Math.floor(Math.random() * 1000);
  form.taskName = randomName;
};

// 显示 一分钟5秒(65s) 一小时5分钟(3605s) 一天5小时(86405s
// 定义格式化耗时函数
const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds}秒`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分钟${
      remainingSeconds > 0 ? remainingSeconds + "秒" : ""
    }(${seconds}秒)`;
  }
};

const controlRefresh = (isEnableRefresh) => {
  if (isEnableRefresh) {
    if (refreshTime.value !== undefined) {
      stopAutoRefresh(); // 确保在开启前，先停止之前的定时器
      startAutoRefresh();
    }
  } else {
    stopAutoRefresh();
    refreshTime.value = 5000; // 重置为默认值
    ElMessage.info("自动刷新已关闭");
  }
};

const handlePageChange = (val) => {
  page.value = val;
  getTableData();
};

const handleSizeChange = (val) => {
  pageSize.value = val;
  getTableData();
};

const searchTask = async () => {
  currentSearchText.value = searchText.value;
  await getTableData();
};

const clearSearch = () => {
  searchText.value = "";
  currentSearchText.value = "";
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

  if (typeof sortProp === "string" && typeof sortOrder === "string") {
    params.sort = sortProp;
    params.order = sortOrder;
  }

  const table = await getSieveTaskList(params);
  if (table.code === 0) {
    // tableData.value = []
    setTimeout(() => {
      tableData.value = table.data.list;
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
    order = order === "ascending" ? "asc" : "desc";
    prop = prop ? camelToSnake(prop) : null; // 将 prop 从 camelCase 转换为 snake_case
  }

  getTableData(prop, order);
};

function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
}

// 删除任务
const deleteTask = (row) => {
  ElMessageBox.confirm("此操作将永久删除该任务及相关账号, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await deleteSieveTask({ ID: row.ID });
      if (res.code === 0) {
        ElMessage.success("任务删除成功！");
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--;
        }
        getTableData();
        // 当删除后没有运行中的任务时，停止自动刷新
        if (!tableData.value.some((item) => item.status === "Running")) {
          stopAutoRefresh();
        }
      }
    })
    .catch(() => {
      ElMessage.warning("已取消删除");
    });
};

const getStatusButtonType = (status, row) => {
  switch (status) {
    case "Init":
      return "初始化";
    case "Pending":
      return "等待";
    case "Success":
      return "成功";
    case "Failed":
      return "失败";
    case "Running":
      // 计算总进度百分比
      if (row.totalNumber > 0) {
        const totalProcessed =
          Number(row.nonDisabledAccounts) +
          Number(row.disabledAccounts) +
          Number(row.invalidAccounts);
        const totalProgress = Math.floor(
          (totalProcessed / Number(row.totalNumber)) * 100
        );
        return `运行中 ( ${totalProgress}%)`;
      }
      return "运行中";
    case "Pause":
      return "暂停";
    default:
      return "";
  }
};

const getButtonType = (status) => {
  switch (status) {
    case "Init":
      return "info";
    case "Pending":
      return "warning";
    case "Success":
      return "success";
    case "Failed":
      return "danger";
    case "Running":
      return "info";
    case "Pause":
      return "danger";
    default:
      return "";
  }
};

const getButtonIcon = (status) => {
  switch (status) {
    case "Init":
      return "el-icon-help-filled";
    case "Pending":
      return "el-icon-clock";
    case "Success":
      return "CircleCheck";
    case "Failed":
      return "el-icon-circle-close";
    case "Running":
      return "el-icon-loading";
    case "Pause":
      return "VideoPlay";
    default:
      return "";
  }
};

// 新建任务
const formRef = ref(null);

const fileList = ref([]);
const handleUploadChange = (file, fileListUpdated) => {
  fileList.value = fileListUpdated;
  if (fileListUpdated.length > 0) {
    form.file = fileListUpdated[0].raw;
  } else {
    form.file = null;
  }
};

const form = reactive({
  taskName: "",
  concurrency: null,
  file: null,
  immediate: true,
  country_id: null,
});

onMounted(() => {
  initForm();
});

const initForm = () => {
  // refreshCountryInfoList()

  // 重置 form 对象以匹配默认值
  form.taskName = "";
  form.country_id = null;
  form.concurrency = null;
  form.file = null;
  form.immediate = true;
};

const rules = {
  taskName: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
  file: [{ required: true, message: "请上传文件", trigger: "change" }],
  country_id: [
    { required: true, message: "请选择国家区号", trigger: "change" },
  ],
  concurrency: [
    { required: true, message: "请输入线程数", trigger: "blur" },
    { type: "number", message: "线程数必须为数字值", trigger: "blur" },
  ],
};

const submitForm = async () => {
  // 验证表单
  const valid = await formRef.value.validate();
  if (!valid) return;

  // 显示进度条并初始化
  isShowProgress.value = true;
  loadingProgress.value = 0;

  // 初始化定时器ID
  let intervalId;

  // 设置一个定时器来模拟上传进度
  // eslint-disable-next-line prefer-const
  intervalId = setInterval(() => {
    if (loadingProgress.value < 90) {
      loadingProgress.value += 20; // 每次增加20%
    }
  }, 500);

  // 构建 formData
  const formData = new FormData();
  formData.append("taskName", form.taskName);
  formData.append("concurrency", form.concurrency);
  formData.append("immediate", form.immediate);
  formData.append("country_id", form.country_id);

  if (form.file) {
    formData.append("file", form.file, form.file.name);
  }

  try {
    // 发送请求
    const response = await createSieveTask(formData);
    console.log("response", response);

    // 根据响应结果处理
    if (response && response.code === 0) {
      ElMessage.success("添加成功！");
      concurrencyInfo.value.currentConcurrency -= form.concurrency;

      // 如果响应成功，立即将进度条设置为100%，关闭弹窗
      clearInterval(intervalId);
      loadingProgress.value = 100;
      isShowProgress.value = false;
      closeDialog();
      setTimeout(getTableData, 1000); // 1秒后刷新列表
    } else {
      // 如果响应失败，显示错误消息
      clearInterval(intervalId);
      ElMessage.error("添加失败，请稍后重试。");
    }
  } catch (error) {
    // 处理异常情况
    clearInterval(intervalId);
    ElMessage.error(error.message);
  } finally {
    // 重置表单
    setTimeout(() => {
      resetForm();
    }, 500);
  }
};

const resetForm = () => {
  // 如果 formRef 是有效的，重置表单字段
  if (formRef.value) {
    formRef.value.resetFields();

    // 清空文件列表和文件字段
    fileList.value = [];
    form.file = null;
  }
};

// 开启自动刷新
let refreshTimer = null;
const startAutoRefresh = () => {
  console.log(refreshTime.value);
  // 判断是否选择了刷新时间,如果没选择默认为5秒
  if (refreshTime.value === undefined) {
    refreshTime.value = 5000;
    ElMessage.success("开启自动刷新默认为5秒");
  } else {
    ElMessage.success("开启自动刷新");
  }
  if (!refreshTimer) {
    console.log(refreshTimer);
    refreshTimer = setInterval(() => {
      getTableData();
    }, refreshTime.value);
  }
};

// 停止自动刷新
const stopAutoRefresh = () => {
  if (refreshTimer) {
    console.log(refreshTimer);
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
};

// const shouldAutoRefresh = (list) => {
//   // 如果列表中存在至少一个状态为 'Running' 的项，则返回true
//   return list.some((item) => item.status === 'Running')
// }

onMounted(() => {
  // 定义定时器，每十秒刷新数据
  // startAutoRefresh()

  // 当用户离开页面时清除定时器
  window.addEventListener("beforeunload", () => {
    stopAutoRefresh();
  });
});

const openPause = (row) => {
  ElMessageBox.confirm(`您确定要暂停"${row.taskName}"吗`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await pauseTask(row.ID);
      if (res.code === 0) {
        ElMessage({
          type: "success",
          message: "暂停成功",
        });
        setTimeout(() => {
          getTableData();
        }, 500);
      } else {
        ElMessage({
          type: "error",
          message: res.data.message || "暂停任务失败",
        });
      }
      getTableData();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "操作已取消",
      });
    });
};

const openRecover = (row) => {
  ElMessageBox.confirm(`您确定要恢复"${row.taskName}"吗`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const res = await recoverTask(row.ID);
        console.log("测试", res);
        if (res.code === 0) {
          ElMessage({
            type: "success",
            message: `任务 "${row.taskName}" 恢复成功!`,
          });
          setTimeout(() => {
            getTableData();
          }, 3000);
        } else {
          ElMessage({
            type: "error",
            message: res.data.message || "恢复任务失败",
          });
        }
      } catch (error) {
        if (error && error.response) {
          ElMessage({
            type: "error",
            message: error.response.data.message || "请求失败",
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
  ElMessage.info("准备下载，请稍候...");

  try {
    const response = await downloadFunc(row.ID);
    if (response && response.data) {
      // 提取文件名
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "download.txt"; // 默认文件名

      if (contentDisposition) {
        const filenameMatch =
          contentDisposition.match(/filename\*?=UTF-8''(.+?)(;|$)/) ||
          contentDisposition.match(/filename="?(.+?)"?(;|$)/);
        if (filenameMatch && filenameMatch.length > 1) {
          fileName = decodeURIComponent(filenameMatch[1]);
        }
      }

      console.log(`开始下载 ${fileName}`, response);
      const blob = new Blob([response.data], { type: "text/plain" });

      // 创建下载链接并模拟点击进行下载
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // 下载成功提示
      ElMessage.success("下载成功");
    } else {
      ElMessage.error("下载失败：服务器未返回文件");
    }
  } catch (error) {
    // 显示具体的错误信息
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : "下载出错";
    ElMessage.error(errorMessage);
    console.error("下载出错", error);
  }
};

// 下载禁用账号
const downloadDisable = async (row) => {
  await downloadFile(downloadDisableAccounts, row);
};

// 下载存活账号
const downloadNormal = async (row) => {
  await downloadFile(downloadNormalAccounts, row);
};

// 下载存活账号
const downloadInvalid = async (row) => {
  await downloadFile(downloadInvalidAccounts, row);
};

// 下载存活账号
const downloadAll = async (row) => {
  await downloadFile(downloadAllAccounts, row);
};

const downloadFailed = async (row) => {
  await downloadFile(downloadFailedAccounts, row);
};

const downloadOrigin = async (row) => {
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

const customSummary = (param) => {
  const { columns, data } = param;
  const sums = [];

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "合计";
      return;
    }

    // 只对特定的列进行合计
    if (
      ["nonDisabledAccounts", "disabledAccounts", "totalNumber"].includes(
        column.property
      )
    ) {
      const values = data.map((item) => Number(item[column.property]));
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr);
        return !isNaN(value) ? prev + curr : prev;
      }, 0);
    } else {
      // 其他列可以设为空字符串或者其他标识
      sums[index] = "";
    }
  });

  return sums;
};

const closeDialog = () => {
  initForm();
  dialogFormVisible.value = false;
};

const type = ref("");

const countryInfoList = ref([]);
const refreshCountryInfoList = async () => {
  const result = await getCountryInfoList(1, 500);
  if (result.code === 0 && Array.isArray(result.data.list)) {
    countryInfoList.value = [];
    setTimeout(() => {
      countryInfoList.value = result.data.list;
    }, 100);
  }
};

const dialogTitle = ref("新增Api");
const dialogFormVisible = ref(false);
const openDialog = (key) => {
  switch (key) {
    case "add":
      dialogTitle.value = "添加筛号任务";
      setTimeout(() => {
        form.concurrency =
          concurrencyInfo.value.concurrencyLimit -
          concurrencyInfo.value.currentConcurrency;
        generateRandomTaskName();
      }, 400);
      break;
    case "edit":
      dialogTitle.value = "编辑筛号任务";
      break;
    default:
      break;
  }
  type.value = key;
  dialogFormVisible.value = true;
};

const columns = [
  {
    title: "序号",
    width: 100,
    dataIndex: "index",
    key: "index",
    fixed: "left",
  },
  {
    title: "任务名称",
    width: 100,
    dataIndex: "taskName",
    key: "taskName",
    fixed: "left",
  },
  { title: "文件名称", dataIndex: "file_name", key: "1" },
  { title: "状态", dataIndex: "status", key: "status" },
  { title: "正常", dataIndex: "nonDisabledAccounts", key: "3" },
  { title: "封禁", dataIndex: "disabledAccounts", key: "4" },
  { title: "无效", dataIndex: "invalidAccounts", key: "5" },
  { title: "总数", dataIndex: "totalNumber", key: "6" },
  { title: "线程数", dataIndex: "concurrency", key: "6" },
  { title: "添加时间", dataIndex: "createdAt", key: "7" },
  { title: "更新时间", dataIndex: "updatedAt", key: "8" },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 180,
    scopedSlots: { customRender: "operation" },
  },
];

const getStatusTag = (status) => {
  switch (status) {
    case "Init":
      return "gray";
    case "Pending":
      return "#fffdf1";
    case "Success":
      return "#92c800";
    case "Failed":
      return "#d72539";
    case "Running":
      return "#88d0ff";
    case "Pause":
      return "#ff6d00";
    default:
      return "";
  }
};

const multipleTableRef = ref(null);
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const batchDelete = () => {
  // 显示确认对话框
  ElMessageBox.confirm("确认要删除选中的行数据吗？", "批量删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async (row) => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status !== "Running") {
          // 调用删除任务的函数
          const res = await deleteSieveTask({ ID: row.ID });
          if (res.code === 0) {
            ElMessage.success("任务删除成功");
            if (tableData.value.length === 1 && page.value > 1) {
              page.value--;
            }
            getTableData();
            // 当删除后没有运行中的任务时，停止自动刷新
            if (!tableData.value.some((item) => item.status === "Running")) {
              stopAutoRefresh();
            }
          }
        }
      });
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage.warning("已取消批量删除");
    });
};

const batchPause = () => {
  // 显示确认对话框
  ElMessageBox.confirm("确认要暂停选中的行数据吗？", "批量暂停", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async (row) => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status === "Running") {
          // 调用删除任务的函数
          const res = await pauseTask(row.ID);
          if (res.code === 0) {
            ElMessage.success("任务暂停成功!");
            if (tableData.value.length === 1 && page.value > 1) {
              page.value--;
            }
            getTableData();
            // 当删除后没有运行中的任务时，停止自动刷新
            if (!tableData.value.some((item) => item.status === "Running")) {
              stopAutoRefresh();
            }
          }
        }
      });
    })
    .catch(() => {
      // 用户点击了取消按钮
      ElMessage.warning("已取消批量暂停");
    });
};

const batchRecover = () => {
  // 显示确认对话框
  ElMessageBox.confirm("确认要暂停选中的行数据吗？", "批量恢复", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 用户点击了确定按钮，执行删除操作
      multipleSelection.value.forEach(async (row) => {
        // 只有当状态不是Running时，才调用删除接口
        if (row.status === "Pause") {
          // 调用删除任务的函数
          const res = await recoverTask(row.ID);
          if (res.code === 0) {
            ElMessage.success("任务恢复成功!");
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
      ElMessage.warning("已取消批量恢复");
    });
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
</style>
