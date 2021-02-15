<template>
<div>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
    <el-table-column prop="id" label="Id" width="80">
    </el-table-column>
    <el-table-column prop="taskName" label="TaskName" width="120">
    </el-table-column>
    <el-table-column prop="startTime" label="startTime" width="120">
    </el-table-column>
    <el-table-column prop="process" label="Process" width="180">
    </el-table-column>
    <el-table-column prop="status" label="Status" width="120">
    </el-table-column>
    <el-table-column
      label="Action"
      width="120">
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
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    layout="prev, pager, next"
    :total="tableData.length"
  ></el-pagination>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: this.myData,
      currentPage: 1,
      pageSize: 8
    }
  },
  methods: {
    getResult (index, row) {
      this.$router.push({
        path: '/platformET/byLotResult/lotComparison',
        query: {
          id: row.id
        }
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  },
  props: [ 'myData' ]
}
</script>
