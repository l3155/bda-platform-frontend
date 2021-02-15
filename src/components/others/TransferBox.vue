<template>
  <el-transfer
    :titles="['Items', 'Selected']"
    filter-placeholder="Select items"
    @change="handleChange"
    v-model="yesData"
    :props="{key: 'id',label: 'name'}"
    :data="noData">
  </el-transfer>
</template>

<script>
export default {
  // data () {
  //   const generateData = _ => {
  //     const data = []
  //     const items = this.noData
  //     items.forEach((item, index) => {
  //       data.push({
  //         label: item,
  //         key: index
  //       })
  //     })
  //     return data
  //   }
  //   return {
  //     noData: generateData(),
  //     titles: ['Items', 'Selected'],
  //     yesData: []
  //   }
  // },
  data () {
    return {
      noData: [],
      yesData: []
    }
  },
  methods: {
    handleChange (value, direction) {
      if (direction === 'right') {
        this.yesData = value
        this.$emit('change', this.yesData)
      } else if (direction === 'left') {
        this.yesData = value
        this.$emit('change', this.yesData)
      }
    },
    getItems () {
      this.$http.get(
        '/get_test_items'
      ).then((res) => {
        res.data.forEach((item, index) => {
          this.noData.push({
            id: item,
            name: item
          })
        })
      })
    }
  },
  mounted () {
    this.getItems()
  }
  // props: [ 'items' ]
}
</script>
