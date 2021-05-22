<template>
    <el-row>
        <el-col :span="8">
            <upload v-model="uploadValue.value1" @delImg="delImg" upload-key="other5"
                    :showFileList="false"/>
        </el-col>
        <el-col :span="8">
            <upload v-model="uploadValue.value2" @delImg="delImg" upload-key="other1"
                    :showFileList="false"/>
        </el-col>
        <el-col :span="8">
            <upload v-model="uploadValue.value3" @delImg="delImg" upload-key="other2"
                    :showFileList="false"/>
        </el-col>
    </el-row>
</template>

<script>
    import upload from '../../components/images/Upload'

    export default {
        name: 'index',
        components: {upload},
        data() {
            return {
                pieChartOption: {},
                lineChart: {},
                uploadValue: {
                    value1: '',
                    value2: '',
                    value3: 'http://tianyibao.oss-cn-beijing.aliyuncs.com/order/60a8adf2670b2.jpg'
                }
            }
        },

        created() {
        },

        watch: {},

        mounted() {
        },
        computed: {},
        methods: {
            delImg() {
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
