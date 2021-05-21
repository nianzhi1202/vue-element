<template>

    <el-table
                :data="tableData"
                border
                size="small"
                :stripe="true"
                :show-header="false"
                style="width: 100%">
            <el-table-column
                    prop="key"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="val"

                    >

            </el-table-column>

    </el-table>

</template>

<script>

    export default {
        name: 'YkTableView',

        data() {
            return {
                tableData: []

            }
        },
        computed: {
            model() {
                return this.$store.state.modalPropsData
            }
        },

        watch: {

            model() {
                if (this.model !== undefined && this.model.view.length > 0) {
                    this.tableData = []
                    for (let index of this.model.view) {
                        this.tableData.push({
                            key: this.model.getLabel(index.attribute),
                            val: this.model.getValue(index.attribute) || '-'
                        })
                    }
                }
            }

        }

    }
</script>

<style scoped>

</style>
