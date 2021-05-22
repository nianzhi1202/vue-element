<template>
    <span></span>
</template>

<script>
    import {Loading} from 'element-ui'

    export default {
        name: 'ElLoading',
        computed: {
            loadingShow() {
                return this.$store.state.loading.show
            },
            loadingText() {
                return this.$store.state.loading.text
            },
            loadingRun() {
                return this.$store.state.loading.run
            }
        },
        data() {
            return {
                loading: undefined
            }
        },
        methods: {
            close() {
                typeof this.loading === 'object' ? this.loading.close() : ''
            }
        },
        watch: {
            loadingShow(show) {
                if (show) {
                    this.loading = Loading.service({
                        text: this.loadingText
                    })
                    // 已服务运行的loading需要异步关闭
                    this.$nextTick(() => {
                        typeof this.loadingRun === 'function' ? this.loadingRun(this.close) : ''
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
