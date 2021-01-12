<!-- upLoadFile -->
<template>
  <div class="upLoadFile">
    <div class="upLoad">
      <div class="upLoad-icon"><i class="el-icon-plus" /></div>
      <input type="file" class="input" :accept="accept" @change="upLoadDate($event)">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UpLoadFile',
  props: {
    accept: {
      type: String,
      default: '*'
    },
    setData: {
      type: Object,
      default: () => { return {} }
    },
    headers: {
      type: Object,
      default: () => { return {} }
    },
    upLoadUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    upLoadDate(e) {
      // 对文件选择进行处理
      const file = e.target.files[0]
      console.log('upLoadDate', file)
      if (!this.checkFile(file)) {
        this.$emit('fileLimit', false)
        return
      }
      const param = new FormData() // 创建form对象
      if (Object.keys(this.setData).length !== 0) { // 判断传入的对象不为空
        let i
        for (i in this.setData) {
          param.append(`${i}`, this.setData[i])
        }
      }
      param.append('file', file) // 通过append向form对象添加数据
      // console.log('fileisno', param) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      const header = { 'Content-Type': 'multipart/form-data' }
      if (Object.keys(this.headers).length !== 0) { // 判断传入的对象不为空，设置请求头
        Object.assign(header, this.headers)
      }
      axios({
        url: this.upLoadUrl,
        method: 'POST',
        data: param,
        headers: header,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const complete = (((progressEvent.loaded / progressEvent.total) * 100) | 0)
            this.$emit('onUploadProgress', complete)
          }
        }
      })
        .then((res) => {
          this.$emit('onUploadSuccess', res)
        })
        .catch((err) => {
          this.$emit('onUploadError', err)
        })
    },
    checkFile(file) {
      if (this.accept === '*') {
        return true
      } else {
        const arrStr = this.accept.split(',')
        console.log('arrStr', arrStr)
        const type = file.name.slice(file.name.indexOf('.'), file.name.length)
        const value = arrStr.some((item) => {
          return item === type
        })
        return value
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.upLoadFile {
  input[type="file"] {
    border: 1px solid;
    width: 100%;
    height: 100%;
    opacity:0;
    cursor: pointer;
    z-index: 100;
  }
  .upLoad {
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  margin: 10px;
  border: 2px dashed #cccccc;
  background: #ffffff;
  cursor: pointer;
  .upLoad-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 40px;
    color:#cccccc;
    z-index: 0;
  }
}
}

</style>
