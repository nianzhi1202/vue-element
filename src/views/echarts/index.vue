<template>
    <div>
        <el-row>
            <el-col :span="12">
                <echart :id="'pie'" @clickEchart="clickPieChart" :style="{width:'500px',height:'300px'}"
                        :option="pieChartOption"/>
            </el-col>
            <el-col :span="12">
                <echart :id="'line'" @clickEchart="clickLienChart" :style="{width:'500px',height:'300px'}"
                        :option="lineChart"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echart from '../../components/Echarts/index'

    export default {
        name: 'index',
        components: {echart},
        data() {
            return {
                pieChartOption: {},
                lineChart: {}
            }
        },

        created() {
        },

        watch: {},

        mounted() {
            // 折线图
            this.lineChart = {
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [['1月', '500'], ['2月', '360'], ['3月', '0'], ['4月', '0'], ['5月', '0'], ['12月', '0']],
                    type: 'line',
                    itemStyle: {normal: {label: {show: true}, color: ['#02A7F0']}},
                    _time: {
                        type: 1,
                        year: new Date().getFullYear()
                    },
                    pathType: 1
                    // smooth: true   // 切换折线图和曲线图
                }]
            }
            // 饼状图
            this.pieChartOption = {
                title: {text: 'echart图表'},
                series: [
                    {
                        name: '车辆评分占比',
                        type: 'pie',
                        radius: ['35%', '55%'],
                        avoidLabelOverlap: true,
                        label: {
                            normal: {
                                show: true,
                                // position:'outside',
                                formatter: '{b} ({d}%)',
                                fontSize: '12'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12'
                                }
                            }
                        },
                        // 这里的数据可能是后端计算后得出的
                        data: [
                            {value: 50, name: '80分以上'},
                            {value: 40, name: '60-80分'},
                            {value: 10, name: '60分以下'}
                        ],
                        // 自定义颜色
                        itemStyle: {
                            emphasis: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'},
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#3BA1FF', '#6AD389', '#FCDB56'
                                    ]
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    }
                ]
            }
        },
        computed: {},
        methods: {
            // 饼状图点击回调
            clickPieChart(chart) {
                console.log(chart)
            },
            // 折线图点击回调
            clickLienChart(chart) {
                console.log(chart)
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
