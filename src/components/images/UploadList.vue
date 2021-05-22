<template>
    <div>
        <el-upload
            action=""
            :http-request="upload"
            list-type="picture-card"
            :file-list="fileList"
            :on-change="handleChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <image-viewer
            v-if="showViewer && previewList.length>0"
            :on-close="closeViewer"
            :url-list="previewList"
            :initialIndex="initialIndex">
        </image-viewer>
    </div>
</template>

<script>

    import Request from '../../cores/request/request'
    import ImageViewer from 'element-ui/packages/image/src/image-viewer'

    export default {
        name: 'UploadList',
        components: {ImageViewer},

        /**
         * fileList和previewList要同步修改
         * fileList数据是组件自动生成，可能常规的url，而是一个blob数据，删除、添加时组件自动处理
         * previewList 是url数组，发送给父组件的value一定是这个经过逗号连接的字符串，删除、添加时需手动处理
         * */

        data() {
            return {
                initialIndex: 0,
                fileList: [], // [{url: 'https://xxx.cdn.com/xxx.jpg'}]
                previewList: [], // ['http://..','http://..']
                showViewer: false,
                flag: true // 阻止删除、新增图片后$emit 传递给父组件时 再次触发 value
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
            value: {
                type: String,
                default: ''
            }
        },

        watch: {
            value: {
                handler(val) {
                    this.flag ? this.formatFileList(val) : ''
                    this.flag = false
                },
                immediate: true
            }
        },

        methods: {

            /**
             * 字符串转数组并去空值
             * @param val
             */
            stringToArray(val) {
                return val.split(',').filter((s) => {
                    return s && s.trim()
                })
            },

            /**
             * 删除时没有返回被删除的索引，根据uid查找
             * @param uid
             */
            findIndexByUid(uid) {
                for (let index in this.fileList) {
                    if (this.fileList[index].uid == uid) {
                        return parseInt(index)
                    }
                }
            },

            /**
             * 只在初始化时调用一次
             * 把父组件传来的逗号拼接的url转为预览、显示需要的格式
             * @param val
             */
            formatFileList(val) {
                this.previewList = this.stringToArray(val)
                this.fileList = this.previewList.map((url) => {
                    return {url: url}
                })
            },

            handleRemove(file, fileList) {
                let index = this.findIndexByUid(file.uid)
                this.fileList = fileList
                this.previewList.splice(index, 1)
                this.$emit('input', this.previewList.join(','))
            },

            // 这里的改变不包括删除，所以删除时还得手动赋值
            handleChange(file, fileList) {
                this.fileList = fileList
            },

            // 开启预览
            handlePreview(file) {
                this.showViewer = true
                this.initialIndex = this.findIndexByUid(file.uid)
            },

            // 关闭预览
            closeViewer() {
                this.showViewer = false
            },

            upload(e) {
                if (e.file && e.file.size > this.maxSize * 1024) {
                    this.$store.dispatch('showTip', {
                        text: '文件大小不能超过 ' + this.maxSize + 'KB',
                        type: 'error'
                    })
                    return false
                }

                let form = new FormData()
                form.append('file', e.file)
                let options = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    params: form
                }

                Request.post('upload', options, ({type, data}, res) => {
                    if (type === 'success') {
                        this.previewList.push(data.item)
                        this.$emit('input', this.previewList.join(','))
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>
