<template>
    <div class="row">
        <div v-if="type == 'popover'">
            <div v-if="!data.length" class="no-data" style="padding: 0 10px">无数据</div>
            <div v-else>
                <div v-for="(item,index) in data.slice(0,2)" :key="index">
                    <wt-icon v-if="item.icon" size="10px" :color="item.icon.color" :name="item.icon.name"
                             :title="item.label"/>
                    <span v-html="item.value"></span>
                </div>
            </div>
            <el-popover
                v-if="data.length > 3"
                placement="left-end"
                width="300"
                trigger="hover">
                <div>
                    <div v-for="(item, index) in data" :key="index"
                         style="font-size:12px;height: 40px;width: 100%;display: flex;justify-content: flex-start;align-items: center">
                        <div style="height: 40px;line-height: 40px;margin-left: 5px">
                            <wt-icon v-if="item.icon" size="10px" :color="item.icon.color" :name="item.icon.name"
                                     :title="item.label"/>
                            <span v-html="item.value"></span>
                        </div>
                    </div>
                </div>
                <div slot="reference">
                    <wt-icon size="10px" name="wt-icon-chakan" title="查看全部"/>
                    查看全部({{data.length}})
                </div>
            </el-popover>
        </div>
        <div v-else v-for="(item,index) in data" :key="index" class="list-k-row">
            <!--   有图标标识的   -->
            <div v-if="item.icon">
                <wt-icon :name="item.icon" size="10px" :title="item.label"></wt-icon>
            </div>

            <!--      url跳转      -->
            <div v-if="item.next_url && item.next_url != 'modal' && item.value" class="list-k-row">
                <a :href="item.next_url" target="_blank" class="router-link-active">
                    {{item.value}}
                </a>
            </div>

            <div v-if="item.next_url == 'modal' && item.value" class="list-k-row">
                <a href="javascript:void(-1)" @click="showView()"
                   class="router-link-active">
                    {{item.value}}
                </a>
            </div>

            <!--     不带url的都走这里       -->
            <div v-if="!item.next_url && item.value" v-html="$options.filters.reSetValue(item.value,item.label)"></div>

            <!--    有标签标识的 ,标签不用传递 value，label，next_url，只需tag     -->
            <el-tag size="mini" v-if="item.tag" style="margin-left: 5px;">{{item.tag}}</el-tag>
        </div>
    </div>
</template>

<script>
    import WtIcon from '../../components/WtIcon'

    export default {
        name: 'TableCol',
        components: {WtIcon},
        props: {
            data: {
                type: [Array, Object],
                default: () => {
                    return []
                }
            },
            type: {
                type: String,
                default: ''
            },
            // 根据方法名称在父组件弹出modal
            modalName: {
                type: String,
                default: ''
            }
        },
        watch: {},

        methods: {
            showView() {
                this.$emit(this.modalName)
            }
        },
        filters: {
            reSetValue: function (value, label) {
                if (typeof value === 'string' && value.indexOf(' %/ ') !== -1) {
                    let _value
                    let _label
                    let res = ''
                    _value = value.split('%/')
                    _label = label.split('/')

                    if (_value.length !== _label.length) {
                        return value
                    }
                    _value.forEach((item, index) => {
                        let _item = item.replace(/\s*/g, '') // 去空格
                        if (_item === '' || _item === '-' || _item === '--' || _item === 'null') { // 空值显示 值 对应的 label
                            res += index === _value.length - 1 ? `<span class="onknow-attr"> ${_label[index]} </span> ` : `<span class="onknow-attr">${_label[index]} </span> <span class="onknow-attr"> / </span>`
                        } else {
                            res += index === _value.length - 1 ? `${_item} ` : `${_item}<span class="onknow-attr"> / </span> `
                        }
                    })
                    return res
                }
                // 空值显示label
                if (value === '' || !value) {
                    return `<span class="onknow-attr">${label}</span>`
                }
                return value
            }
        }
    }
</script>

<style scoped>
    .list-k-row {
        display: flex;
        justify-content: flex-start;
    }
</style>
