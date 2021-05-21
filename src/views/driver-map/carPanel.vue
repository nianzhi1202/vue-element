<template>
  <el-button-group class="car-panel">
    <el-button type="primary" size="small" @click="click('car_all')">全部({{list.car_all}})</el-button>
    <el-button type="primary" size="small" @click="click('car_prod')">80分上({{list.car_prod}})</el-button>
    <el-button type="primary" size="small" @click="click('car_next')">80分下({{list.car_next}})</el-button>
  </el-button-group>
</template>

<script>
    export default {
        name: 'carPanel',
        props: ['list', 'click']
    }
</script>

<style scoped>

  .car-panel {
    width: 100%;
    padding: 5px 0;
  }

  .car-panel button {
    width: 33.3%;
  }
</style>
