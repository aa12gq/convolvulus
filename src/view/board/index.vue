<template>
  <div class="p-6 space-y-10">

    <!-- 统计卡片区域 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 钱包余额统计卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
        <div>
          <span class="text-lg font-semibold">钱包余额</span>
          <el-tooltip
            effect="dark"
            content="您的个人钱包余额"
            placement="top"
          >
            <el-icon
              style="margin-left: 4px"
              :size="12"
            ><Warning /></el-icon>
          </el-tooltip>
        </div>
        <div class="text-2xl font-bold text-gray-800">{{ form.balance }}</div>
        <div
          v-if="form.balance < 1000"
          class="text-red-500 text-sm"
        >
          {{ form.balance < 100 ? '金额不足100元' : '金额不足1000元' }}
        </div>
      </div>

      <!-- 已解封数量统计卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="text-lg font-semibold">已解封数量</div>
        <div class="text-2xl font-bold text-gray-800">693700</div>
      </div>

      <!-- 正常账号数量统计卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="text-lg font-semibold">正常账号数量</div>
        <div class="text-2xl font-bold text-gray-800">72000</div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 钱包余额变化折线图卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div
          ref="balanceChartRef"
          class="echart-container"
        />
      </div>

      <!-- 交易量柱状图卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div
          ref="transactionVolumeChartRef"
          class="echart-container"
        />
      </div>

      <!-- 交易类型比例饼图卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div
          ref="transactionTypeChartRef"
          class="echart-container"
        />
      </div>
    </div>

    <!-- 解封号码图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 每日解封号码数量图表卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div
          ref="dailyUnblockChartRef"
          class="echart-container"
        />
      </div>

      <!-- 每日成功解封号码数量图表卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div
          ref="successfulUnblockChartRef"
          class="echart-container"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {
  Warning,
} from '@element-plus/icons-vue'
import { getMyWalletBalance } from '@/api/wallet'
import * as echarts from 'echarts'
import { ref, onMounted, reactive, nextTick } from 'vue'

const form = reactive({
  balance: 0,
})

const RefreshData = async() => {
  const res = await getMyWalletBalance()
  form.balance = res.data.balance
}

onMounted(async() => {
  RefreshData()
  await nextTick() // 确保 DOM 已更新
  setTimeout(() => {
    initCharts()
  }, 0) // 允许浏览器时间来渲染布局
})

// 钱包余额折线图的假数据
const balanceData = {
  dates: ['01-01', '01-02', '01-03', '01-04', '01-05'],
  balances: [3000, 4500, 3200, 5000, 4000]
}

// 交易量柱状图的假数据
const transactionVolumeData = {
  months: ['一月', '二月', '三月', '四月', '五月'],
  volumes: [300, 400, 350, 500, 400]
}

// 交易类型比例饼图的假数据
const transactionTypeData = [
  { value: 1048, name: '充值' },
  { value: 735, name: '提现' },
  { value: 580, name: '支付' },
  { value: 484, name: '退款' },
  { value: 300, name: '其他' }
]

const balanceChartRef = ref(null)
const transactionVolumeChartRef = ref(null)
const transactionTypeChartRef = ref(null)
const dailyUnblockChartRef = ref(null)
const successfulUnblockChartRef = ref(null)

const initCharts = () => {
  const balanceChart = echarts.init(balanceChartRef.value)
  const transactionVolumeChart = echarts.init(transactionVolumeChartRef.value)
  const transactionTypeChart = echarts.init(transactionTypeChartRef.value)
  balanceChart.resize()
  transactionVolumeChart.resize()
  transactionTypeChart.resize()
  // 每日解封号码数量图表
  const dailyUnblockChart = echarts.init(dailyUnblockChartRef.value)
  dailyUnblockChart.resize()
  // 每日成功解封号码数量图表
  const successfulUnblockChart = echarts.init(successfulUnblockChartRef.value)
  successfulUnblockChart.resize()

  // 配置每日解封号码数量图表
  dailyUnblockChart.setOption({
    title: { text: '每日解封号码数量' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: dailyUnblockData.dates },
    yAxis: { type: 'value' },
    series: [{ data: dailyUnblockData.unblocks, type: 'line', smooth: true }]
  })

  // 配置每日成功解封号码数量图表
  successfulUnblockChart.setOption({
    title: { text: '每日成功解封号码数量' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: successfulUnblockData.dates },
    yAxis: { type: 'value' },
    series: [{ data: successfulUnblockData.successful, type: 'line', smooth: true }]
  })

  // 配置钱包余额折线图
  balanceChart.setOption({
    title: { text: '钱包余额变化' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: balanceData.dates },
    yAxis: { type: 'value' },
    series: [{ data: balanceData.balances, type: 'line', smooth: true }]
  })

  // 配置交易量柱状图
  transactionVolumeChart.setOption({
    title: { text: '交易量' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: transactionVolumeData.months },
    yAxis: { type: 'value' },
    series: [{ data: transactionVolumeData.volumes, type: 'bar', barWidth: '60%' }]
  })

  // 配置交易类型比例饼图
  transactionTypeChart.setOption({
    title: { text: '交易类型比例' },
    tooltip: { trigger: 'item' },
    legend: { top: 'bottom' },
    series: [
      {
        name: '交易类型',
        type: 'pie',
        radius: '50%',
        data: transactionTypeData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
}

// 每日解封号码数量的假数据
const dailyUnblockData = {
  dates: ['01-01', '01-02', '01-03', '01-04', '01-05'],
  unblocks: [120, 150, 100, 170, 200]
}

// 每天每日成功解封号码数量的假数据
const successfulUnblockData = {
  dates: ['01-01', '01-02', '01-03', '01-04', '01-05'],
  successful: [80, 120, 90, 160, 190]
}

</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}

.echart-container {
  height: 350px;
}

</style>
