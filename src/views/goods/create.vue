<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <el-btn-title :buttons="buttons" title="工单基础信息"></el-btn-title>

        </el-card>
    </div>
</template>

<script>
    import ElBtnTitle from '../../components/element/ElBtnTitle'

    export default {
        name: 'create',
        components: {ElBtnTitle},
        data() {
            return {
                buttons: [
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
                    }
                ]
            }
        },

        created() {
        },

        watch: {},

        mounted() {
        },
        computed: {},

        methods: {},

        destroyed() {
        }
    }
</script>

<style scoped>
    .point {
        cursor: pointer;
    }
</style>
