<template>
<div>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
    <el-table-column prop="id" label="Id" width="50">
    </el-table-column>
    <el-table-column prop="taskName" label="TaskName" width="160">
    </el-table-column>
    <el-table-column prop="startTime" label="StartTime" width="160">
    </el-table-column>
    <el-table-column prop="process" label="Process" width="100">
    </el-table-column>
    <el-table-column prop="status" label="Status" width="100">
    </el-table-column>
    <el-table-column
      label="Action"
      width="100">
      <template slot-scope="scope">
        <el-button
          type="text"
          :disabled="scope.row.status === 'Finished' ? false : true"
          @click="getResult(scope.$index, scope.row)"
          size="small">
          查看结果
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    layout="prev, pager, next"
    :total="tableData.length"
    :page-size="pageSize"
  ></el-pagination>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: this.myData,
      currentPage: 1,
      pageSize: 9
    }
  },
  methods: {
    getResult (index, row) {
      // console.log(row.status === 'Finished')
      this.$router.push({
        path: '/platformET/bySerialResult/rejectTrace',
        query: {
          id: row.taskName
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  },
  props: [ 'myData' ]
}
</script>
