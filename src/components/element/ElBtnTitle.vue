<template>
    <div class="title">
        <el-row>
            <el-col :span="18" v-html="title" :style="{fontSize: size, fontWeight: 'bold'}">
            </el-col>
            <el-col :span="6" class="button">
                <div>
                    <el-button
                        :type="button.type || 'text'"
                        :key="index"
                        v-for="(button, index) of buttonData"
                        size="mini"
                        @click="button.onClick(id)"
                        v-bind="button.options || {}"
                        v-permission="button.permission"
                    >
                        <wt-icon weight="0px" v-if="button.icon" :name="button.icon"></wt-icon>
                        {{button.text}}
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import WtIcon from '../WtIcon'

    export default {
        name: 'BtnTitle',
        components: {WtIcon},
        props: {
            id: {
                type: [String, Number]
            },
            title: {
                type: String,
                required: true
            },
            buttons: {
                type: Array,
                default: () => {
                    return []
                }
            },
            size: {
                type: String,
                default: '16px'
            }
        },
        computed: {
            buttonData: function () {
                return this.buttons.filter(function (item) {
                    return item.show == undefined || item.show == true
                })
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: 16px;
        height: 30px;
        line-height: 30px;
    }

    .button {
        text-align: right;
        height: 30px;
        line-height: 30px;
    }

    .button button {
        position: relative;
        top: -2px;
    }
</style>
