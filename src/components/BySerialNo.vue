<template>
  <el-row>
    <el-col :span="12">
      <el-row>
        <el-card class="box-card" style="margin-left: 0px; height: 210px">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px"><i class="el-icon-setting"></i> Commit Serial No</span>
            <el-button style="float: right; padding: 3px 0" type="text"
            @click="changeStep(50)"
            :disabled="selectedSerialNos.length > 0 && selectedSerialNos.length < 1000 ? false : true"
            >Confirm</el-button>
          </div>
          <div>
            <el-row>
              <el-col :span="12" style="padding-top: 10px">
                <upload @refresh="refreshUpload" @clearBarcodes="clearBarcodes"></upload>
              </el-col>
              <el-col :span="12">
                <!-- <el-tag
                  v-for="(sn, index) in selectedSerialNos"
                  :key="index">
                  {{ sn }}
                </el-tag> -->
                <h3>{{update_status}}</h3>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card" style="margin-left: 0px; height: 390px">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-setting"></i> Commit ET Test Items</span>
            <el-button style="float: right; padding: 3px 0" type="text"
            :disabled="selectedItems.length === 0 ? true : false"
            @click="changeStep(100)">Confirm</el-button>
          </div>
          <div>
            <transfer-box @change='changeSelected'></transfer-box>
          </div>
        </el-card>
      </el-row>
      <el-row style="margin-top: 10px; text-align: left">
        <el-col :span='20'>
          <el-progress :text-inside="true" :stroke-width="40" :percentage="step"></el-progress>
        </el-col>
        <el-col :span='4'>
          <el-button
           type="primary"
           icon="el-icon-upload"
           :disabled="step === 100 ? false : true"
           style="float: right" @click="startTask">Start Analyse</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card" style="margin-right: 0px; height: 680px">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-data-board"></i> Task Status</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            @click="getTaskStatus">Refresh</el-button>
        </div>
        <div>
          <task-table :myData="taskStatusData" v-if="flag"></task-table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Upload from './others/Upload.vue'
import TransferBox from './others/TransferBox.vue'
import TaskTable from './tables/TaskTable.vue'

export default {
  data () {
    return {
      taskStatusData: [],
      selectedItems: [],
      selectedSerialNos: [],
      step: 0,
      update_status: 'Waiting for upload some serial',
      flag: false,
      loading: true
    }
  },
  methods: {
    changeSelected (msg) {
      this.selectedItems = msg
    },
    changeStep (step) {
      // console.log(this.selectedItems)
      if (this.step === 0) {
        if (step === 100) {
          alert('请选择SerialNo')
        } else {
          this.step = step
        }
      } else {
        this.step = step
      }
    },
    startTask () {
      let postData = {
        'selectedItems': this.selectedItems,
        'selectedSerials': this.selectedSerialNos
      }
      this.flag = false
      this.$http.post('/start_task', postData).then((res) => {
        this.taskStatusData = res.data
        this.flag = true
      })
    },
    refreshUpload () {
      this.$http.get(
        // 'http://127.0.0.1:5000/get_update_data'
        '/get_update_data'
      ).then((res) => {
        if (res.data.code === 200) {
          this.selectedSerialNos = res.data.data.snList
          this.update_status = 'Total update ' + res.data.data.count + ' pcs'
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.message
          })
        }
      })
    },
    clearBarcodes () {
      this.selectedSerialNos = []
    },
    getTaskStatus () {
      this.flag = false
      this.$http.get(
        '/get_task_status'
      ).then((res) => {
        this.taskStatusData = res.data
        this.flag = true
      })
      this.loading = false
    }
  },
  mounted () {
    this.getTaskStatus()
  },
  components: {
    'upload': Upload,
    'transfer-box': TransferBox,
    'task-table': TaskTable
  }
}
</script>

<style scoped>
.box-card {
  margin: 5px;
  text-align: left;
  overflow-y: scroll
}
span {
  font-family: Arial
}
.el-tag {
  margin: 2px
}
</style>
