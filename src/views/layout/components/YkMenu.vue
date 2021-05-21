<template>
    <div class="h-div yk-menu">
        <span class="nav_welcome_left" v-show="show">
<!--        欢迎使用天易保·易控车辆智能风控分析平台！-->
            欢迎
        </span>
        <div class="menu_right">
            <div class="customer-store" >

            </div>
            <div class="position-div" style="padding-left: 10px">
                <div style="float: right;padding: 0 10px" class="yk-nav-input-right-btn">
                    <div class="item">
                        <a href="javascript:void(-1)" title="全屏">
                            <screenfull></screenfull>
                        </a>
                    </div>
                    <div class="item">
                        <a href="javascript:void(-1)" title="设为主页"><wt-icon name="wt-icon-home" color="#fff" size="19px"></wt-icon></a>
                    </div>
                </div>
            </div>

            <div style="float: right; overflow: hidden">
                <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelectUserInfo">
                    <el-submenu index="1">
                        <template slot="title" class="username-title"><span class="username-text">{{userInfo.username}}</span></template>
                        <el-menu-item index="userInfo">个人信息</el-menu-item>
                        <el-menu-item index="editPwd">修改密码</el-menu-item>
                        <el-menu-item index="logout">退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script>
    import views from './../../user/views'
    import User from '../../../models/User'
    import EditPwd from './../../user/editPwd'
    import WtIcon from '../../../components/WtIcon'
    import Screenfull from '../../../components/Screenfull/index'
    const user = new User()

    export default {
        name: 'YkMenu',
        components: {WtIcon, Screenfull},
        data() {
            return {
                userInfo: user.getUserInfo(),
                show: true,
                showMark: false
            }
        },

        computed: {

        },

        watch: {

        },

        methods: {

            handleSelectUserInfo(item) {
                switch (item) {
                    case 'userInfo':
                        this.showUserInfo(this.userInfo.id)
                        break
                    case 'editPwd':
                        this.$store.dispatch('showModal', {
                            title: '修改密码',
                            size: '500px',
                            view: EditPwd,
                            options: {
                                id: this.userInfo.id
                            },
                            onClose: () => {
                                return true
                            }
                        })
                        break
                    case 'logout':
                        User.logout(({type}) => {
                            if (type == 'success') {
                                this.$router.push('/site/login')
                            }
                        })
                        break
                }
            },
            // 详情
            showUserInfo(id) {
                console.log(id)
                this.$store.dispatch('showModal', {
                    title: '用户详情',
                    size: '800px',
                    view: views,
                    options: {
                        id: id
                    },
                    onClose: () => {
                        return true
                    }
                })
            }

        },
        mounted() {

        }
    }
</script>

<style scoped>
    .search-item /deep/ .el-input__inner{
        background-color: rgb(63,98,252) !important;
        border:0 !important;
        color: #ffffff;
    }
    .yk-nav-input-right-btn div{
        float: left;
        padding-left: 10px;
        padding-right: 10px;
    }

    .el-icon-s-comment{
        margin-left: 0px !important;
    }

    .nav_welcome_left {
        line-height: 60px;
        font-size: 14px;
        color: rgba(255,255,255,0.96);
    }

    .menu_right {
        /*line-height: 60px;*/
        float: right;
        height: 60px;
    }

    .nav_welcome_right {
        color: #fff;
        float: left;
        font-size: 14px;
    }

    .el-icon-location-outline, .el-icon-s-comment {
        margin-left: 10px;
        font-size: 22px;
        color: #fff;
    }

    /*.item {*/
    /*    margin-right: 18px;*/
    /*}*/

    .avatar-img {
        float: right;
        width: 30px;
        height: 30px;
        background-size: 30px 30px !important;
        padding: 15px 0;
    }

    .el-menu-demo {
        background-color: transparent;
        border-bottom-style: none;
    }

    .customer-store {
        float: left;
    }

    .nav_welcome_right {
        line-height: 60px;
        overflow: hidden;
        height: 60px;
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
        transform: translateY(2px);
    }

    .icon-position {
        position: relative;
        /*top: 4px;*/
        line-height: inherit !important;
        margin-left: 0 !important;
    }
    .search-item {
        margin-left: 5px;
        margin-right: -5px;
    }
    .nav_welcome_right,
    .search-item,
    .icon-position,
    .icon-message {
        float: left;
    }
    .position-div {
        /*padding-top: 16px;*/
        height: 100%;
        float: left;
        box-sizing: border-box;
        line-height: 60px;
        overflow: hidden;
    }
    .vin_code {
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .car_other_info {
        font-size: 12px;
        color: #b4b4b4;
    }
    .highlighted .car_other_info {
        color: #ddd;
    }
    .yk-input{
        width: 260px;
    }
    .el-menu-demo /deep/ .el-submenu__title{
        padding: 0 20px 0 0!important;
    }
    .export-msg{
        position: relative;
        width: 30px;
        height: 60px;
    }
    .icon-color{
        font-size: 22px;
        color: #ffffff;
    }
    .export-mark{
        position: absolute;
        background-color:red;
        height: 10px;
        width: 10px;
        right: 0;
        top: 10px;
        border-radius: 50%
    }
</style>
