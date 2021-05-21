<template>
    <div>
        <el-table-view :model="robberyBusiness">

        </el-table-view>

<!--        <div class="form-action">-->
<!--            <el-button type="primary" size="small" @click="buttonDispatch">关闭</el-button>-->
<!--        </div>-->
    </div>

</template>

<script>
    import RobberyBusinessView from '../../models/views/RobberyBusinessView'
    import RobberyBusiness from '../../models/RobberyBusiness'
    import ElTableView from '../../components/element/ElTableView'
    export default {
        name: 'view',

        components: {ElTableView},
        data() {
            return {
                robberyBusiness: new RobberyBusinessView()
            }
        },
        computed: {
            id() {
                return this.$store.state.modal.options.id
            }
        },
        watch: {
            id() {
                this.initData()
            }
        },
        mounted() {
            this.initData()
        },
        methods: {

            buttonDispatch() {
                this.$store.dispatch('hideModal')
            },
            initData() {
                RobberyBusiness.getView({id: this.id}, ({type, data}) => {
                    if (type === 'success') {
                        this.robberyBusiness = new RobberyBusinessView(data.data)
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .form-action {
        padding-top: 20px;
        text-align: right;
    }

</style>
