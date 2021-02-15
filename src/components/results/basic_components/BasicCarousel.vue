<template>
<el-carousel trigger="click"
  type="card"
  height="250px"
  :autoplay=false
  :loop=false
  :initial-index="0"
  ref='carousel'>
  <el-carousel-item v-for="(item,index) in activities" :key="index" :name='item.lot'>
    <h4 class="small">{{ item.lot }}</h4>
    <p>{{ item.details }}</p>
  </el-carousel-item>
</el-carousel>
</template>

<script>
export default {
  name: 'BasicCarousel',
  data () {
    return {
      activities: this.detailByLot
    }
  },
  props: [ 'detailByLot', 'labelName' ],
  watch: {
    labelName (val) {
      this.$refs.carousel.setActiveItem(this.labelName)
    }
  }
}
</script>

<style scoped>

</style>
