<template>

        <div class="user-create">
            <el-form :model="editPwdForm" :rules="rules" ref="from" label-width="100px" size="small" >

                    <el-row>
                            <el-col :span="15">
                                    <el-form-item :label="User.getAttributeLabel('oldPassword')" prop="oldPassword">
                                            <el-input v-model="editPwdForm.oldPassword" show-password placeholder="旧密码"></el-input>
                                    </el-form-item>

                            </el-col>
                    </el-row>
                    <el-row>
                            <el-col :span="15">
                                    <el-form-item :label="User.getAttributeLabel('newPassword')" prop="newPassword">
                                            <el-input v-model="editPwdForm.newPassword" show-password placeholder="新密码"></el-input>
                                    </el-form-item>
                            </el-col>
                    </el-row>
                    <el-row>
                            <el-col :span="15">
                                    <el-form-item :label="User.getAttributeLabel('rePassword')" prop="rePassword">
                                            <el-input v-model="editPwdForm.rePassword" show-password placeholder="确认密码"></el-input>
                                    </el-form-item>
                            </el-col>
                    </el-row>
            </el-form>

                <div class="user-submit">

                        <el-button type="primary" size="small" @click="submitFrom">保存</el-button><el-button type="primary" size="small" @click="buttonDispatch"> 取消</el-button>

                </div>

        </div>

</template>

<script>
    import User from '../../models/User'
    export default {
        name: 'editPwd',
        component: {},
        data() {
              return {
                      User: User,
                      editPwdForm: {
                              oldPassword: '',
                              newPassword: '',
                              rePassword: ''
                      },
                      rules: {
                              oldPassword: [
                                      { required: true, message: '请输入旧密码', trigger: 'blur' }
                              ],
                              newPassword: [
                                      { required: true, message: '请输入新密码', trigger: 'blur' }
                              ],
                              rePassword: [
                                      { required: true, message: '请输入确认密码', trigger: 'blur' }
                              ]
                      }
              }
        },
        methods: {
                buttonDispatch() {
                        this.$store.dispatch('hideModal')
                },
                submitFrom() {
                        this.$refs.from.validate((valid) => {
                        if (valid) {
                              User.editPwd(this.editPwdForm, ({type, data}) => {
                                      if (type === 'success') {
                                              this.$store.dispatch('showTip', {
                                                      text: '修改成功，请重新登录',
                                                      type: 'success',
                                                      duration: 2000
                                              })
                                              this.$store.dispatch('hideModal', true)
                                              this.$store.commit('setAccessToken', null)
                                              this.$store.commit('handleUserInfo', null)
                                              this.$router.push('/site/login')
                                      } else {
                                              this.$store.dispatch('showTip', {
                                                      text: data.message,
                                                      type: 'error',
                                                      duration: 2000
                                              })
                                      }
                              })
                        } else {
                                this.$refs.span.style.display = 'none'
                                return false
                        }
                        })
                }

        }

    }
</script>

<style scoped>
        .user-submit{
                text-align: center;
        }
</style>
