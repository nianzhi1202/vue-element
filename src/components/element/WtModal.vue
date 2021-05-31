<template>
    <el-dialog
        :title="modalTitle"
        :visible.sync="show"
        :modal="false"
        :width="modalSize"
        :top="modalTop"
        :close-on-click-modal="true"
        @closed="onClose"
    >
        <component v-bind:is="modalView" v-bind="modalOptions"></component>
    </el-dialog>
</template>
<!--这个是通过全局变量来控制modal的显示，ElModal是通过store控制的-->
<script>
    export default {
        name: 'WtModal',
        methods: {
            onClose() {
                typeof this.modal.onClose === 'function' ? this.modal.onClose(true) : ''
            }
        },
        computed: {
            modalId() {
                return this.modal.id
            },
            modalTitle() {
                return this.modal.title
            },
            modalView() {
                return this.modal.view
            },
            modalSize() {
                return this.modal.size
            },
            modalTop() {
                return this.modal.top
            },
            modalOptions() {
                return this.modal.options
            }
        },
        data() {
            let modal = this.dataModal
            return {
                modal: modal,
                show: false
            }
        },
        watch: {
            modalId: function (id) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.show = !!id
                }, 200)
            }
            // modalId(id) {
            //     this.show = !!id;
            // }
        }
    }
</script>

<style scoped>

</style>
