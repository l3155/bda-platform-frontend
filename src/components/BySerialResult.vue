<template>
<div>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="RejectTrace" name="first"></el-tab-pane>
    <el-tab-pane label="RejectDateDistribution" name="second"></el-tab-pane>
    <el-tab-pane label="RejectPSTClustering" name="third"></el-tab-pane>
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
          path: '/platformET/bySerialResult/rejectTrace',
          query: {
            id: id
          }
        }).catch(err => { console.log(err) })
      } else if (tab.name === 'second') {
        this.$router.push({
          path: '/platformET/bySerialResult/rejectDistribution',
          query: {
            id: id
          }
        }).catch(err => { console.log(err) })
      } else {
        this.$router.push({
          path: '/platformET/bySerialResult/testValueDistribution',
          query: {
            id: id
          }
        }).catch(err => { console.log(err) })
      }
    }
  },
  mounted () {
    var currentTab = this.$router.history.current.path.split('/')[3]
    if (currentTab === 'rejectTrace') {
      this.activeName = 'first'
    } else if (currentTab === 'rejectDistribution') {
      this.activeName = 'second'
    } else {
      this.activeName = 'third'
    }
  }
}
</script>

<style scoped>

</style>
