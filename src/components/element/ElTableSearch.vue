<template>
    <div class="search">
        <el-row :gutter="6">
            <el-col :span="item.span || 3" :key="index" v-for="(item, index) of formData">
                <el-input
                        v-model="item.value"
                        v-if="item.type === 'input'"
                        :size="item.size ? item.size: size"
                        :placeholder="model.getLabel( item.name )"
                ></el-input>

                <el-select-data-dict :groupName="item.groupName" :placeholder="model.getLabel( item.name )" v-model="item.value" v-if="item.type === 'dataDictSelect'" class="filter-item"  :size="item.size ? item.size: size"></el-select-data-dict>

                <el-date-picker
                        style="width: 100%;"
                        v-model="item.value"
                        type="datetime"
                        v-if="item.type === 'datetime'"
                        :size="item.size || size"
                        :placeholder="model.getLabel( item.name )"
                >
                </el-date-picker>

                <el-date-picker
                        style="width: 100%;"
                        v-model="item.value"
                        type="date"
                        v-if="item.type === 'date'"
                        :size="item.size || size"
                        :placeholder="model.getLabel( item.name )"
                >
                </el-date-picker>

                <el-date-picker
                        style="margin-top: 1px"
                        :size="item.size || size"
                        v-model="item.value"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        v-if="item.type === 'daterange'">
                </el-date-picker>

                <el-region
                        v-model="item.value"
                        v-if="item.type === 'region'">
                </el-region>

                <el-select
                        v-model="item.value"
                        v-if="item.type === 'select'"
                        :size="item.size || size"
                        :placeholder="model.getLabel( item.name )"
                >
                    <el-option
                            v-for="( label, value ) in item.options"
                            :key="value"
                            :label="label"
                            :value="value"
                            :size="item.size || size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <span class="more-search" v-if="modelFormData">
                <a href="javascript:void(-1)" @click="moreSearch">高级搜索</a>
        </span>
    </div>
</template>

<script>
    import BaseModel from '../../cores/model/BaseModel'
    import ElSelectDataDict from './ElSelectDataDict'
    import ElRegion from './ElRegion'
    export default {
        name: 'ElTableSearch',
        components: {ElRegion, ElSelectDataDict},
        props: {
            model: {
                type: BaseModel
            },
            formData: {
                type: Array
            },
            modelFormData: {
                type: Array
            }
        },
        data() {
            return {
                size: 'small',
                form: {
                    has_child: 1
                }
            }
        },
        watch: {
            formData: {
                handler(val, oldval) {
                    console.log(val)
                    console.log(oldval)
                this.updateData()
                },
                deep: true
            }
        },
        methods: {
            isChild(data) {
                this.form.has_child = data ? 1 : 0
                this.updateData()
            },
            jsonToString(json) {
                let str = ''
                for (let j in json) {
                    if (json[j]) {
                        str += json[j] + ','
                    }
                }
                return str
            },
            updateData() {
                let data = this.formData
                if (this.modelFormData) {
                    data = this.formData.concat(this.modelFormData)
                }
                for (let i of data) {
                    if ((i.value === '' || i.value === {})) {
                        this.form[i.name] = undefined
                    } else {
                        switch (i.type) {
                            case 'region':
                                this.form[i.name] = this.jsonToString(i.value)
                                break
                            case 'daterange':
                                if (i.value.length) {
                                    this.form[i.name] = i.value[0] + ' - ' + i.value[1]
                                }
                                break
                            default:
                                this.form[i.name] = i.value
                        }
                    }
                }
                this.$emit('searchData', this.form)
            }
        }
    }
</script>

<style scoped>
    .line {
        margin: 12px 0;
        height: 1px;
        background-color: #eee;
    }

    .el-select {
        width: 100%;
    }
    .more-search{
        position: relative;
        top:-25px;
        left: 100%;
        margin-left: 10px;
        font-size: 12px;
    }

    .wt-form-slot-item {
        margin-bottom: 0 !important;
    }
</style>
