<template>
  <div class="langing_box">
    <div class="title">窗口名称：{{parameter}}</div>
    <div>当前共有窗口：{{$Win.windowUtil._windowList.length}}</div>
    <img src="~@/assets/256x256.png" @click="$Win.closeWin({data:'返回的数据'+parameter})">
    <div>点击图片可关闭当前窗口</div>
  </div>
</template>

<script>
  export default {
    name: 'landing',
    data () {
      return {
        parameter: ''
      }
    },
    mounted () {
      this.parameter = this.$Win.parameter
    }
  }
</script>

<style scoped lang="scss">
  .langing_box {
    text-align: center;
    background-color: white;
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    border: 1px solid #ccc;
    .title {
      margin-top: 40px;
    }
    img {
      height: 120px;
    }
  }
</style>
