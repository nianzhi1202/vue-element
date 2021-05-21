<template>
    <div :class="[{menuOpen: !isOpen},{menuClose:isOpen},'menu' ]">
        <el-scrollbar
            :native="false"
            wrap-class="scrollbar-wrapper">
            <el-menu
                class="h-div"
                v-if="reload"
                @select="menuSelect"
                :collapse="isOpen"
                :collapse-transition="false"
                :unique-opened="true"
                ref="menu"
                mode="vertical"
                :default-active="activeIndex">
                <template v-for="(item, index) in menuList">
                    <el-menu-item v-if="hasOneShowingChild(item.children)" :index="item.url" :key="item.url">
                        <wt-icon :name="item.icon" :size="iconSize"></wt-icon>
                        <span slot="title" class="wt-menu-title">{{item.name}}</span>
                    </el-menu-item>
                    <el-submenu v-else :index="index.toString()" :key="index.toString()">
                        <template slot="title">
                            <wt-icon :name="item.icon" :size="iconSize"></wt-icon>
                            <span slot="title" class="wt-menu-title">{{item.name}}</span>
                        </template>
                        <el-menu-item :index="_item.url" v-for="(_item) in item.children" :key="_item.url">
                            <wt-icon :name="_item.icon" :size="iconSize"></wt-icon>
                            <span slot="title">{{_item.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import WtIcon from '../../../components/WtIcon'
    import menuList from '../../../routers/menu'

    export default {
        name: 'YkLeft',
        components: {WtIcon},
        data() {
            return {
                iconSize: '16px',
                menuList: menuList,
                // 默认展开的菜单，会在watch.$route中监听路由后修改
                activeIndex: '/cockpit/index',
                reload: true
            }
        },
        props: {
            isOpen: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            $route: {
                handler: function (val) {
                    this.activeIndex = val.path
                    // if(val.path === '/rule/driverRule' || val.path === '/rule/storeRule' || val.path === '/rule/update'){
                    //     this.activeIndex = '/rule/index'
                    // }
                    if (val.path === '/rule/storeRule') {
                        this.activeIndex = '/store/index'
                    }
                    if (val.path === '/rule/driverRule') {
                        this.activeIndex = '/car/index'
                    }
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            menuSelect(routePath) {
                this.$router.push(routePath)
            },
            // 用window.open跳转到新的页面时 菜单的选中状态会变为这个新页面的菜单项
            // 但是内容区域不是对应的菜单项的内容
            // 重置菜单 并设置当前激活菜单与内容相对应
            reloadMenu() {
                const path = this.activeIndex
                this.reload = false
                this.$nextTick(() => {
                    this.reload = true
                    this.activeIndex = path
                })
            },
            hasOneShowingChild(children = []) {
                return !children.length > 0
            }
        }
    }
</script>

<style scoped>
    .menu {
        height: 100%;
    }

    .menuOpen {
        transition: width .05s linear;
        transform: translateZ(0);
        width: 260px;
    }

    .menuClose {
        transition: width .05s linear;
        transform: translateZ(0);
        width: 66px;
    }

    .el-scrollbar {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
