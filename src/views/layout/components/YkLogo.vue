<template>
    <div class="logo h-div" @click="goIndex">
        <div v-show="!open" class="f-div">
            <div class="show-name-logo default">
                <el-image :src="defaultLogo" style="width: 30%;height: 30%" :fit="'cover'"></el-image>
            </div>
        </div>

        <div v-show="open" class="f-div">
            <div class="show-name-logo default">
                <el-image :src="defaultLogo" style="width: 50%;height: 50%" :fit="'cover'"></el-image>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'YkLogo',
        props: ['open'],
        data() {
            return {
                defaultLogo: 'http://uzh-res.oss-cn-beijing.aliyuncs.com/order/609a4f38a4f87.png'
            }
        },
        methods: {
            goIndex() {
                this.$router.replace({
                    path: '/cockpit/index'
                })
            }
        },
        computed: {
            user() {
                return this.$store.state.user.getUserInfo()
            }
        }
    }
</script>

<style scoped>
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .close {
        height: 60%;
        width: 80%;
        background: url("https://yikong-v2.oss-cn-shanghai.aliyuncs.com/public/logo.png") no-repeat 17px center;
        -webkit-background-size: cover;
        background-size: cover;
    }

    .flex-center {
        height: 80%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-size: 14px;
    }

    .show-logo > div {
        height: 80%;
        width: 80%;
        /*overflow: hidden;*/
    }

    .show-name-logo > div {
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .show-name-logo > div:first-child {
        width: 25%;
        height: 80%;
        /*overflow: hidden;*/
    }

    .default {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .f-div {
        height: 80%;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .name {
        white-space: nowrap;
    }

    .animate {
        transition: width .15s linear;
        transform: translateZ(0);
    }

    .logo /deep/ .el-avatar {
        background-color: rgba(0, 0, 0, 0) !important;
    }
</style>
