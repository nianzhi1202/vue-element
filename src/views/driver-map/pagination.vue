<template>

    <el-pagination
            :page-size="20"
            class="pagination"
            :pager-count="5"
            layout="pager"
            :hide-on-single-page="true"
            :total="data.total"
            :current-page="data.page"
            @current-change="currentChange"
    >
    </el-pagination>
</template>

<script>
    export default {
        name: 'pagination',
        props: ['data', 'currentChange']
    }
</script>

<style scoped>
    .pagination {
        position: absolute;
        bottom: 0;
        z-index: 100;
        padding-bottom: 20px;
    }
</style>
