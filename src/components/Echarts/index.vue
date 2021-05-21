<template>
    <!-- 同一页面多个chart调用，id不能重复   -->
    <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
    import echarts from 'echarts'

    /**
     * 必传；option
     * 返回：echarts示例
     */
    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '300px'
            },
            option: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                chart: null
            }
        },
        created() {
        },
        mounted() {
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        watch: {
            // 由于echarts采用的数据驱动，所以需要监听数据的变化来重绘图表
            // 要监听的对象 option
            option: {
                handler(newVal, oldVal) {
                    if (Object.keys(newVal).length != 0) {
                        this.initChart()
                    }
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id))
                this.chart.clear() // 适用于大数据量的切换时图表绘制错误,先清空在重绘
                this.chart.setOption(this.option, true) // 设置为true可以使图表切换数据时重新渲染
                let type = this.option.series[0].type === 'bar' ? 'shadow' : (this.option.series[0].type === 'line' ? 'line' : '')
                this.chart.setOption(Object.assign(this.option, {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: type,
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    }
                }))
                this.chart.on('click', () => {
                    this.$emit('clickEchart', this.chart)
                })
            }
        }
    }
</script>

<style scoped>

</style>
