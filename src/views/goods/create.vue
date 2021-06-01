<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <el-btn-title :buttons="buttons" title="工单基础信息"></el-btn-title>

        </el-card>
    </div>
</template>

<script>
    import ElBtnTitle from '../../components/element/ElBtnTitle'
    import Goods from '../../models/Goods'

    export default {
        name: 'create',
        components: {ElBtnTitle},
        data() {
            return {
                buttons: []
            }
        },

        created() {
            this.buttons = [
                {
                    text: '下载照片',
                    onClick: () => {
                        console.log('点击了')
                    },
                    show: true,
                    type: 'primary',
                    options: {
                        plain: ''
                    },
                    permission: '客户_中都客户管理员'
                },
                {
                    text: '删除-后端无权',
                    onClick: () => {
                        this.getGoods()
                    },
                    show: true,
                    type: 'primary',
                    options: {
                        plain: ''
                    },
                    permission: '客户_中都客户管理员'
                }
            ]
        },

        watch: {},

        mounted() {
        },
        computed: {},

        methods: {
            getGoods() {
                Goods.PermissionTest({}, ({result}) => {
                    console.log(result)
                })
            }
        },

        destroyed() {
        }
    }
</script>

<style scoped>
    .point {
        cursor: pointer;
    }
</style>
