<template>
    <div class="container">
        <el-popover
                placement="bottom"
                ref="popover"
                trigger="click">
            <wt-icon name="wt-icon-qiehuan2" size="22px" color="#fff" slot="reference" />
            <div class="container-panel">
                <el-cascader-panel
                        :popper-options="{altAxis: false}"
                        :props="props"
                        @change="onChange"
                        @expand-change="expandChange"
                        ref="cascader"
                >
                    <template slot-scope="{ node, data }">
                        <wt-icon :name="data.icon"/>
                        <span>{{ data.label }}</span>
                    </template>
                </el-cascader-panel>
                <div class="buttons">
                    <div class="preview" v-if="checked !== undefined">已选择 {{checked.name}}</div>
                    <el-button type="primary" size="mini" :disabled="checked === undefined" @click="onLogin">切换</el-button>
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script>
    import WtIcon from '../../../components/WtIcon'
    import Request from '../../../cores/request/request'
    import User from '../../../models/User'
    export default {
        name: 'CustomerStore',
        components: {WtIcon},
        data() {
            return {
                props: {
                    lazy: true,
                    lazyLoad: (node, resolve) => {
                        this.loadList(node, resolve)
                    }
                },

                user: this.$store.state.user,

                customerStore: this.$store.state.customerStore,

                checked: undefined
            }
        },
        watch: {
            $route() {
                this.loadList({level: 0}, {})
            }
        },
        methods: {
            onChange(items) {
                if (items[1].type === 'user') {
                    this.checked = items[1]
                }
            },

            expandChange() {
                this.$refs.popover.showPopper = false
                this.$nextTick(() => {
                    this.$refs.popover.showPopper = true
                })
            },

            onLogin() {
                Request.get('userCode', { params: { id: this.checked.id } }, ({type, data}) => {
                    if (type === 'success') {
                        User.logout(({type}) => {
                            if (type === 'success') {
                                this.$router.push('/site/login')

                                this.$nextTick(() => {
                                    this.$router.push({
                                        path: '/site/login-by-code',
                                        query: {
                                            code: data.data.code,
                                            time: data.data.time,
                                            username: this.checked.name
                                        }
                                    })
                                })
                            }
                        })

                        return
                    }

                    this.$store.dispatch('showTip', {
                        text: data.message,
                        type: 'error'
                    })
                })
            },

            loadStore(node, resolve) {
                const nodes = []
                Request.get('customerStoreList', {}, ({type, data}) => {
                    if (type === 'success') {
                        // nodes.push( {
                        //     value: this.user.getUserInfo().store_id,
                        //     label: this.user.getUserInfo().customer_id_view,
                        //     icon: 'wt-icon-lou',
                        //     leaf: true,
                        // } );

                        for (const _node of data.data.items) {
                            const name = _node.customer_id_view + ' - ' + _node.name
                            nodes.push({
                                value: {id: _node.id, name: name, type: 'store'},
                                label: name,
                                icon: 'wt-icon-mendianguanli',
                                leaf: false
                            })
                        }
                        // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        resolve(nodes)
                    }
                })
            },

            loadUser(node, resolve) {
                const nodes = []
                const params = {
                    id: node.value.id,
                    type: 1
                }
                Request.get('customerStoreUserList', { params: params }, ({type, data}) => {
                    if (type === 'success') {
                        for (const _node of data.data.items) {
                            nodes.push({
                                value: {id: _node.id, name: _node.username, type: 'user'},
                                label: _node.username,
                                icon: 'wt-icon-yonghu',
                                leaf: true
                            })
                        }
                        // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        resolve(nodes)
                    }
                })
            },

            loadList(node, resolve) {
                if (node.level === 0) {
                    this.loadStore(node, resolve)
                } else {
                    this.loadUser(node, resolve)
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        line-height: 60px;
        overflow: hidden;
        height: 60px;
        float: left;
        cursor: pointer;
    }

    .buttons {
        text-align: right;
        margin-top: 12px;
    }

    .preview {
        float: left;
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
        line-height: 28px;
        color: #999;
    }
</style>
