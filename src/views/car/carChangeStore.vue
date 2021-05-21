<template>
    <div class="row">
        <div class="driver-car-change">
            <div class="change-body">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="24">
                            <div>这里是一个form表单</div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="change-submit">
                <el-button type="primary" size="small" @click="changeSubmit()">保存</el-button>
                <el-button type="primary" size="small" @click="hide()">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'carChangeStore',
        components: {},
        data() {
            return {
                row: [],
                carIds: [],
                form: {
                    store_id: ''
                },
                rules: {
                    store_id: [
                        {required: true, message: '迁移门店不能为空', trigger: 'change'}
                    ]
                }
            }
        },

        created() {
            this.carIds = this.$store.state.modal.options.carIds
            this.row = this.$store.state.modal.options.row
        },

        computed: {},

        methods: {

            changeSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        console.log('点击了保存')
                        console.log(this.carIds)
                        this.hide()
                    }
                })
            },

            hide() {
                this.$store.dispatch('hideModal')
            }

        },

        destroyed() {
            this.$store.dispatch('hideModal')
        }
    }
</script>

<style scoped>
    .row {
        min-height: 100px;
        height: auto;
        width: 100%;
    }

    .change-submit {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .store /deep/ .sec {
        width: 100% !important;
    }

    .car-tag {
        cursor: pointer;
    }
</style>
