<template>
    <div class="empty-text">
        <div class="filter-item">
            <img class="img" src="../../../static/img/404.png" alt="页面丢失">
        </div>
        <div style="text-align: left">
            <h3>404</h3>
            <br>
            <span>抱歉，您访问的页面不存在</span>
            <br>
            <el-button size="small" type="primary" @click="backHome">返回首页</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'notFound',
        methods: {
            backHome() {
                this.$router.push('/cockpit/index')
            }
        }
    }
</script>

<style scoped>
    .empty-text {
        text-align: center;
        min-height: 100%;
        height: auto;
        width: 100%;
        position:relative;
        display:flex;
        justify-content: center;
        align-items: center;
        /*padding-top: 200px;*/
    }
    .filter-item {
        float: left;
        margin-right: 121px;
    }
    .img {
        width: 443px;
        height: 342px;
    }
    h3 {
        color: #434E59;
        font-size: 50px;
        text-align: left;
        margin: 0px;
    }
    span {
        font-size: 20px;
    }
    button {
        margin-top: 20px;
    }
</style>
