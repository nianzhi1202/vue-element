<template>
    <el-button-group class="status-panel">
        <el-button type="primary" size="small" @click="click('all_count')">全部 {{list.all_count}}</el-button>
        <el-button type="primary" size="small" @click="click('online_count')">在线 {{list.online_count}}</el-button>
        <el-button type="primary" size="small" @click="click('offline_count')">离线 {{list.offline_count}}</el-button>
    </el-button-group>
</template>

<script>
    export default {
        name: 'statusPanel',
        props: ['list', 'click']
    }
</script>

<style scoped>

    .status-panel {
        width: 100%;
        padding: 5px 0;
    }

    .status-panel button {
        width: 33.3%;
    }

</style>
