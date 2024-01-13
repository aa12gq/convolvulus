<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">号仙筛号系统</h1>
      <el-form
        ref="loginForm"
        :model="loginFormData"
        :rules="rules"
        class="login-form"
      >
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginFormData.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginFormData.password"
            placeholder="密码"
            show-password
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <!-- 验证码输入框 -->
        <el-form-item
          v-if="loginFormData.openCaptcha"
          prop="captcha"
        >
          <div class="captcha-container">
            <el-input
              v-model="loginFormData.captcha"
              placeholder="验证码"
              class="captcha-input"
              prefix-icon="el-icon-message"
            />
            <img
              v-if="picPath"
              class="captcha-image"
              :src="picPath"
              alt="验证码"
              @click="loginVerify()"
            >
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="submitForm"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { captcha } from '@/api/user'
import { checkDB } from '@/api/initdb'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/pinia/modules/user'

defineOptions({
  name: 'Login',
})

const router = useRouter()
// 验证函数
const checkUsername = (rule, value, callback) => {
  if (value.length < 5) {
    return callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const checkPassword = (rule, value, callback) => {
  if (value.length < 6) {
    return callback(new Error('请输入正确的密码'))
  } else {
    callback()
  }
}

// 获取验证码
const loginVerify = () => {
  captcha({}).then(async(ele) => {
    rules.captcha.push({
      max: ele.data.captchaLength,
      min: ele.data.captchaLength,
      message: `请输入${ele.data.captchaLength}位验证码`,
      trigger: 'blur',
    })
    picPath.value = ele.data.picPath
    loginFormData.captchaId = ele.data.captchaId
    loginFormData.openCaptcha = ele.data.openCaptcha
  })
}
loginVerify()

// 登录相关操作
const loginForm = ref(null)
const picPath = ref('')
const loginFormData = reactive({
  username: '',
  password: '',
  captcha: '',
  captchaId: '',
  openCaptcha: false,
})
const rules = reactive({
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }],
  captcha: [
    {
      message: '验证码格式不正确',
      trigger: 'blur',
    },
  ],
})

const userStore = useUserStore()
const login = async() => {
  return await userStore.LoginIn(loginFormData)
}
const submitForm = () => {
  loginForm.value.validate(async(v) => {
    if (v) {
      const flag = await login()
      if (!flag) {
        loginVerify()
      }
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写登录信息',
        showClose: true,
      })
      loginVerify()
      return false
    }
  })
}

// 跳转初始化
const checkInit = async() => {
  const res = await checkDB()
  if (res.code === 0) {
    if (res.data?.needInit) {
      userStore.NeedInit()
      router.push({ name: 'Init' })
    } else {
      ElMessage({
        type: 'info',
        message: '已配置数据库信息，无法初始化',
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #74ebd5, #acb6e5);
}

.login-box {
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  width: 350px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 32px; /* 增加字体大小 */
  color: #5D5FEF; /* 改变字体颜色 */
  font-weight: 600; /* 字体加粗 */
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 添加文本阴影 */
  transition: all 0.3s ease; /* 添加过渡效果，使得字体变化更平滑 */
}

.login-title:hover {
  transform: scale(1.05); /* 鼠标悬停时标题放大 */
  color: #4B4DEB; /* 鼠标悬停时改变字体颜色 */
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form .el-form-item {
  margin-bottom: 15px;
}

.login-btn {
  width: 100%;
  height: 40px;
  background-color: #5D5FEF; /* 设置按钮的背景颜色 */
  border: none; /* 移除边框 */
  border-radius: 20px; /* 设置圆角边框 */
  color: white; /* 设置按钮文字颜色 */
  font-size: 16px; /* 设置文字大小 */
  font-weight: 500; /* 设置文字加粗 */
  cursor: pointer; /* 设置鼠标悬停时的指针样式 */
  transition: background-color 0.3s ease; /* 添加背景色变化的过渡效果 */
}

.login-btn:hover {
  background-color: #4B4DEB; /* 鼠标悬停时改变按钮的背景颜色 */
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-input {
  flex-grow: 1;
  margin-right: 10px;
}

.captcha-image {
  width: 100px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
