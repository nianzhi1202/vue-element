<template>
    <div class="user-view">
        <div>
            <el-table-view> </el-table-view>
        </div>
        <div class="form-action">
            <el-button type="primary" size="small" @click="modelUpdate">修改</el-button>
            <el-button type="primary" size="small" @click="buttonDispatch">关闭</el-button>
        </div>
    </div>
</template>

<script>
    import userModel from '../../models/User'
    import ElTableView from '../../components/element/ElTableView'
    import UserView from '../../models/views/UserView'
    import UserUpdate from './update'
    export default {
        name: 'views',
        components: {ElTableView},
        data() {
            return {
                id: '',
                userModel: userModel,
                name: '',
                userData: [],
                UserView: undefined
            }
        },

        mounted() {
            console.log(999999999999)
            this.id = this.$store.state.modal.options.id
            this.viewsUser()
        },
        methods: {
            buttonDispatch() {
                this.$store.dispatch('hideModal')
            },
            modelUpdate() {
                // let name=row.username;
                this.$store.dispatch('showModal', {
                    title: '账号修改',
                    size: '800px',
                    view: UserUpdate,
                    options: {
                        id: this.id
                    }
                })
            },
            viewsUser() {
                // this.UserView = new UserView()
                var _this = this
                this.userModel.viewsUser({id: this.$store.state.modal.options.id}, ({type, data}) => {
                    if (type === 'success') {
                        _this.$store.commit('updateKey', {keyName: 'modalPropsData', data: new UserView(data.data)})
                        // this.$store.state.userInfo = _.cloneDeep(new UserView(data.data))
                        // this.name = data.data.name
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .user-view{
        margin-top: -10px;
        margin-bottom: -15px;
    }
    .suggest{
        font-weight: bold;
        color: black;
    }
    .form-action {
        padding-top: 20px;
        padding-bottom: 15px;
        text-align: center;
    }
</style>
