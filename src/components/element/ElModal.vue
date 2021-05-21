<template>
    <div v-show="showModal">
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
    </div>
</template>

<script>
    export default {
        name: 'ElModal',

        data() {
            let modal = this.$store.state.modal
            return {
                modal: modal,
                show: false
            }
        },

        methods: {
            onClose() {
                typeof this.modal.onClose === 'function' ? this.modal.onClose(true) : ''
            }
        },
        computed: {
            showModal() {
                return this.modal.show
            },
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

        watch: {
            modalId(id) {
                this.show = !!id
            }
        }
    }
</script>

<style scoped>

</style>
