<template>
  <div :id="chartID" :style="{width: '100%', height: '600px'}"></div>
</template>

<script>
export default {
  name: 'BasicPlot',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      chartID: this.myData.chartID
    }
  },
  mounted () {
    this.drawLine()
  },
  props: [ 'myData' ],
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      var myData = this.myData
      let myChart = this.$echarts.init(document.getElementById(this.chartID))
      var category = myData.category
      var lineData = myData.lineData
      var barData = myData.barData

      // 绘制图表
      myChart.setOption({
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['line', 'bar'],
          textStyle: {
            color: '#ccc'
          }
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [{
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData
        }, {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
          data: barData
        }, {
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          z: -12,
          data: lineData
        }, {
          name: 'dotted',
          type: 'pictorialBar',
          symbol: 'rect',
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData
        }]
      })
    }
  }
}
</script>
