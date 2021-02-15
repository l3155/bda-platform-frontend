<template>
<div>
  <el-row>
    <div class="search-box">
      <el-select v-model="selectedLots" multiple placeholder="Lot No, Max 3" :multiple-limit="3">
      <el-option
        v-for="lot in lots"
        :key="lot"
        :label="lot"
        :value="lot">
      </el-option>
    </el-select>
    <el-select v-model="item" placeholder="ET Test Item">
      <el-option
        v-for="item in items"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search" @click="getChartData">Search</el-button>
    </div>
  </el-row>
  <el-divider></el-divider>
  <el-col :span=8>
    <basic-dist-plot v-if="flag" :myData="data1"></basic-dist-plot>
  </el-col>
  <el-col :span=8>
    <basic-dist-plot v-if="flag" :myData="data2"></basic-dist-plot>
  </el-col>
  <el-col :span=8>
    <basic-dist-plot v-if="flag" :myData="data3"></basic-dist-plot>
  </el-col>
</div>
</template>

<script>
import BasicDistPlot from './basic_components/BasicDistPlot'
export default {
  name: 'rejectDistribution',
  data () {
    return {
      lots: ['lot1', 'lot2', 'lot3', 'lot4', 'lot5', 'lot6'],
      items: [],
      selectedLots: [].slice(-3),
      item: '',
      flag: false,
      data1: {},
      data2: {},
      data3: {}
    }
  },
  methods: {
    getChartData () {
      this.flag = false
      this.$http.get(
        'http://127.0.0.1:5000/get_et_comparison_lot?' +
        'lots=' + this.selectedLots.join(',') +
        '&item=' + this.item
      ).then((res) => {
        this.data1 = {
          chartName: 'Lot1 ' + this.item,
          chartID: 'dist1',
          xData: res.data.lot1.xData,
          mean: res.data.lot1.mean,
          median: res.data.lot1.median,
          skew: res.data.lot1.skew,
          std: res.data.lot1.std,
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
              data: res.data.lot1.yData
            },
            {
              type: 'line',
              color: '#127DEA',
              yAxisIndex: 1,
              smooth: true,
              data: res.data.lot1.yDist
            }
          ]
        }
        this.data2 = {
          chartName: 'Lot2 ' + this.item,
          chartID: 'dist2',
          xData: res.data.lot2.xData,
          mean: res.data.lot2.mean,
          median: res.data.lot2.median,
          skew: res.data.lot2.skew,
          std: res.data.lot2.std,
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
              color: '#096354',
              data: res.data.lot2.yData
            },
            {
              type: 'line',
              color: '#127DEA',
              yAxisIndex: 1,
              smooth: true,
              data: res.data.lot2.yDist
            }
          ]
        }
        this.data3 = {
          chartName: 'Lot3 ' + this.item,
          chartID: 'dist3',
          xData: res.data.lot3.xData,
          mean: res.data.lot3.mean,
          median: res.data.lot3.median,
          skew: res.data.lot3.skew,
          std: res.data.lot3.std,
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
              color: '#096354',
              data: res.data.lot3.yData
            },
            {
              type: 'line',
              color: '#127DEA',
              yAxisIndex: 1,
              smooth: true,
              data: res.data.lot3.yDist
            }
          ]
        }
        this.flag = true
      })
    },
    getItems () {
      this.$http.get(
        'http://127.0.0.1:5000/get_test_items'
      ).then((res) => {
        // console.log(res.data)
        this.items = res.data
      })
    }
  },
  mounted () {
    // this.getChartData()
    this.getItems()
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
.search-box {
  float: left
}
</style>
