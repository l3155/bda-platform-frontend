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
      let myChart = this.$echarts.init(document.getElementById(this.chartID))
      var pieName = myData.pieName
      var legend = myData.legend
      var data = myData.data

      // 绘制图表
      var option = {
        title: {
          text: pieName,
          left: 'left',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: 'center',
          left: 'auto',
          data: legend
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectdMode: 'single',
            data: data,
            color: [ '#154360', '#1A5276', '#1F618D', '#2471A3', '#2980B9', '#5499C7', '#7FB3D5' ],
            // color: {
            //   type: 'linear',
            //   x: 0,
            //   y: 0,
            //   x2: 0,
            //   y2: 1,
            //   colorStops: [{
            //     offset: 0, color: 'green' // 0% 处的颜色
            //   }, {
            //     offset: 1, color: 'blue' // 100% 处的颜色
            //   }],
            //   global: false // 缺省为 false
            // },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
  height: 300px
}
</style>
