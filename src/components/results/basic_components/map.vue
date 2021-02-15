<template>
<div :id="chartID" class="chartBorder"></div>
</template>

<script>
export default {
  name: 'BasicPie',
  data () {
    return {
      chartID: 'world'
    }
  },
  mounted () {
    this.plot()
  },
  // props: [ 'myData' ], // myData  {chartID:xx, legend:[], data[{},{}]}
  methods: {
    plot () {
      // 基于准备好的dom，初始化echarts实例
      // var myData = this.myData
      // var chartID = myData.chartID
      let myChart = this.$echarts.init(document.getElementById(this.chartID))

      // 绘制图表
      var option = {
        backgroundColor: '#000',
        globe: {
          baseTexture: '3d_earth/world.topo.bathy.200401.jpg',
          heightTexture: '3d_earth/world.topo.bathy.200401.jpg',
          displacementScale: 0.04,
          shading: 'realistic',
          realisticMaterial: {
            roughness: 0.9
          },
          postEffect: {
            enable: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            ambientCubemap: {
              texture: 'd3d_earth/asset/pisa.hdr',
              diffuseIntensity: 0.2
            }
          }
        }
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
