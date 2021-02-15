<template>
<el-container>
  <el-header>
    <el-menu :default-active="defaultActive" class="el-menu" mode="horizontal"
      background-color="#192f60"
      text-color="#FFFFFF"
      active-text-color="#409EFF"
      @select="handleSelect">
      <el-menu-item index="0"><i class="el-icon-s-grid"></i><span>Home</span><i class="el-icon-caret-left"></i></el-menu-item>
      <el-menu-item index="1"><i class="el-icon-menu"></i><span>BySerialNo</span></el-menu-item>
      <el-menu-item index="2" :disabled="true"><i class="el-icon-menu"></i><span>ByLotNo</span></el-menu-item>
    </el-menu>
  </el-header>
  <el-main>
    <router-view/>
  </el-main>
</el-container>
</template>

<script>
export default {
  name: 'PlatformET',
  data () {
    return {
      defaultActive: '1',
      activePath: '',
      loading: false
    }
  },
  mounted () {
    var currentPath = this.$router.history.current.path.split('/')[2]
    if (currentPath !== 'bySerial' & currentPath !== 'bySerialResult') {
      this.defaultActive = '2'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (keyPath[0] === '1') {
        this.activePath = keyPath[0]
        this.$router.push('/platformET/bySerial').catch(err => { console.log(err) })
      } else if (keyPath[0] === '2') {
        this.activePath = keyPath[0]
        this.$router.push('/platformET/byLot').catch(err => { console.log(err) })
      } else {
        this.activePath = keyPath[0]
        this.$router.push('/').catch(err => { console.log(err) })
      }
    }
  }
}
</script>

<style scoped>
/* .my_header {
  font-size: 16px
} */
.el-main {
  padding-top: 0px;
  padding-bottom: 0px
}
</style>
