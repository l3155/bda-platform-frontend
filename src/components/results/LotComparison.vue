<template>
<div>
  <el-row>
    <basic-bar-line :myData="dataByLot" @changeCurrentLot="changeCurrentLot"></basic-bar-line>
  </el-row>
  <el-divider></el-divider>
  <el-row>
    <basic-carousel :detailByLot="detailByLot" :labelName="lotLabel"></basic-carousel>
  </el-row>
</div>
</template>

<script>
import BasicBarLine from './basic_components/BasicBarLine'
import BasicCarousel from './basic_components/BasicCarousel'
export default {
  name: 'BasicTrace',
  data () {
    return {
      lotLabel: '',
      dataByLot: {
        chartName: 'Yield Trend By Lot',
        chartID: 'ytbl',
        xData: ['LOT1', 'LOT2', 'LOT3', 'LOT4', 'LOT5', 'LOT6'],
        yAxis: [
          {
            type: 'value',
            name: 'Loss(PPM)',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'Yield',
            min: 0,
            max: 1,
            interval: 0.2,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        seriesData: [
          {
            name: 'PPM',
            type: 'bar',
            color: '#127DEA',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7]
          },
          {
            name: 'Yield',
            type: 'line',
            color: '#096354',
            yAxisIndex: 1,
            smooth: true,
            data: [0.9, 0.9, 0.9, 0.4, 0.7, 0.7]
          }
        ]
      },
      detailByLot: [{
        lot: 'LOT1',
        details: '2018-04-15'
      }, {
        lot: 'LOT2',
        details: '2018-04-15'
      }, {
        lot: 'LOT3',
        details: '2018-04-15'
      }, {
        lot: 'LOT4',
        details: '2018-04-15'
      }, {
        lot: 'LOT5',
        details: '2018-04-15'
      }, {
        lot: 'LOT6',
        details: '2018-04-15'
      }]
    }
  },
  methods: {
    changeCurrentLot (msg) {
      this.lotLabel = msg
    }
  },
  components: {
    'basic-bar-line': BasicBarLine,
    'basic-carousel': BasicCarousel
  }
}
</script>
