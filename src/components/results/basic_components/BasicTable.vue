<template>
  <el-table
    :data="tableData"
    border
    max-height="300"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="barcode"
      label="Barcode"
      sortable
      width="220">
    </el-table-column>
    <el-table-column
      prop="date"
      label="Date"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="lot"
      label="WorkOrder(Lot)"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="ICT"
      label="ICT"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="Leak"
      label="Leak"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="PST"
      sortable
      label="PST">
    </el-table-column>
    <el-table-column
      prop="RF"
      sortable
      label="RF">
    </el-table-column>
    <el-table-column
      prop="SOUND"
      sortable
      label="SOUND">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: this.myData
    }
  },
  props: [ 'myData' ]
}
</script>
