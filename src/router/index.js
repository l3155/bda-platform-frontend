import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/pages/Main'
import PlatformET from '@/pages/PlatformET'
import BySerialNo from '@/components/BySerialNo'
import ByLotNo from '@/components/ByLotNo'
import BySerialResult from '@/components/BySerialResult'
import ByLotResult from '@/components/ByLotResult'
import RejectTrace from '@/components/results/RejectTrace'
import RejectDistribution from '@/components/results/RejectDistribution'
import TestValueDistribution from '@/components/results/TestValueDistribution'
import LotETDistribution from '@/components/results/LotETDistribution'
import LotComparison from '@/components/results/LotComparison'
// import Map from '@/components/results/basic_components/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    // {
    //   path: '/map',
    //   name: 'map',
    //   component: Map
    // },
    {
      path: '/platformET',
      name: 'PlatformET',
      component: PlatformET,
      children: [
        { path: 'bySerial', component: BySerialNo },
        { path: 'byLot', component: ByLotNo },
        {
          path: 'bySerialResult',
          component: BySerialResult,
          children: [
            {path: 'rejectTrace', component: RejectTrace},
            {path: 'rejectDistribution', component: RejectDistribution},
            {path: 'testValueDistribution', component: TestValueDistribution}
          ]
        },
        {
          path: 'byLotResult',
          component: ByLotResult,
          children: [
            {path: 'lotComparison', component: LotComparison},
            {path: 'testValueDistribution', component: LotETDistribution}
          ]
        }
      ]
    }
  ]
})
