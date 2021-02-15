<template>
<div>
  <el-row>
    <basic-bar-line :myData="dataByLot"></basic-bar-line>
  </el-row>
  <el-row>
    <basic-bar-line :myData="dataByDate"></basic-bar-line>
  </el-row>
</div>
</template>

<script>
import BasicBarLine from './basic_components/BasicBarLine'
export default {
  name: 'rejectDistribution',
  data () {
    var yAxis = [
      {
        type: 'value',
        name: 'QTY',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: 'PPM',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value}'
        }
      }
    ]
    return {
      dataByLot: {
        chartName: 'Rejects Distributed By Lot',
        chartID: 'rjbarline1',
        xData: ['LOT1', 'LOT2', 'LOT3', 'LOT4', 'LOT5', 'LOT6', 'LOT7', 'LOT8', 'LOT9', 'LOT10', 'LOT11', 'LOT12'],
        yAxis: yAxis,
        seriesData: [
          {
            name: 'Defect_QTY',
            type: 'bar',
            color: '#096354',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: 'Defect_PPM',
            type: 'line',
            color: '#127DEA',
            yAxisIndex: 1,
            smooth: true,
            data: [2.6, 5.9, 9.0, 2.4, 2.7, 7.7, 5.6, 2.2, 4.7, 8.8, 6.0, 2.3]
          }
        ]
      },
      dataByDate: {
        chartName: 'Rejects Distributed By Date',
        chartID: 'rjbarline2',
        xData: ['1-1', '2-1', '3-1', '4-1', '5-2', '6-1', '7-1', '8-1', '9-1', '10-1', '11-1', '12-1'],
        yAxis: yAxis,
        seriesData: [
          {
            name: 'Defect_QTY',
            type: 'bar',
            color: '#063769',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: 'Defect_PPM',
            type: 'line',
            color: '#409EFF',
            yAxisIndex: 1,
            smooth: true,
            data: [2.6, 5.9, 9.0, 6.4, 8.7, 7.7, 15.6, 18.2, 4.7, 8.8, 6.0, 2.3]
          }
        ]
      }
    }
  },
  mounted () {

  },
  components: {
    'basic-bar-line': BasicBarLine
  }
}
</script>

<style scoped>
h4 {
  text-align: left
}
</style>
