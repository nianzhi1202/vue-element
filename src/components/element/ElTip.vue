<template>
    <small></small>
</template>

<script>
    export default {
        name: 'ElTip',
        computed: {
            tip() {
                return this.$store.state.tip
            },
            id() {
                return this.$store.state.tip.id
            }
        },
        watch: {
            id() {
                this.$message({
                    showClose: true,
                    message: this.tip.text,
                    type: this.tip.type,
                    duration: this.tip.duration
                })
            }
        }
    }
</script>

<style scoped>

</style>
