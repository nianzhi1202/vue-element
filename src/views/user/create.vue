<template>

    <div class="user-create">
        <el-form :model="userForm" :rules="rules" ref="from" label-width="100px" size="small" label-position="top">

            <el-row>
                <el-col :span="12">
                    <el-form-item :label="model.getAttributeLabel('username')" prop="username">
                        <el-input v-model="userForm.username" placeholder="请输入账号"></el-input>
                    </el-form-item>

                </el-col>

                <el-col :span="12">
                    <el-form-item :label="model.getAttributeLabel('store_id')" prop="store_id" class="store">
                        <yk-tree-select v-model="userForm.store_id" :show-radio="false"></yk-tree-select>
                    </el-form-item>

                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item :label="model.getAttributeLabel('name')" prop="name">
                        <el-input v-model="userForm.name"
                                  :placeholder="'请输入'+model.getAttributeLabel('name')"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="12">
                    <el-form-item :label="model.getAttributeLabel('phone')">
                        <el-input v-model="userForm.phone" placeholder="请输入联系方式"></el-input>
                    </el-form-item>

                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item :label="model.getAttributeLabel('type')" prop="type">
                        <yk-select
                                :clearable="false"
                                :groupName="'tb_user_type'"
                                v-model="userForm.type" class="filter-item"
                                :placeholder="'请选择' + model.getAttributeLabel('type')"
                        >
                        </yk-select>
                    </el-form-item>

                </el-col>
                <el-col :span="12">
                    <el-form-item :label="model.getAttributeLabel('auth_item_name')">
                        <el-select class="sec" v-model="userForm.auth_item_name" placeholder="请选择角色" size="small" multiple>
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item :label="model.getAttributeLabel('registered_residence')">
                        <el-input v-model="userForm.registered_residence"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="12">
                    <el-form-item :label="model.getAttributeLabel('title')">
                        <el-input v-model="userForm.title"></el-input>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item :label="model.getAttributeLabel('remark')">
                        <el-input type="textarea" :rows="4" v-model="userForm.remark"></el-input>
                    </el-form-item>

                </el-col>
            </el-row>

        </el-form>

        <div class="user-submit">

            <el-button type="primary" size="small" @click="submitFrom">保存</el-button>
            <el-button type="primary" size="small" @click="buttonDispatch"> 取消</el-button>

        </div>

    </div>

</template>

<script>
    import YkTable from '../../components/element/YkTable'
    import model from '../../models/User'
    import YkRemoteSelect from '../../components/element/YkRemoteSelect'
    import YkTreeSelect from '../../components/element/YkTreeSelect'
    import YkSelect from '../../components/element/YkSelect'

    export default {
        name: 'create',
        // eslint-disable-next-line vue/no-unused-components
        components: {YkSelect, YkTreeSelect, YkRemoteSelect},
        component: {YkTable},

        data() {
            return {
                model: model,
                userForm: {
                    username: '',
                    store_id: '',
                    name: '',
                    phone: '',
                    wechat: '',
                    email: '',
                    registered_residence: '',
                    auth_item_name: '',
                    remark: '',
                    title: '',
                    type: 1
                },
                rules: {
                    username: [
                        {required: true, message: '请输入' + model.getAttributeLabel('username'), trigger: 'blur'}
                    ],
                    store_id: [
                        {required: true, message: '请选择' + model.getAttributeLabel('store_id'), trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请选择' + model.getAttributeLabel('name'), trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择' + model.getAttributeLabel('type'), trigger: 'blur'}
                    ]
                },
                options: []
            }
        },
        mounted() {
          this.getRoles()
        },
        methods: {
            getRoles() {
                model.getRoles({}, ({type, data}) => {
                    if (type === 'success') {
                       this.options = data.data
                    } else {
                        this.options = []
                    }
                })
            },
            buttonDispatch() {
                this.$store.dispatch('hideModal')
            },

            submitFrom() {
                this.$refs.from.validate((valid) => {
                    if (valid) {
                        model.create(this.userForm, ({type, data}) => {
                            if (type === 'success') {
                                this.$store.dispatch('showTip', {
                                    text: '新增成功',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.$store.dispatch('hideModal', true)
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
                        console.log('error submit!!')
                        return false
                    }
                })
            }

        }

    }
</script>

<style scoped>
    .user-submit {
        text-align: center;
    }

    .el-col {
        padding-right: 10px;
    }

    .store /deep/ .sec {
        width: 100% !important;
    }
</style>
