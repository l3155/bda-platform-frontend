<template>
<div>
  <div :id="chartData.chartID" class="chartBorder"></div>
  <el-tag type="info">Median：{{chartData.median}}</el-tag>
  <el-tag type="info">Mean：{{chartData.mean}}</el-tag>
  <el-tag type="info">Skew：{{chartData.skew}}</el-tag>
  <el-tag type="info">Std：{{chartData.std}}</el-tag>
</div>
</template>

<script>
export default {
  name: 'BasicPie',
  data () {
    return {
      chartData: this.myData
    }
  },
  mounted () {
    this.plot()
  },
  props: [ 'myData' ], // myData  {chartID:xx, legend:[], data[{},{}]}
  methods: {
    plot () {
      // 基于准备好的dom，初始化echarts实例
      var chartData = this.chartData
      var chartName = chartData.chartName
      var chartID = chartData.chartID
      let myChart = this.$echarts.init(document.getElementById(chartID))
      var seriesData = chartData.seriesData
      // var legend = [i.name for (i of myData.seriesData)]
      var legend = chartData.seriesData.map(function (i) { return i.name })
      var xData = chartData.xData

      // 绘制图表
      var option = {
        title: {
          text: chartName,
          left: 'left',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          asixPointer: {
            type: 'cross',
            crossType: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: false, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        grid: {
          width: 'auto',
          left: '50px',
          right: '50px'
        },
        legend: {
          data: legend
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            asixPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: chartData.yAxis,
        series: seriesData
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.chartBorder {
  border: 1px #EBEEF5;
  border-left-style: dashed;
  width: 100%;
  height: 350px
}
</style>
