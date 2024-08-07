<template>
  <el-container class="layout-cont">
    <el-container :class="[isSider ? 'openside' : 'hideside', isMobile ? 'mobile' : '']">
      <el-row
        :class="[isShadowBg && isMobile ? 'bg-black opacity-50 w-full h-full absolute top-0 left-0 z-10' : '']"
        @click="changeShadow()"
      />
      <el-aside
        class="main-cont gva-aside"
        :style="{ width: asideWidth() }"
      >
        <div
          class="min-h-[60px] text-center transition-all duration-300 flex items-center justify-center gap-2"
          :style="{ background: backgroundColor, padding: '10px 0' }"
        >
          <div
            v-if="isSider"
            class="inline-flex font-mono font-bold text-3xl"
            :style="{ color: textColor }"
          >
            {{ $GIN_VUE_ADMIN.appName }}
          </div>
        </div>
        <Aside class="aside" />
      </el-aside>
      <el-main class="main-cont main-right">
        <transition
          :duration="{ enter: 500, leave: 100 }"
          mode="out-in"
          name="fade-in"
        >
          <div
            :style="{ width: `calc(100% - ${getAsideWidth()})` }"
            class="fixed top-0 box-border z-20"
          >
            <el-row>
              <el-col>
                <el-header class="header-cont">
                  <el-row class="p-0 h-full">
                    <el-col
                      :xs="2"
                      :lg="1"
                      :md="1"
                      :sm="1"
                      :xl="1"
                      class="flex items-center pl-3"
                    >
                      <div
                        class="text-black cursor-pointer text-lg leading-5"
                        @click="totalCollapse"
                      >
                        <div
                          v-if="isCollapse"
                          class="gvaIcon gvaIcon-arrow-double-right"
                        />
                        <div
                          v-else
                          class="gvaIcon gvaIcon-arrow-double-left"
                        />
                      </div>
                    </el-col>
                    <el-col
                      :xs="10"
                      :lg="14"
                      :md="14"
                      :sm="9"
                      :xl="14"
                      :pull="1"
                      class="flex items-center"
                    >
                      <el-breadcrumb
                        v-show="!isMobile"
                        class="breadcrumb"
                        separator="/"
                      >
                        <el-breadcrumb-item
                          v-for="item in matched.slice(1, matched.length)"
                          :key="item.path"
                        >
                          {{ fmtTitle(item.meta.title, route) }}
                        </el-breadcrumb-item>
                      </el-breadcrumb>
                    </el-col>
                    <el-col
                      :xs="12"
                      :lg="9"
                      :md="9"
                      :sm="14"
                      :xl="9"
                      class="flex items-center justify-end pr-3"
                    >
                      <div class="flex items-center">
                        <el-button
                          icon="Clock"
                          :type="remainingTime.color"
                          class="max-h-fit mr-6"
                        >
                          到期时间:
                          {{ remainingTime.expired ? '已过期' + remainingTime.days + '天' : remainingTime.days >= 1 ? remainingTime.days + '天' : remainingTime.hours + '小时' + remainingTime.minutes + '分' + remainingTime.seconds + '秒' }}
                        </el-button>
                        <el-dropdown>
                          <div class="flex justify-center items-center h-full w-full">
                            <span class="cursor-pointer flex justify-center items-center">
                              <CustomPic />
                              <span
                                v-show="!isMobile"
                                class="ml-2"
                              >{{ userStore.userInfo.nickName }}</span>
                              <el-icon>
                                <arrow-down />
                              </el-icon>
                            </span>
                          </div>
                          <template #dropdown>
                            <el-dropdown-menu>
                              <template v-if="userStore.userInfo.authorities">
                                <el-dropdown-item
                                  v-for="item in userStore.userInfo.authorities.filter(i => i.authorityId !== userStore.userInfo.authorityId)"
                                  :key="item.authorityId"
                                  @click="changeUserAuth(item.authorityId)"
                                >
                                  <span>切换为：{{ item.authorityName }}</span>
                                </el-dropdown-item>
                              </template>
                              <el-dropdown-item
                                icon="avatar"
                                @click="toPerson"
                              >个人信息</el-dropdown-item>
                              <el-dropdown-item @click="userStore.LoginOut">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                      </div>
                    </el-col>
                  </el-row>
                </el-header>
              </el-col>
            </el-row>
            <HistoryComponent ref="layoutHistoryComponent" />
          </div>
        </transition>
        <router-view
          v-if="reloadFlag"
          v-slot="{ Component }"
          class="admin-box"
        >
          <div
            v-loading="loadingFlag"
            element-loading-text="刷新中"
            :element-loading-svg="svg"
            class="custom-loading-svg"
            element-loading-background="rgba(0, 0, 0, 0)"
          >
            <transition
              mode="out-in"
              name="fade-in"
            >
              <keep-alive :include="routerStore.keepAliveRouters">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </div>
        </router-view>
        <BottomInfo />
        <CommandMenu ref="command" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Aside from '@/view/layout/aside/index.vue'
import HistoryComponent from '@/view/layout/aside/historyComponent/history.vue'
import Search from '@/view/layout/search/search.vue'
import BottomInfo from '@/view/layout/bottomInfo/bottomInfo.vue'
import CustomPic from '@/components/customPic/index.vue'
import CommandMenu from '@/components/commandMenu/index.vue'
import { setUserAuthority } from '@/api/user'
import { emitter } from '@/utils/bus.js'
import { computed, ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRouterStore } from '@/pinia/modules/router'
import { fmtTitle } from '@/utils/fmtRouterTitle'
import { useUserStore } from '@/pinia/modules/user'

defineOptions({
  name: 'Layout',
})

const router = useRouter()
const route = useRoute()
const routerStore = useRouterStore()
// 三种窗口适配
const isCollapse = ref(false)
const isSider = ref(true)
const isMobile = ref(false)

const first = ref('')
const dialogVisible = ref(false)
const theme = ref(true)

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const changeMode = (e) => {
  if (e) {
    userStore.changeSideMode('dark')
    return
  }
  userStore.changeSideMode('light')
}
const initPage = () => {
  // 判断当前用户的操作系统
  if (window.localStorage.getItem('osType') === 'WIN') {
    first.value = 'Ctrl'
  } else {
    first.value = '⌘'
  }
  // 当用户同时按下ctrl和k键的时候
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'k') {
      // 阻止浏览器默认事件
      e.preventDefault()
      handleCommand()
    }
  }
  window.addEventListener('keydown', handleKeyDown)

  const screenWidth = document.body.clientWidth
  if (screenWidth < 1000) {
    isMobile.value = true
    isSider.value = false
    isCollapse.value = true
  } else if (screenWidth >= 1000 && screenWidth < 1200) {
    isMobile.value = false
    isSider.value = false
    isCollapse.value = true
  } else {
    isMobile.value = false
    isSider.value = true
    isCollapse.value = false
  }
}

initPage()

const command = ref()
const handleCommand = () => {
  command.value.open()
}

const loadingFlag = ref(false)
onMounted(() => {
  // 挂载一些通用的事件
  emitter.emit('collapse', isCollapse.value)
  emitter.emit('mobile', isMobile.value)
  emitter.on('reload', reload)
  emitter.on('showLoading', () => {
    loadingFlag.value = true;
    setTimeout(() => {
      loadingFlag.value = false;
    }, 3000); // 三秒后自动关闭加载提示
  });
  emitter.on('closeLoading', () => {
    loadingFlag.value = false
  })
  window.onresize = () => {
    return (() => {
      initPage()
      emitter.emit('collapse', isCollapse.value)
      emitter.emit('mobile', isMobile.value)
    })()
  }
  if (userStore.loadingInstance) {
    userStore.loadingInstance.close()
  }
})

const userStore = useUserStore()

const asideWidth = () => {
  if (isMobile.value) {
    return isCollapse.value ? '0px' : '220px'
  }
  return isCollapse.value ? '54px' : '220px'
}

const getAsideWidth = () => {
  if (isMobile.value) return '0px'
  return isCollapse.value ? '54px' : '220px'
}

const textColor = computed(() => {
  console.log(userStore.sideMode)
  if (userStore.sideMode === 'dark') {
    return '#fff'
  } else if (userStore.sideMode === 'light') {
    return '#2D2A2F'
  } else {
    return userStore.baseColor
  }
})

const backgroundColor = computed(() => {
  // if (userStore.sideMode === 'dark') {
  //   return '#428BE9'
  // } else if (userStore.sideMode === 'light') {
  //   return '#428BE9'
  // } else {
  //   return userStore.sideMode
  // }
  return '#fff'
})

const matched = computed(() => route.meta.matched)

const changeUserAuth = async(id) => {
  const res = await setUserAuthority({
    authorityId: id,
  })
  if (res.code === 0) {
    window.sessionStorage.setItem('needCloseAll', 'true')
    window.location.reload()
  }
}

const reloadFlag = ref(true)
let reloadTimer = null
const reload = async() => {
  if (reloadTimer) {
    window.clearTimeout(reloadTimer)
  }
  reloadTimer = window.setTimeout(async() => {
    if (route.meta.keepAlive) {
      reloadFlag.value = false
      await nextTick()
      reloadFlag.value = true
    } else {
      const title = route.meta.title
      router.push({ name: 'Reload', params: { title }})
    }
  }, 400)
}

const isShadowBg = ref(false)
const totalCollapse = () => {
  isCollapse.value = !isCollapse.value
  isSider.value = !isCollapse.value
  isShadowBg.value = !isCollapse.value
  emitter.emit('collapse', isCollapse.value)
}

const toPerson = () => {
  router.push({ name: 'person' })
}
const changeShadow = () => {
  isShadowBg.value = !isShadowBg.value
  isSider.value = !!isCollapse.value
  totalCollapse()
}

const remainingTime = computed(() => {
  // 获取当前时间
  const now = new Date()
  // 获取过期时间
  const expireDate = new Date(userStore.userInfo.expire_date)
  // 计算差值（单位：毫秒）
  const diff = expireDate - now
  let color = 'success' // 默认为绿色

  if (diff < 0) {
    // 已过期，计算过期天数
    const days = Math.ceil(Math.abs(diff) / (1000 * 60 * 60 * 24))
    color = 'danger' // 红色
    // 移除本地存储的'token'
    window.localStorage.removeItem('token')
    return { days, expired: true, color }
  } else {
    // 将差值转换为天数、小时、分钟和秒数
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    if (days <= 15) {
      color = 'warning' // 黄色
    }
    return { days, hours, minutes, seconds, expired: false, color }
  }
})

</script>

<style lang="scss">
.button {
  font-size: 12px;
  color: #666;
  background: rgb(250, 250, 250);
  width: 25px !important;
  padding: 4px 8px !important;
  border: 1px solid #eaeaea;
  margin-right: 4px;
  border-radius: 4px;
}
:deep .el-overlay {
  background-color: hsla(0, 0%, 100%, 0.9) !important;
}

.custom-loading-spinner {
  width: 1em;
  height: 1em;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
