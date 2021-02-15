<template>
<div>
  <el-row>
    <div class="search-box">
      <el-select v-model="lot" placeholder="Lot No">
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
    <el-button type="primary" icon="el-icon-search">Search</el-button>
    </div>
  </el-row>
  <el-divider></el-divider>
  <el-row>
    <el-col :span='12'>
      <basic-dist-plot :myData="dataAll"></basic-dist-plot>
    </el-col>
    <el-col :span='12'>
      <basic-dist-plot :myData="dataRisk"></basic-dist-plot>
    </el-col>
  </el-row>
  <el-divider></el-divider>
  <el-row>
    <el-col :span='12'>
        <el-tag type="info">Median：11.99</el-tag>
        <el-tag type="info">Mean：12.99</el-tag>
        <el-tag type="info">Skew：12.99</el-tag>
        <el-tag type="info">Std：2</el-tag>
    </el-col>
    <el-col :span='12'>
        <el-tag type="info">Median: 11.99</el-tag>
        <el-tag type="info">Mean: 11.88</el-tag>
        <el-tag type="info">Skew：12.99</el-tag>
        <el-tag type="info">Std: 1</el-tag>
    </el-col>
  </el-row>
</div>
</template>

<script>
import BasicDistPlot from './basic_components/BasicDistPlot'
export default {
  name: 'rejectDistribution',
  data () {
    return {
      lots: ['lot1', 'lot2', 'lot3'],
      items: ['item1', 'item2', 'item3'],
      lot: '',
      item: '',
      dataAll: {
        chartName: 'Parent Lot Distribution',
        chartID: 'pld',
        xData: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        yAxis: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        seriesData: [
          {
            type: 'bar',
            color: '#ea5506',
            // data: res.data.dataRisk.yData
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            type: 'line',
            color: '#409EFF',
            smooth: true,
            // data: res.data.dataRisk.yData
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          }
        ]
      },
      dataRisk: {
        chartName: 'Risk Modules Distribution',
        chartID: 'rmd',
        xData: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        yAxis: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        seriesData: [
          {
            type: 'bar',
            color: '#ea5506',
            // data: res.data.dataRisk.yData
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            type: 'line',
            color: '#409EFF',
            smooth: true,
            // data: res.data.dataRisk.yData
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          }
        ]
      }
    }
  },
  mounted () {
    this.$http.get(
      'http://127.0.0.1:5000/get_et_comparison_risk'
    ).then((res) => {
      this.dataAll.seriesData = [
        {
          type: 'bar',
          color: '#192f60',
          // data: res.data.dataAll.yData
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          type: 'line',
          color: '#127DEA',
          smooth: true,
          // data: res.data.dataAll.yData
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }
      ]
      this.dataRisk.seriesData = [
        {
          type: 'bar',
          color: '#ea5506',
          // data: res.data.dataRisk.yData
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          type: 'line',
          color: '#409EFF',
          smooth: true,
          // data: res.data.dataRisk.yData
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }
      ]
      this.dataAll.yAxis = [
        {
          type: 'value',
          min: 0,
          // max: res.data.dataAll.yMax,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ]
      this.dataRisk.yAxis = [
        {
          type: 'value',
          min: 0,
          // max: res.data.dataRisk.yMax,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ]
      // this.dataAll.xData = res.data.dataAll.xData
      // this.dataRisk.xData = res.data.dataRisk.xData
      this.dataAll.xData = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      this.dataRisk.xData = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    })
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
