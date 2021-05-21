<template>
    <div class="h-div">
        <div class="store">
            <search-store :tree-obj="treeObj" :search-type="selectType"></search-store>
        </div>
        <div class="switch">
            <el-button-group class="car-panel">
                <el-button
                        size="small"
                        :type="selectType === 'searchCar' ? 'primary':''"
                        @click="switchType('searchCar')">
                    车辆
                </el-button>
                <el-button
                        size="small"
                        :type="selectType === 'searchDriver' ? 'primary':''"
                        @click="switchType('searchDriver')">
                    设备
                </el-button>
            </el-button-group>
        </div>
        <div class="car-driver"
             :is="treeComponent"
             ref="tree"
             :set-child="child"
             :checked-lists=" treeComponent === carTree ? carTreeCheckedList: driverTreeCheckedList "
             @nodeClick="nodeClick"
             @delClick="delClick"
             @centerClick="centerClick"
             :store-id="store_id">
        </div>
    </div>
</template>

<script>
    import Store from './storeTree'
    import DriverTree from './driverTree'
    import CarTree from './carTree'
    import SearchStore from './searchStore'

    export default {
        name: 'leftTree',
        components: { Store, SearchStore },
        data() {
            return {
                treeObj: null,
                carTree: CarTree,
                driverTree: DriverTree,
                treeComponent: CarTree,
                selectType: 'searchCar',
                store_id: '',
                child: '1',
                carTreeCheckedList: [],
                driverTreeCheckedList: []
            }
        },
        created() {
            this.$nextTick(() => {
                this.treeObj = this.$refs.tree
            })
        },
        methods: {
            switchType(data) {
                if (data === 'searchCar') {
                    this.driverTreeCheckedList = this.$refs.tree.checkedList
                }

                if (data !== 'searchCar') {
                    this.carTreeCheckedList = this.$refs.tree.checkedList
                }

                // 切换组件以后 设置store_id和has_child字段保留原有门店信息
                this.store_id = this.$refs.tree[this.selectType].store_id
                this.child = this.$refs.tree[this.selectType].has_child

                this.selectType = data
                this.treeComponent = data === 'searchCar' ? this.carTree : this.driverTree
                this.$nextTick(() => {
                    this.treeObj = this.$refs.tree
                })
            },
            nodeClick(data) {
                this.$emit('nodeClick', data)
            },
            delClick(data) {
                this.$emit('delClick', data)
            },
            centerClick(data) {
                this.$emit('centerClick', data)
            }
        }

    }
</script>

<style scoped>
    .store{
        height: 30%;
        width: 100%;
    }
    .switch{
        height: 50px;
        width: 100%;
        display: flex;
        align-items: flex-end;
        padding: 0 3px 2px 3px;
        box-sizing: border-box;
    }
    .car-driver{
        height: calc( 100% - 30% - 50px );
        width: 100%;
    }
    .car-panel{
        width: 100%;
    }
    .car-panel button{
        width: 50%;
        font-size: 12px;
    }

</style>
