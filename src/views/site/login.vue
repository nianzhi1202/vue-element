<template>
    <div class="first-box">
        <div class="two-box">
            <div class="login-form" ref="formBox">
                <el-form ref="loginForm" :model="form" :rules="rules" class="login-box" v-bind:style="{ display: formType }">
                    <el-form-item  prop="username" class="form-input">
                        <el-input type="text" placeholder="请输入账号" v-model="form.username">
                            <WtIcon name="wt-icon-yonghu-o" slot="prefix"></WtIcon>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="form-input">
                        <el-input type="password" placeholder="请输入密码" v-model="form.password">
                            <WtIcon name="wt-icon-suoding" slot="prefix"></WtIcon>
                        </el-input>
                    </el-form-item>
<!--                    <el-form-item class="form-input">-->
<!--                        <el-checkbox v-model="checked" style="float: left">记住密码</el-checkbox>-->
<!--                    </el-form-item>-->
                    <el-form-item class="form-input">
                        <el-button type="primary" v-on:click="onSubmit('loginForm')" style="width: 100%;">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import WtIcon from '../../components/WtIcon'
    import User from '../../models/User'

    export default {
        name: 'login',
        components: { WtIcon },
        data() {
            return {
                User: User,
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                checked: true,
                colorType: 1,
                formType: '',
                clientHeight: '', // 屏幕高度
                iconSize: '33px', // 图标的大小
                iconColor: 'white' // 图标的颜色
            }
        },
        mounted() {
            // 获取屏幕高度
            this.clientHeight = `${document.documentElement.clientHeight}`
            window.onresize = function temp() {
                this.clientHeight = `${document.documentElement.clientHeight}`
            }
        },
        watch: {
            // 如果clientHeight发生改变，这个函数就会运行
            clientHeight: function () {
                this.changeFixed(this.clientHeight)
            }
        },
        methods: {
            // 提交表单
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        User.login(this.form, ({ type }) => {
                            if (type == 'success') {
                                this.$router.push('/car/index')
                            } else {
                                this.$store.dispatch('showTip', {
                                    text: '账号密码错误！',
                                    duration: 1000,
                                    type: 'error'
                                })
                                return false
                            }
                        })
                    }
                })
            },

            // 动态修改样式
            changeFixed(clientHeight) {
                this.$refs.formBox.style.height = (clientHeight - 310) + 'px'
            }
        }
    }
</script>

<style>
    .two-box{
        width: 50%;
        margin:0 auto;
    }
</style>
