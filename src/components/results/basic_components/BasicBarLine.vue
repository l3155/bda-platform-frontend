<template>
<div :id="chartID" class="chartBorder"></div>
</template>

<script>
export default {
  name: 'BasicPie',
  data () {
    return {
      chartID: this.myData.chartID
    }
  },
  mounted () {
    this.plot()
  },
  props: [ 'myData' ], // myData  {chartID:xx, legend:[], data[{},{}]}
  methods: {
    plot () {
      // 基于准备好的dom，初始化echarts实例
      var myData = this.myData
      var chartName = myData.chartName
      var chartID = myData.chartID
      let myChart = this.$echarts.init(document.getElementById(chartID))
      var seriesData = myData.seriesData
      // var legend = [i.name for (i of myData.seriesData)]
      var legend = myData.seriesData.map(function (i) { return i.name })
      var xData = myData.xData
      var yAxis = myData.yAxis
      var that = this

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
            dataView: {show: true, readOnly: false},
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
          // orient: 'vertical',
          // bottom: 'center',
          // left: 'auto',
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
        yAxis: yAxis,
        series: seriesData
      }
      myChart.setOption(option)
      myChart.on('click', function (params) {
        that.$emit('changeCurrentLot', params.name)
      })
    }
  }
}
</script>

<style scoped>
.chartBorder {
  border: 1px #EBEEF5;
  border-left-style: dashed;
  width: 100%;
  height: 300px
}
</style>
