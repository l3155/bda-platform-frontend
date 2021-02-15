<template>
<el-row>
  <el-upload
      class="upload-demo"
      ref="upload"
      action="/submit_upload_file"
      accept=".csv"
      :multiple="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="requireRefresh"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">Select CSV File</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Commit</el-button>
      <div slot="tip" class="el-upload__tip">Only One File, limit 1000 pcs</div>
    </el-upload>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      fileList: []
    }
  },
  created () {
    // let url = '/get_file'
    // this.$http.get(url).then((res) => {
    //   this.fileList = res.data
    // })
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
      this.$notify({
        title: '成功',
        message: '文件上传成功',
        type: 'success'
      })
    },
    requireRefresh (res, file) {
      // console.log(res)
      if (res === 'success') {
        this.$emit('refresh')
      }
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
      this.$emit('clearBarcodes')
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 100px;
  text-align: left;
  font-size: 12px
}
</style>
