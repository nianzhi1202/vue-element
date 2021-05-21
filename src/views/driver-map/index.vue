<template>
    <div class="h-div">
        <el-container class="h-div">
            <el-aside width="350px">
                <left-tree @nodeClick="nodeClick" @delClick="delClick" @centerClick="centerClick"></left-tree>
            </el-aside>
            <el-main class="no-padding">
                <yk-map :auto-open-info-window="true" :codeList="codeList" :remove-able="false" :delList="delList" :centerList="centerList"/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import leftTree from './leftTree'
    import YkMap from '../../components/baiduMap/YkMap'
    export default {
        name: 'index',
        components: {
            leftTree,
            YkMap
        },
        data() {
            return {
                delList: [],
                centerList: [],
                codeList: [],
                searchType: 'searchDriver'
            }
        },
        methods: {
            nodeClick(codeList) {
                this.codeList = codeList
            },
            delClick(data) {
                this.delList = data
            },
            centerClick(data) {
                this.centerList = data
            }
        }
    }
</script>

<style scoped>
    .no-padding{
        padding: 0!important;
        position: relative;
    }
    .store{
        height: 30%;
        width: 100%;
    }
    .car-driver{
        height: 70%;
        width: 100%;
    }
</style>
