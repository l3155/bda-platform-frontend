<template>
<div>
  <el-input v-model="input"
   placeholder="请输入Lot No"
   @change="addLot"></el-input>
  <el-tag
    v-for="(tag, index) in inputList"
    :key="tag"
    @close="removeLot(index)"
    closable>
    {{tag}}
  </el-tag>
</div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      inputList: []
    }
  },
  methods: {
    addLot (msg) {
      this.inputList.push(msg)
      this.input = ''
    },
    removeLot (index) {
      this.inputList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 100px;
  text-align: left;
  font-size: 12px
}
.el-tag {
  margin: 5px
}
</style>
