<template>
  <div class="break-point">
    <div class="gva-table-box">
      <el-divider>文件上传</el-divider>
      <div class="center-content">
        <form id="fromCont" method="post">
          <div class="fileUpload" @click="inputChange">
            选择文件
            <input
                v-show="false"
                id="file"
                ref="FileInput"
                multiple="multiple"
                type="file"
                @change="choseFile"
            />
          </div>
        </form>
        <el-button
            :disabled="limitFileSize"
            type="primary"
            class="uploadBtn h-8 -mt-1 !rounded-none"
            @click="getFile"
        >
          点击上传
        </el-button>
        <el-button
            type="danger"
            class="uploadBtn h-8 -mt-1 !rounded-none"
            @click="clearFile"
        >
          清除文件
        </el-button>
      </div>
      <div class="list">
        <transition name="list" tag="p">
          <div v-if="file" class="list-item">
            <el-icon>
              <document />
            </el-icon>
            <span>{{ file.name }}</span>
            <span class="percentage">{{ percentage }}%</span>
            <el-progress
                :show-text="false"
                :text-inside="false"
                :stroke-width="2"
                :percentage="percentage"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import SparkMD5 from 'spark-md5'
import {
  breakpointContinueFinish,
  removeChunk,
  breakpointContinue
} from '@/api/breakpoint'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'BreakPoint'
})

const emit = defineEmits(['uploadComplete', 'clearFile'])

const file = ref(null)
const fileMd5 = ref('')
const formDataList = ref([])
const waitUpLoad = ref([])
const waitNum = ref(NaN)
const limitFileSize = ref(false)
const percentage = ref(0)
const percentageFlage = ref(true)
const filePath = ref('')

// 选中文件的函数
const choseFile = async (e) => {
  const fileR = new FileReader() // 创建一个reader用来读取文件流
  const fileInput = e.target.files[0] // 获取当前文件
  const maxSize = 1 * 1024 * 1024 * 1024 // 设置最大文件大小为1GB
  file.value = fileInput // file 丢全局方便后面用 可以改进为func传参形式
  percentage.value = 0
  if (file.value.size < maxSize) {
    fileR.readAsArrayBuffer(file.value) // 把文件读成ArrayBuffer  主要为了保持跟后端的流一致
    fileR.onload = async e => {
      // 读成arrayBuffer的回调 e 为方法自带参数 相当于 dom的e 流存在e.target.result 中
      const blob = e.target.result
      const spark = new SparkMD5.ArrayBuffer() // 创建md5制造工具 （md5用于检测文件一致性 这里不懂就打电话问我）
      spark.append(blob) // 文件流丢进工具
      fileMd5.value = spark.end() // 工具结束 产生一个a 总文件的md5
      const FileSliceCap = 1 * 1024 * 1024 // 分片字节数
      let start = 0 // 定义分片开始切的地方
      let end = 0 // 每片结束切的地方a
      let i = 0 // 第几片
      formDataList.value = [] // 分片存储的一个池子 丢全局
      while (end < file.value.size) {
        // 当结尾数字大于文件总size的时候 结束切片
        start = i * FileSliceCap // 计算每片开始位置
        end = (i + 1) * FileSliceCap // 计算每片结束位置
        var fileSlice = file.value.slice(start, end) // 开始切  file.slice 为 h5方法 对文件切片 参数为 起止字节数
        const formData = new window.FormData() // 创建FormData用于存储传给后端的信息
        formData.append('fileMd5', fileMd5.value) // 存储总文件的Md5 让后端知道自己是谁的切片
        formData.append('file', fileSlice) // 当前的切片
        formData.append('chunkNumber', i) // 当前是第几片
        formData.append('fileName', file.value.name) // 当前文件的文件名 用于后端文件切片的命名  formData.appen 为 formData对象添加参数的方法
        formDataList.value.push({ key: i, formData }) // 把当前切片信息 自己是第几片 存入我们方才准备好的池子
        i++
      }
      waitUpLoad.value = formDataList.value // 全部切片都需要上传
      waitNum.value = waitUpLoad.value.length // 记录长度用于百分比展示
      emit('uploadComplete', { path: '', name: file.value.name }) // 传递文件名称给父组件
      filePath.value = ''
      console.log(waitNum.value)
    }
  } else {
    limitFileSize.value = true
    ElMessage('请上传小于1G文件')
  }
}

// 确定按钮
const getFile = () => {
  if (file.value === null) {
    ElMessage('请先上传文件')
    return
  }
  if (percentage.value === 100) {
    percentageFlage.value = false
  }
  sliceFile() // 上传切片
}

// 上传切片
const sliceFile = () => {
  waitUpLoad.value &&
  waitUpLoad.value.forEach(item => {
    // 需要上传的切片
    item.formData.append('chunkTotal', formDataList.value.length) // 切片总数携带给后台 总有用的
    const fileR = new FileReader() // 功能同上
    const fileF = item.formData.get('file')
    fileR.readAsArrayBuffer(fileF)
    fileR.onload = e => {
      const spark = new SparkMD5.ArrayBuffer()
      spark.append(e.target.result)
      item.formData.append('chunkMd5', spark.end()) // 获取当前切片md5 后端用于验证切片完整性
      upLoadFileSlice(item)
    }
  })
}

// 监听切片上传的进度
watch(() => waitNum.value, () => {
  // 这里计算进度时，只计算成功上传的切片
  percentage.value = Math.floor(((formDataList.value.length - waitNum.value) / formDataList.value.length) * 100)
})

// 切片上传函数
const upLoadFileSlice = async (item) => {
  // 切片上传
  const fileRe = await breakpointContinue(item.formData)
  if (fileRe.code !== 0) {
    return
  }
  waitNum.value-- // 百分数增加
  if (waitNum.value === 0) {
    // 切片传完以后 合成文件
    const params = {
      fileName: file.value.name,
      fileMd5: fileMd5.value
    }
    const res = await breakpointContinueFinish(params)
    if (res.code === 0) {
      // 合成文件过后 删除缓存切片
      const params = {
        fileName: file.value.name,
        fileMd5: fileMd5.value,
        filePath: res.data.filePath,
      }
      ElMessage.success('上传成功')
      console.log(res)
      let internalfilePath = res.data.file.FilePath
      if (internalfilePath.startsWith('./')) {
        internalfilePath = internalfilePath.substring(2)
      }
      emit('uploadComplete', {path: internalfilePath, name: res.data.file.FileName}); // 触发事件，传递文件路径
      filePath.value = res.data.filePath
      await removeChunk(params)
    }
  }
}

const FileInput = ref(null)
const inputChange = () => {
  FileInput.value.dispatchEvent(new MouseEvent('click'))
}

const clearFile = () => {
  file.value = null
  FileInput.value.value = null
  percentage.value = 0
  formDataList.value = []
  waitUpLoad.value = []
  waitNum.value = NaN
  limitFileSize.value = false
  emit('clearFile', filePath.value)
  filePath.value = ""
}
</script>

<style lang='scss' scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
#fromCont {
  display: inline-block;
  margin-right: 10px;
}
.fileUpload {
  padding: 3px 10px;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #000;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
}
.fileName {
  display: inline-block;
  vertical-align: top;
  margin: 6px 15px 0 15px;
}
.uploadBtn {
  position: relative;
}
.tips {
  margin-top: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #606266;
}
.el-divider {
  margin: 0 0 30px 0;
}
.list {
  margin-top: 15px;
}
.list-item {
  display: block;
  margin-right: 10px;
  color: #606266;
  line-height: 25px;
  margin-bottom: 5px;
  width: 100%;
  .percentage {
    float: right;
  }
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>