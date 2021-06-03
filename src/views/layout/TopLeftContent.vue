<template>
    <el-container class="h-div">
        <el-header class="h-div yk-header">
            <el-container class="h-div">
                <el-aside :width="leftWidth" class="h-div" :class="isOpen ? 'open':'close'">
                    <yk-logo :open="isOpen"></yk-logo>
                </el-aside>

                <div class="yk-menu-switch" @click="isOpen = !isOpen">
                    <i class="el-icon-s-unfold yk-menu-switch-icon" v-show="isOpen === true"></i>
                    <i class="el-icon-s-fold yk-menu-switch-icon" v-show="isOpen === false"></i>
                </div>
                <el-main class="h-div">
                    <yk-menu></yk-menu>
                </el-main>
            </el-container>
        </el-header>

        <el-container class="h-div" style="height: calc(100% - 60px)">
            <yk-left :is-open="isOpen"></yk-left>
            <el-container style="height: 100%;width: 100%;background-color: #F9F9FF">
                <el-main class="h-div yk-main">
                    <el-title></el-title>
                    <div class="yk-content" :class="isCockpit ? 'no-padding':''" v-if="isLoad">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import YkLogo from './components/YkLogo'
    import YkMenu from './components/YkMenu'
    import ElTitle from '../../components/element/ElTitle'
    import YkLeft from './components/YkLeft'

    export default {
        name: 'TopLeftContent',
        components: {YkLeft, YkLogo, YkMenu, ElTitle},
        data() {
            return {
                leftWidth: '200px',
                isOpen: false,
                isLoad: true,
                isCockpit: false
            }
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        computed: {
            forbidden() {
                return this.$store.state.forbidden
            }
        },
        methods: {
            reload() {
                this.isLoad = false
                this.$nextTick(() => {
                    this.isLoad = true
                })
            }
        },
        watch: {
            isOpen: function (val) {
                this.leftWidth = !val ? '200px' : '65px'
            },
            $route: {
                handler: function (val) {
                    if (val.path === '/index/index' || val.path === '/') {
                        this.isCockpit = true
                    } else {
                        this.isCockpit = false
                    }
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>
    .yk-content {
        height: calc(100% - 60px);
        background-color: #fff;
        padding: 12px;
        overflow-y: auto;
        margin: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 5px #ccc;
    }

    .no-padding {
        padding: 0 !important;
        height: calc(100% - 20px) !important;
    }

    .el-header {
        padding: 0;
    }

    .el-main {
        padding: 0;
    }

    .yk-header {
        height: 68px;
        background: url("https://yikong-v2.oss-cn-shanghai.aliyuncs.com/public/nav_bg.png") no-repeat;
        -webkit-background-size: 100% 68px;
        background-size: 100% 68px;
    }

    .yk-main {
        overflow: hidden;
    }

    .el-header .el-main {
        padding: 0;
        box-sizing: border-box;
    }

    .yk-menu-switch {
        height: 100%;
        width: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .yk-menu-switch-icon {
        height: 16px;
        width: 16px;
        color: rgba(255, 255, 255, 1);
    }

    .open{
        transition: width .15s linear;
        transform: translateZ(0);
    }
    .close{
        transition: width .15s linear;
        transform: translateZ(0);
    }
</style>
