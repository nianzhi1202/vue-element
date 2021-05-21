<template>
    <div style="display: flex">
        <el-select  v-model="district.province" style="flex: 1;" placeholder="省份" size="small" @change="getCityData" value="">
            <el-option
                    v-for="item in addressArray"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
        </el-select>
        <el-select  v-model="district.city" style="flex: 1;margin-left: 10px" placeholder="市" size="small" @change="getAreaData">
            <el-option
                    v-for="item in cityArray"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
        </el-select>
        <el-select  v-model="district.area" style="flex: 1;margin-left: 10px" placeholder="区/县" size="small" @change="AreaChanged">
            <el-option
                    v-for="item in areaArray"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import Region from '../../../static/json/address.json'
    import MortgageRegion from '../../../static/json/mortgageAddress.json'
    export default {
        name: 'ElRegion',
        model: {
            prop: 'address',
            event: 'change'
        },
        props: {
            address: { type: Object },
            regionType: { type: Number, default: 1}
        },
        data() {
            // 判断regionType返回不同的json数据，不同的数据库
            if (this.regionType == 1) {
                console.log('this is a daole')
                return {
                    addressArray: Region,
                    district: this.address,
                    cityArray: [],
                    areaArray: []
                }
            } else if (this.regionType == 2) {
                return {
                    addressArray: MortgageRegion,
                    district: this.address,
                    cityArray: [],
                    areaArray: []
                }
            }
        },
        created() {
            this.getAddressData()
        },
        watch: {
            // 监听接口返回值的变化改变下拉框的值（编辑页面）
            address: function (newval, oldval) {
                console.log(newval)
                console.log(oldval)
                // 默认赋值获取城市数组
                if (this.address.province) {
                    for (let ad of this.addressArray) {
                        if (ad.id === this.address.province) {
                            this.cityArray = ad.subarea
                            // 默认赋值获取区域数组
                            if (this.address.city) {
                                for (let area of this.cityArray) {
                                    if (area.id === this.address.city) {
                                        this.areaArray = area.subarea
                                    }
                                }
                            }
                        }
                    }
                }
                this.district = this.address
            }
        },
        methods: {
            getAddressData() {
                var that = this
                that.addressArray = this.addressArray.data
                console.log('daole')
                // 默认赋值获取城市数组
                if (that.address.province) {
                    console.log('到了')
                    for (let ad of that.addressArray) {
                        if (ad.id === that.address.province) {
                            that.cityArray = ad.subarea
                            // 默认赋值获取区域数组
                            if (that.address.city) {
                                for (let area of that.cityArray) {
                                    if (area.id === that.address.city) {
                                        that.areaArray = area.subarea
                                    }
                                }
                            }
                        }
                    }
                }
            },
            // 选择省份
            getCityData(val) {
                // 清空市和区
                this.address.city = ''
                this.address.area = ''
                // 选择省份后改变市区的值
                this.$emit('change', this.address)
                for (let ad of this.addressArray) {
                    if (ad.id === val) {
                        this.cityArray = ad.subarea
                    }
                }
            },
            getAreaData(val) {
                // 清空区
                this.address.area = ''
                // 选择市区后改变县的值
                this.$emit('change', this.address)
                for (let area of this.cityArray) {
                    if (area.id === val) {
                        this.areaArray = area.subarea
                    }
                }
            },
            // 地区数据变动
            AreaChanged(val) {
                console.log(val)
                this.$emit('change', this.address)
            }
        }
    }
</script>

<style scoped>

</style>
