<template>
<div>
  <!-- <el-row>
    <basic-dist-plot :myData="dataByLot" v-if='flag'></basic-dist-plot>
  </el-row> -->
  <el-row>
    <basic-yield-plot :myData="dataByDate" v-if="flag"></basic-yield-plot>
    <el-divider v-if="flag"></el-divider>
    <h4 v-if="flag">Here we explore the date distribution of target modules and do the comparison between defect rate and daily yield</h4>
    <h4 v-if="flag">DefectRate: qty(modules we uploaded) / qty(all modules of date) * 1000000 </h4>
    <h4 v-if="flag">DailyYield: qty(pass modules of date) / qty(all modules of date) * 100% </h4>
  </el-row>
</div>
</template>

<script>
import BasicYieldPlot from './basic_components/BasicYieldPlot.vue'
export default {
  name: 'rejectDistribution',
  data () {
    return {
      flag: false,
      dataByDate: {}
    }
  },
  methods: {
    getChartData () {
      this.flag = false
      var taskId = this.$route.query.id
      this.$http.get(
        '/get_defect_distribution?' +
        'id=' + taskId
      ).then((res) => {
        this.dataByDate = {
          chartName: 'Defect Distribution By Date',
          chartID: 'ddbd',
          xData: res.data.xData,
          yAxis: [
            {
              name: 'DefectRate(PPM)',
              type: 'value',
              // min: 0,
              // max: res.data.dataAll.yMax,
              // interval: 50,
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              name: 'DailyYield',
              type: 'value',
              min: 0.8,
              max: 1,
              interval: 0.04,
              axisLabel: {
                formatter: function (param) {
                  return param * 100 + '%'
                }
              },
              splitLine: {
                show: false
              }
            }
          ],
          seriesData: [
            {
              name: 'PPM',
              type: 'bar',
              color: '#192F60',
              data: res.data.yLeft
            },
            {
              name: 'Yield',
              type: 'line',
              color: '#127DEA',
              yAxisIndex: 1,
              smooth: true,
              connectNulls: false,
              symbol: 'circle',
              symbolSize: 20,
              data: res.data.yRight
            }
          ]
        }
        this.flag = true
      })
    }
  },
  mounted () {
    this.getChartData()
  },
  components: {
    'basic-yield-plot': BasicYieldPlot
  }
}
</script>

<style scoped>
h4 {
  text-align: left
}
</style>
