<template>
  <el-row>
    <el-col :span="12">
      <el-row>
        <el-card class="box-card" style="margin-left: 0px; height: 210px">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px"><i class="el-icon-setting"></i> Commit Lot No</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="changeStep(50)">确认</el-button>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-input v-model="inputLot"
                placeholder="请输入Lot No"
                size="small"
                @change="addLot"></el-input>
                <el-divider></el-divider>
                <el-button type="primary" @click="addLot">Add</el-button>
                <el-button type="danger" @click="clearAllLot">Clear All</el-button>
              </el-col>
              <el-col :span="16">
                <div class="divier">
                  <el-tag
                    v-for="(lot, index) in lotList"
                    :key="lot"
                    @close="removeLot(index)"
                    closable>
                    {{lot}}
                  </el-tag>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="box-card" style="margin-left: 0px; height: 390px">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-setting"></i> Commit ET Test Items</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="changeStep(100)">确认</el-button>
          </div>
          <div>
            <transfer-box :items='items' @right='changeSelected'></transfer-box>
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
            style="float: right"
            :disabled="step === 100 ? false : true"
            @click="startTask">启动任务</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card" style="margin-right: 0px; height: 663px">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-data-board"></i> Task Status</span>
        </div>
        <div>
          <task-table :myData="taskStatusData"></task-table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import TransferBox from './others/TransferBox.vue'
import TaskTable from './tables/LotTaskTable.vue'

export default {
  data () {
    const taskItem = {
      id: '1',
      taskName: 'MyTask',
      startTime: '2020-01-01',
      status: 'Finished'
    }
    return {
      taskStatusData: Array(50).fill(taskItem),
      items: [{id: 1, name: '测试1'}, {id: 2, name: '测试2'}, {id: 3, name: '测试3'}, {id: 4, name: '测试4'}],
      selectedItemds: [],
      inputLot: '',
      lotList: [],
      step: 0
    }
  },
  methods: {
    changeSelected (msg) {
      this.selectedItemds = msg
      console.log(this.selectedItemds)
    },
    changeStep (step) {
      if (this.step === 0) {
        if (step === 100) {
          alert('请选择LotNo')
        } else {
          this.step = step
        }
      } else {
        this.step = step
      }
    },
    addLot (lot) {
      if (this.inputLot !== '') {
        this.lotList.push(lot)
        this.inputLot = ''
      }
    },
    removeLot (index) {
      this.lotList.splice(index, 1)
    },
    clearAllLot () {
      this.lotList = []
    },
    startTask () {
      let postData = {
        'selectedItems': this.selectedItemds,
        'selectedSerials': this.selectedSerialNos
      }
      this.$http.post('/postData', postData)
    }
  },
  components: {
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
  margin: 5px
}
.divier {
  height: 110px;
  border-left: 1px #507ea4;
  border-left-style: dashed;
  margin-left: 10px
}
.el-divider {
  margin-top: 12px
}
</style>
