<template>
    <div class="h-div yk-menu">
        <span class="nav_welcome_left">
        欢迎使用天易保·易控车辆智能风控分析平台！
        </span>

    </div>
</template>

<script>
    export default {
        name: 'YkMenu',
        data() {
            return {
                state: ''
            }
        },

        methods: {

            activeIndex() {

            },
            handleSelect() {

            },

            querySearchAsync() {

            }
        }
    }
</script>

<style scoped>
    .nav_welcome_left {
        line-height: 40px;
        color: rgba(255, 255, 255, 0.631372549019608);
    }

    .menu_right {
        /*line-height: 60px;*/
        float: right;
        height: 40px;
    }

    .nav_welcome_right {
        color: #fff;
        float: left;
    }

    .el-icon-location-outline, .el-icon-s-comment {
        margin-left: 10px;
        font-size: 22px;
        color: #fff;
    }

    .item {
        margin-right: 18px;
    }

    .avatar-img {
        float: right;
        width: 30px;
        height: 30px;
        padding: 15px 0;
    }

    .el-menu-demo {
        background-color: transparent;
        border-bottom-style: none;
    }

    .nav_welcome_right {
        line-height: 60px;
    }

    .username-title {
    }

    .username-text {
        color: #fff;
    }

    .el-menu.el-menu--horizontal {
        border: none;
        background-color: transparent;
    }

    .el-submenu__title {
        overflow: hidden;
    }

    .icon-message {
        position: relative;
        top: 4px;
    }

    .icon-position {
        position: relative;
        top: 4px;
    }
    .search-item {
        margin-left: 5px;
        margin-right: -5px;
        width: 180px;
    }
    .nav_welcome_right,
    .search-item,
    .icon-position,
    .icon-message {
        float: left;
    }
    .position-div {
        padding-top: 16px;
        float: left;
    }
</style>
