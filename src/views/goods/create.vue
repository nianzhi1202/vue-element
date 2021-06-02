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
                    text: '删除-后端403',
                    onClick: () => {
                        this.get403()
                    },
                    show: true,
                    type: 'primary',
                    options: {
                        plain: ''
                    },
                    permission: '客户_中都客户管理员'
                },
                {
                    text: '删除-后端401',
                    onClick: () => {
                        this.get401()
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
            get401() {
                Goods.Permission401({}, ({result}) => {
                    console.log(result)
                })
            },
            get403() {
                Goods.Permission403({}, ({type, data}, res) => {
                    if (type == 'success') {
                        console.log(data)
                    } else {
                        this.$store.dispatch('showTip', {
                            duration: 2000,
                            text: data.message,
                            type: 'warning'
                        })
                    }
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
