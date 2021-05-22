<template>
    <div id="app">
        <common-plugins></common-plugins>
        <router-view></router-view>
    </div>
</template>

<script>

    import CommonPlugins from './components/CommonPlugins'
    import User from './models/User'

    const user = new User()
    export default {
        name: 'app',
        components: {CommonPlugins},

        data() {
            return {}
        },
        mounted() {
            // 每次刷新后更新用户信息、权限信息
            // cookie中只存放了token，用户信息、权限信息登录api会返回，主动刷新需重新获取
            if (user.isLogin()) {
                User.viewsUser({type: 2}, ({type, data}) => {
                    if (type === 'success') {
                        this.$store.commit('handleUserInfo', data.data)
                    } else {
                        User.logout()
                        this.$store.commit('logout')
                    }
                }, () => {
                    User.logout()
                    this.$store.commit('logout')
                })
            } else {
                if (this.$route.path !== '/site/login') {
                    this.$router.push('/site/login')
                }
                this.$store.commit('logout')
            }
        },
        created() {

        },
        methods: {},
        computed: {},
        watch: {}
    }

</script>

<style>
    html, body {
        margin: 0;
        height: 100%;
    }

    .yk-popper {
        overflow: hidden !important;
    }

    #app {
        height: 100%;
    }

    a {
        color: #409EFF;
        cursor: pointer;
        text-decoration: none;
    }

    .modal-button {
        text-align: center;
    }

    /*.el-popper[x-placement^=bottom] {*/
    /*    min-width: 300px;*/
    /*}*/

    .search-btn-container {
        text-align: right;
    }

    .search-btn-container button {
        margin: 0 2px !important;
    }

    .search-btn-container button:last-child {
        margin-right: 0 !important;
    }

    div.button button {
        margin: 0 2px !important;
    }

    div.button button:last-child {
        margin-right: 0 !important;
    }

    .filter-item-store .tree-select {
        top: 0 !important;
    }

    .date-filter-item {
        width: 100% !important;
    }

    @media (max-width: 1300px) {
        .nav_welcome_left {
            font-size: 12px;
        }

        .nav_welcome_right {
            font-size: 12px;
        }
    }

    @media (max-width: 1023px) {
        .position-div {
            margin-right: 20px;
        }
    }

    .wt-hide {
        display: none !important;
    }

    #app .empty-text {
        text-align: center;
        color: #999;
    }

    .el-tree-node__label {
        font-size: 12px !important;
    }

    .h-div {
        height: 100%;
    }

    .el-dialog__header {

        padding: 12px 15px !important;
        background-color: #365aff;
    }

    .el-dialog__title {
        color: #ffffff !important;
        font-size: 16px !important;
    }

    .el-dialog__close {
        color: #ffffff !important;
    }

    .el-dialog__headerbtn {
        top: 14px !important;
    }

    .yk-menu .el-submenu__title {
        background-color: transparent !important;
    }

    .yk-menu .el-submenu__title i {
        color: #fff;
    }

    .el-menu--horizontal {
        background-color: #365bff;
    }

    .el-menu--popup-bottom-start {
        margin-top: 0 !important;
    }

    .el-menu--horizontal .el-menu-item,
    .el-menu--horizontal .el-submenu__title {
        background: transparent !important;
    }

    .el-dialog__wrapper {
        background: rgba(0, 0, 0, 0.3);
    }

    .router-link-active {
        text-decoration: none !important;
        color: #409eff !important;
    }

    span[title='清除本次测距'] {
        position: absolute;
        background: url("https://yikong-v2.oss-cn-shanghai.aliyuncs.com/public/closebtn.png") no-repeat center center !important;
        -webkit-background-size: 12px 12px !important;
        background-size: 12px 12px !important;
        z-index: 999;
    }

    .BMap_noprint {
        z-index: 999999999 !important;
    }

    .BMap_scaleCtrl.BMap_noprint.anchorBR {
        display: none;
    }

    .el-dialog__body {
        padding: 15px !important;
    }

    .row .el-col {
        padding: 0 2px;
    }

    .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }

    .yk-car-driver-status-bg {
        -webkit-background-size: cover !important;
        background-size: cover !important;
    }

    .nangao .el-select-dropdown__wrap, .nangao .el-scrollbar {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
    }

    .nangaoa .el-select .el-input {
        width: 80px !important;
    }

    .rule-row .el-select > .el-input {
        min-width: 200px !important;
    }

    .rule-row .el-input {
        min-width: 100px !important;
    }

    .my-autocomplete .el-autocomplete-suggestion__wrap .el-scrollbar__wrap {
        margin-bottom: 0 !important;
    }

    .table-row-yk .table-search {
        height: 0 !important;
    }

    .table-row-yk .table-box {
        height: calc(100% - 65px) !important;
    }

    .table-row-yk .table-operation {
        height: 0 !important;
    }

    .svg-hover {
        transform: translateY(2px);
    }

    .svg-hover1 {
        transform: translateY(2px);
    }

    .show-svg {
        display: none !important;
    }

    .el-tree-node__label:hover .show-svg {
        display: inline-block !important;
    }

    .onknow-attr {
        color: rgba(0, 0, 0, .3);
    }

    /*去除百度logo的点击事件*/
    .BMap_cpyCtrl {
        display: none;
    }

    .anchorBL {
        display: none;
    }

    html * {
        font-family: "Microsoft YaHei", \5FAE\8F6F\96C5\9ED1, 微软雅黑 !important;
    }

    .el-image-viewer__close {
        color: #ffffff;
    }

    .no-data {
        color: rgba(0, 0, 0, .3);
    }

    .mileage .list-k-row {
        justify-content: center !important;
    }

    .el-menu--horizontal > .el-submenu .el-submenu__title {
        border: none !important;
    }

    .steps-panel .el-step__description.is-success {
        padding: 0 !important;
    }

    .el-popover.el-popper {
        max-height: 300px;
    }
</style>
