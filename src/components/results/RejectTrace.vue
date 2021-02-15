<template>
<div class="content" v-loading="loading">
  <el-row>
    <el-col :span='8'>
      <basic-pie v-bind:myData='pieData1' v-if='flag'></basic-pie>
    </el-col>
    <el-col :span='8'>
      <basic-pie v-bind:myData='pieData2' v-if='flag'></basic-pie>
    </el-col>
    <el-col :span='8'>
      <basic-pie v-bind:myData='pieData3' v-if='flag'></basic-pie>
    </el-col>
  </el-row>
  <el-row>
    <basic-table v-bind:myData='tableData' v-if='flag'></basic-table>
  </el-row>
</div>
</template>

<script>
import BasicPie from './basic_components/BasicPie'
import BasicTable from './basic_components/BasicTable'
export default {
  name: 'BasicTrace',
  data () {
    return {
      flag: false,
      pieData1: {},
      pieData2: {},
      pieData3: {},
      tableData: {},
      loading: true
    }
  },
  methods: {
    getData () {
      this.flag = false
      var taskId = this.$route.query.id
      this.$http.get(
        '/get_test_history?' +
        'id=' + taskId
      ).then((res) => {
        this.pieData1 = {
          chartID: 'pie1',
          pieName: 'ET_SUMMARY',
          legend: res.data.pie.etResult.legend,
          data: res.data.pie.etResult.data
        }
        this.pieData2 = {
          chartID: 'pie2',
          pieName: 'WORK_ORDER',
          legend: res.data.pie.lot.legend,
          data: res.data.pie.lot.data
        }
        this.pieData3 = {
          chartID: 'pie3',
          pieName: 'DATE',
          legend: res.data.pie.date.legend,
          data: res.data.pie.date.data
        }
        this.tableData = res.data.table
        this.flag = true
        this.loading = false
      })
    }
  },
  mounted () {
    this.getData()
  },
  components: {
    'basic-pie': BasicPie,
    'basic-table': BasicTable
  }
}
</script>

<style scoped>
.content {
  min-height: 300px;
}
</style>
