<template>
<div v-loading="loading">
  <el-row>
    <div class="search-box">
      <el-select v-model="date" placeholder="Date" @change="changeItems" visible-change="false" filterable>
      <el-option
        v-for="date in dates"
        :key="date"
        :label="date"
        :value="date">
      </el-option>
    </el-select>
    <el-select v-model="item" placeholder="ET Test Item" filterable>
      <el-option
        v-for="item in items"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search" @click="getChartData" :disabled="date !== '' && item !== '' ? false : true">Search</el-button>
    </div>
  </el-row>
  <el-divider></el-divider>
  <el-row>
    <el-col :span='12'>
      <basic-dist-plot v-if="flag" :myData="dataAll"></basic-dist-plot>
    </el-col>
    <el-col :span='12'>
      <basic-dist-plot v-if="flag" :myData="dataRisk"></basic-dist-plot>
    </el-col>
    <h4 v-if="!hasDefects">Among these test items, modules we uploaded have the same distribution as mass products, we can not find any abnormalities</h4>
  </el-row>
  <el-divider></el-divider>
  <h4 v-if="flag">Refer to detail data</h4>
  <a v-if="flag" class='download' :href='downloadhttp' download=""  title="下载">Download Risk Barcodes</a>
</div>
</template>

<script>
import BasicDistPlot from './basic_components/BasicDistPlot'
export default {
  name: 'rejectDistribution',
  data () {
    return {
      dateItems: {},
      dates: [],
      items: [],
      date: '',
      item: '',
      flag: false,
      dataAll: {},
      dataRisk: {},
      loading: true,
      hasDefects: true,
      downloadhttp: '/downloadfile?id=' + this.$route.query.id
    }
  },
  methods: {
    getChartData () {
      this.flag = false
      this.loading = true
      var taskId = this.$route.query.id
      this.$http.get(
        '/get_et_comparison_risk?' + 'date=' + this.date + '&item=' + this.item + '&id=' + taskId
      ).then((res) => {
        if (res.data.code === 200) {
          this.dataAll = {
            chartName: 'Related Date Distribution',
            chartID: 'pld',
            xData: res.data.data.dataAll.xData,
            mean: res.data.data.dataAll.mean,
            median: res.data.data.dataAll.median,
            skew: res.data.data.dataAll.skew,
            std: res.data.data.dataAll.std,
            yAxis: [
              {
                type: 'value',
                // min: 0,
                // max: res.data.dataAll.yMax,
                // interval: 50,
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                // min: 0,
                // max: res.data.dataAll.yDistMax,
                // interval: 50,
                axisLabel: {
                  formatter: '{value}'
                },
                splitLine: {
                  show: false
                }
              }
            ],
            seriesData: [
              {
                type: 'bar',
                color: '#096354',
                barWidth: '100%',
                data: res.data.data.dataAll.yData
              },
              {
                type: 'line',
                color: '#127DEA',
                yAxisIndex: 1,
                smooth: true,
                data: res.data.data.dataAll.yDist
              }
            ]
          }
          this.dataRisk = {
            chartName: 'Risk Modules Distribution',
            chartID: 'rmd',
            xData: res.data.data.dataRisk.xData,
            mean: res.data.data.dataRisk.mean,
            median: res.data.data.dataRisk.median,
            skew: res.data.data.dataRisk.skew,
            std: res.data.data.dataRisk.std,
            yAxis: [
              {
                type: 'value',
                // min: 0,
                // max: res.data.dataRisk.yMax,
                // interval: 50,
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                // min: 0,
                // max: res.data.dataRisk.yDistMax,
                // interval: 50,
                axisLabel: {
                  formatter: '{value}'
                },
                splitLine: {
                  show: false
                }
              }
            ],
            seriesData: [
              {
                type: 'bar',
                color: '#F56C6C',
                barWidth: '100%',
                data: res.data.data.dataRisk.yData
              },
              {
                type: 'line',
                color: '#F56C6C',
                yAxisIndex: 1,
                smooth: true,
                data: res.data.data.dataRisk.yDist
              }
            ]
          }
        }
        this.flag = true
        this.loading = false
      }).catch((res) => {
        this.loading = false
      })
    },
    getDateItems () {
      var taskId = this.$route.query.id
      this.$http.get(
        '/get_test_date_items?id=' + taskId
      ).then((res) => {
        if (res.data.code === 200) {
          this.dates = Object.keys(res.data.data)
          this.dateItems = res.data.data
          this.loading = false
          this.hasDefects = true
        } else {
          this.loading = false
          this.hasDefects = false
        }
      }).catch((res) => {
        console.log(res)
        this.loading = false
        this.hasDefects = false
      })
    },
    changeItems () {
      this.item = ''
      this.items = this.dateItems[this.date]
    },
    downloadRiskData () {
      console.log(this.$route.query.id)
    }
  },
  mounted () {
    this.getDateItems()
  },
  components: {
    'basic-dist-plot': BasicDistPlot
  }
}
</script>

<style scoped>
h4 {
  text-align: left
}
a {
  float: left
}
.search-box {
  float: left
}
</style>
