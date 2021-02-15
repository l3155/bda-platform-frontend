<template>
  <el-container>
    <el-header style="text-align: center">
      <el-row>
        <el-col :span="20" style="font-size: 20px">
          <h1 style="margin-top: 0px; margin-bottom: 0px;"><span>Mflex Data Analysis Platform</span></h1>
        </el-col>
        <el-col :span="4" style="text-align: right; font-size: 12px">
          <span>用户</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>历史记录</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
       <div>
        <el-row>
          <el-col :span="5">
            <h1></h1>
          </el-col>
          <el-col :span="7">
            <div class="block-content-left">
              <h1>Analysis Platform for ET</h1>
              <p>根据定制维度，多方向分析ET测试数据，为品质管理和决策提供依据</p>
              <p>--平台服务即本原型用于配置分析条件，展示分析结果</p>
              <p>--计算服务主要是独立的多进程分析程序，用于计算任务</p>
              <el-row style='margin-top: 100px'>
                <el-button type="primary" @click="gotoet">开始分析</el-button>
              </el-row>
            </div>
          </el-col>
          <el-col :span="7">
            <el-image :src="src_et" :fit="fit"></el-image>
          </el-col>
          <el-col :span="5">
            <h1></h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <h1></h1>
          </el-col>
          <el-col :span="7">
            <el-image :src="src_pw" :fit="fit"></el-image>
            <!-- <EchartsTest/> -->
          </el-col>
          <el-col :span="7">
            <div class="block-content-right">
              <h1>Analysis Platform for Power</h1>
              <p>分析能源消耗数据</p>
              <el-row style='margin-top: 100px'>
                <el-button type="primary">开始分析</el-button>
                <el-link href="http://172.16.93.92:8081/#/editOtd" target="_blank">FA填报平台</el-link>
              </el-row>
            </div>
          </el-col>
          <el-col :span="5">
            <h1></h1>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      fit: 'fill',
      src_et: require('../assets/img/et_platform.png'),
      src_pw: require('../assets/img/power_platform.png')
    }
  },
  methods: {
    gotoet () {
      this.$router.push('/platformET/bySerial')
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #192f60;
  color: #FFFFFF;
  line-height: 60px;
  margin-left: 20px;
  margin-right: 20px
}
.el-main {
  position: relative;
}
.el-aside {
  color: #333;
}
.block-content-left {
  text-align: left;
  font-size: 16px
}
.block-content-right {
  text-align: right;
  font-size: 16px
}
p {
  font-size: 14px;
}
</style>
