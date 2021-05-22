<template>
    <el-upload
        v-loading="loading"
        element-loading-text="正在上传"
        ref="uploadRef"
        :disabled="imageUrl ? true : false"
        class="yk-upload"
        :style="uploadStyle"
        :action="action"
        :http-request="upload"
        :show-file-list="showFileList">
        <preview-image fit="cover" :src="imageUrl" :previewSrcList="[imageUrl]" v-if="imageUrl" style="height: 100%"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="del" v-show="imageUrl">
            <i class="el-icon-delete del" @click.stop="delUploadImg()"></i>
        </div>
    </el-upload>
</template>

<script>

    import PreviewImage from './PreviewImage'
    import Request from '../../cores/request/request'

    export default {
        name: 'Upload',
        components: {PreviewImage},

        data() {
            return {
                action: '',
                imageUrl: '',
                loading: false
            }
        },
        props: {
            // 限制文件大小，kb
            maxSize: {
                type: Number,
                default: () => {
                    return 1024 * 30
                }
            },

            showFileList: {
                type: Boolean,
                default: false
            },
            uploadStyle: {
                type: Object,
                default: () => {
                    return {
                        height: '120px',
                        width: '120px'
                    }
                }
            },
            // 一个页面多次调用时，回调区分标识
            uploadKey: {
                type: String,
                default: ''
            }
        },

        computed: {
            value() {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.imageUrl = this.$attrs.value // 接收父组件传过来的，props中没有接收的值，在这是value
                return this.$attrs.value
            }
        },

        watch: {
            value() {
                this.imageUrl = this.$attrs.value
            }
        },

        methods: {
            delUploadImg() {
                this.imageUrl = ''
                this.$emit('input', '')
            },
            upload(e) {
                if (e.file && e.file.size > this.maxSize * 1024) {
                    this.$store.dispatch('showTip', {
                        text: '文件大小不能超过 ' + this.maxSize + 'KB',
                        type: 'error'
                    })
                    return false
                }

                this.loading = true

                let form = new FormData()
                form.append('file', e.file)
                let options = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    params: form
                }

                Request.post('upload', options, ({type, data}, res) => {
                    this.loading = false
                    if (type === 'success') {
                        this.imageUrl = data.item
                        this.$emit('input', data.item)
                    }
                }, () => {
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

    .yk-upload {
        border: 1px solid #DDDDDD;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-size: 22px;
        position: relative;
    }

    .yk-upload-img {
        width: 80px;
        height: 80px;
    }

    .del {
        top: 0;
        right: 0;
        height: 25px;
        width: 25px;
        color: #ffffff;
        position: absolute;
        z-index: 999;
        font-size: 15px;
        background: rgba(0, 0, 0, .5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .del:hover {
        color: #0086db;
    }

    .yk-upload /deep/ .el-upload {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
