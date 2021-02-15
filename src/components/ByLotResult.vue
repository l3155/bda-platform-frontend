<template>
<div>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="LotComparison" name="first"></el-tab-pane>
    <!-- <el-tab-pane label="RejectDistribution" name="second"></el-tab-pane> -->
    <el-tab-pane label="TestValueDistribution" name="second"></el-tab-pane>
  </el-tabs>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'
      // id: ''
    }
  },
  methods: {
    handleClick (tab) {
      var id = this.$route.query.id
      if (tab.name === 'first') {
        this.$router.push({
          path: '/platformET/byLotResult/lotComparison',
          query: {
            id: id
          }
        }).catch(err => { console.log(err) })
      } else if (tab.name === 'second') {
        this.$router.push({
          path: '/platformET/byLotResult/testValueDistribution',
          query: {
            id: id
          }
        }).catch(err => { console.log(err) })
      } else {
        this.$router.push({
          path: '',
          query: {
            id: id
          }
        }).catch(err => { console.log(err) })
      }
    }
  },
  mounted () {
    var currentTab = this.$router.history.current.path.split('/')[3]
    if (currentTab === 'lotComparison') {
      this.activeName = 'first'
    } else {
      this.activeName = 'second'
    }
  }
}
</script>

<style scoped>

</style>
