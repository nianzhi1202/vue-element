<template>
    <el-container class="h-div">
        <el-header class="h-div yk-header">

            <el-container class="h-div">

                <el-aside :width="leftWidth" class="h-div">
                    <yk-logo></yk-logo>
                </el-aside>

                <div style="width: 100%">
                    <yk-menu></yk-menu>
                </div>

            </el-container>
        </el-header>

        <el-container class="yk-main-container">
            <el-main class="h-div yk-main" :class="isMap ? 'no-padding':''">
                <router-view v-if="!forbidden.state"></router-view>
                <not-allow v-else></not-allow>
            </el-main>
        </el-container>

    </el-container>
</template>

<script>

    import YkLogo from './components/YkLogo'
    import YkMenu from './components/YkMenu'
    import NotAllow from '../../views/error/notAllow'
    export default {
        name: 'TopContent',
        components: {YkLogo, YkMenu, NotAllow},
        data() {
            return {
                leftWidth: '260px',
                isMap: false
            }
        },
        computed: {
            forbidden() {
                return this.$store.state.forbidden
            }
        },
        watch: {
            $route: {
                handler: function(val) {
                    if (val.path === '/driver-map/index' || val.path === '/rule/fence') {
                        this.isMap = true
                    } else {
                        this.isMap = false
                    }
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>

    .el-header {
        padding: 0;
    }

    .el-main {
        padding: 12px !important;
    }

    .no-padding{
        padding: 0 !important;
    }

    .yk-header {
        background-image:url('https://yikong-v2.oss-cn-shanghai.aliyuncs.com/public/nav_bg.png');
        background-repeat:repeat-x;
        background-color: #365bff;
    }

    .yk-main {
        overflow: auto;
        padding: 0 !important;
        height: 100%;
        box-sizing: border-box;
    }

    .yk-main-container {
        height: calc(100% - 60px);
        box-sizing: border-box;
    }
</style>
