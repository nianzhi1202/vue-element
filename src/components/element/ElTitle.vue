<template>
    <div class="title" v-if="parentTitle != ''">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item
                    v-for="(item,index) of parentTitle"
                    :to="{path:index.url}"
                    :key="index"
            >{{item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: 'ElTitle',
        components: {},
        computed: {
            parentTitle() {
                return this.$route.meta.breadcrumb || []
            }
        }
    }
</script>

<style scoped>
    .title{
        background-color: #fff;
        border-bottom:1px solid #E6E6E6;
        height: 40px;
        padding: 13px;
        box-sizing: border-box;
        line-height: 40px;
        /*width: 100%;*/
    }
</style>
