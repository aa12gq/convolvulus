<template>
  <div id="app">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

defineOptions({
  name: 'App'
})

</script>
<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
// 引入初始化样式
#app {
  background: #eee;
  height: 100vh;
  overflow: hidden;
  font-weight: 400 !important;
}
.el-button{
  font-weight: 400 !important;
  border: none !important;
  border-radius: 10px !important;
  overflow: hidden !important;
}


</style>
