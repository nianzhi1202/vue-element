<template>
    <div>
        <el-row>
            <el-col :span="8">
                <upload v-model="uploadValue.value1" upload-key="other5"/>
            </el-col>
            <el-col :span="8">
                <upload v-model="uploadValue.value2" upload-key="other1"/>
            </el-col>
            <el-col :span="8">
                <upload v-model="uploadValue.value3" upload-key="other2"/>
            </el-col>
        </el-row>
        <div style="margin-top: 20px">
            <upload-list v-model="uploadValue.value4"></upload-list>
        </div>
    </div>
</template>

<script>
    import upload from '../../components/images/Upload'
    import UploadList from '../../components/images/UploadList'

    export default {
        name: 'index',
        components: {
            upload,
            UploadList
        },
        data() {
            return {
                pieChartOption: {},
                lineChart: {},
                uploadValue: {
                    value1: '',
                    value2: '',
                    value3: 'http://tianyibao.oss-cn-beijing.aliyuncs.com/order/60a8adf2670b2.jpg',
                    value4: ''
                }
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
