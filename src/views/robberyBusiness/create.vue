<template>
    <div class="visit-create">
        <div class="header-list">
            <span class="suggest">基础信息 </span>
        </div>
            <el-form label-position="top" :model="robberyForm" :validate-on-rule-change="false" :rules="rules" ref="from" label-width="130px" size="small" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('vin_code')" prop="vin_code">
                            <el-input v-model="robberyForm.vin_code"  placeholder="请输入车架号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('license_plate')">
                            <el-input v-model="robberyForm.license_plate"  placeholder="请输入车牌号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('register_time')" prop="register_time">
                            <el-date-picker
                                    v-model="robberyForm.register_time"
                                    type="date"
                                    placeholder="选择车辆登记日期"
                                    size="small"
                                    style="width: 100%"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('insure_name')" prop="insure_name">
                            <el-input v-model="robberyForm.insure_name"  placeholder="请输入车主姓名"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('insure_type')" prop="insure_type">
                            <el-select-data-dict @selectChanged="selectChanged" v-model="robberyForm.insure_type" groupName="tb_robbery_business_insure_type"></el-select-data-dict>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('certificate_type')" prop="certificate_type">
                            <el-select-data-dict v-model="robberyForm.certificate_type" groupName="tb_robbery_business_certificate_type" :disabled-name="disabledName"></el-select-data-dict>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('id_card')" prop="id_card">
                            <el-input v-model="robberyForm.id_card"  placeholder="请输入证件号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('phone')" prop="phone">
                            <el-input v-model="robberyForm.phone"  placeholder="请输入电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="model.getAttributeLabel('district')" prop="district">
                            <YkRegion v-model="robberyForm.district_arr"></YkRegion>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="model.getAttributeLabel('address')" prop="address">
                            <el-input v-model="robberyForm.address" max="50" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('car_model')" prop="car_model">
                            <el-input v-model="robberyForm.car_model"  placeholder="请输入车辆型号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('engine_number')" prop="engine_number">
                            <el-input v-model="robberyForm.engine_number"  placeholder="请输入发动机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('price')" prop="price">
                            <el-input type="number" min="0" max="99999999" v-model="robberyForm.price"  placeholder="请输入车辆价格"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('gps_model')" prop="gps_model">
                            <el-select style="width: 100%" size="small" @change="changeModel" v-model="robberyForm.gps_model" placeholder="请选择设备型号" v-if="bindDrivers != undefined">
                                <el-option
                                        v-for="item in bindDrivers"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                            <el-input v-else v-model="robberyForm.gps_model"  placeholder="请输入设备型号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('install_time')" prop="install_time">
                            <el-date-picker
                                    v-model="robberyForm.install_time"
                                    type="date"
                                    placeholder="选择设备安装日期"
                                    size="small"
                                    style="width: 100%"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('safe_price')">
                            <el-input type="number" v-model="robberyForm.safe_price"  placeholder="请输入保障服务费"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <div class="header-list">
                    <span class="suggest">其他信息 </span>

                </div>

                <el-row>

                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('beneficiary')" prop="beneficiary">
                            <el-input v-model="robberyForm.beneficiary"  :placeholder="model.getAttributeLabel('beneficiary')"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('application_num')" prop="bamages">
                            <el-input v-model="robberyForm.application_num"  placeholder="请输入申请编号"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item :label="model.getAttributeLabel('term_date')" prop="term_date">
                            <el-select-data-dict v-model="robberyForm.term_date" groupName="tb_robbery_term_date"></el-select-data-dict>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="user-submit">
                    <el-button type="primary"  :loading="loading"  @click="submitFrom" size="small">保存</el-button>
                    <el-button type="primary" size="small" @click="draftSubmit">保存草稿</el-button>

                </div>

        </el-form>

    </div>

</template>

<script>
    import YkRegion from '../../components/element/ElRegion'
    import ElSelectDataDict from '../../components/element/ElSelectDataDict'
    import model from '../../models/RobberyBusiness'
    import Request from '../../cores/request/request'
    import { idCardValidator } from '../../cores/validator/Validator'

    export default {
        name: 'create',
        components: {ElSelectDataDict, YkRegion},
        data() {
            return {
                model: model,
                loading: false,
                robberyForm: {
                    store_id: '',
                    insure_name: '',
                    insure_type: '',
                    certificate_type: '',
                    id_card: '',
                    phone: '',
                    district_arr: { province: '', city: '', area: '' },
                    district: '',
                    address: '',
                    vin_code: '',
                    license_plate: '',
                    register_time: '',
                    car_model: '',
                    engine_number: '',
                    price: '',
                    gps_model: '',
                    install_time: '',
                    term_date: '',
                    beneficiary: '',
                    application_num: '',
                    status: '',
                    safe_price: ''
                },
                rules: {
                    district: [{ required: true, message: '请填省市区', trigger: 'blur' }],
                    id_card: [
                        {required: true, message: '证件不能为空', trigger: 'blur'},
                        {validator: idCardValidator, trigger: 'blur'}
                    ]
                },
                disabledName: '',
                bindDrivers: undefined
            }
        },
        computed: {
            getCarOwnerType() {
                return this.robberyForm.insure_type
            }
        },
        watch: {
            getCarOwnerType() {
                if (this.robberyForm.insure_type == 1) {
                    // this.robberyForm.certificate_type = '0';
                    this.disabledName = '组织机构代码'
                }
                if (this.robberyForm.insure_type == 0) {
                    // this.robberyForm.certificate_type = '1';
                    this.disabledName = '居民身份证,护照'
                }
            },
            'robberyForm.district_arr.area'(newValue, oldValue) {
                console.log(oldValue)
                this.robberyForm.district = this.robberyForm.district_arr.province + ',' + this.robberyForm.district_arr.city + ',' + this.robberyForm.district_arr.area
            },
            'robberyForm.district_arr.province'(newValue, oldValue) {
                console.log(oldValue)
                this.robberyForm.district = ''
            },
            'robberyForm.district_arr.city'(newValue, oldValue) {
                console.log(oldValue)
                this.robberyForm.district = ''
            },
            'robberyForm.store_id'(newValue, oldValue) {
                console.log(oldValue)
               this.getBindDrivers()
                if (this.robberyForm.vin_code) {
                    this.getBindCars()
                }
            },
            'robberyForm.vin_code'(newValue, oldValue) {
                console.log(oldValue)
                this.getBindDrivers()
                if (this.robberyForm.store_id) {
                    this.getBindCars()
                }
            }
        },
        methods: {
            selectChanged(val) {
                val == 0 ? this.robberyForm.certificate_type = '1' : this.robberyForm.certificate_type = '0'
            },
            changeModel(code) {
                Request.get('codeGetInstallTime', {params: {code: code}}, ({type, data}) => {
                    if (type === 'success') {
                        if (data.data === undefined) {
                            this.robberyForm.install_time = ''
                        } else {
                            this.robberyForm.install_time = data.data.install_time
                        }
                    }
                })
            },
            getBindCars() {
                Request.get('vinCodeGetCars', {params: {store_id: this.robberyForm.store_id, vin_code: this.robberyForm.vin_code}}, ({type, data}) => {
                    if (type === 'success') {
                        if (data.data === undefined) {
                            this.robberyForm.license_plate = ''
                            this.robberyForm.register_time = ''
                            this.robberyForm.insure_name = ''
                            this.robberyForm.insure_type = ''
                            this.robberyForm.certificate_type = ''
                            this.robberyForm.id_card = ''
                            this.robberyForm.phone = ''
                            this.robberyForm.car_model = ''
                            this.robberyForm.engine_number = ''
                            this.robberyForm.price = ''
                            this.robberyForm.install_time = ''
                        } else {
                            const newData = data.data
                            this.robberyForm.license_plate = newData.license_plate ? newData.license_plate : ''
                            this.robberyForm.register_time = newData.register_time ? newData.register_time : ''
                            this.robberyForm.insure_name = newData.owner_name ? newData.owner_name : ''
                            this.robberyForm.insure_type = newData.owner_type == 2 ? '0' : String(newData.owner_type ? newData.owner_type : '')
                            let type = 0
                            if (newData.owner_certificate_type == 2) {
                                type = 2
                            }
                            if (newData.owner_certificate_type == 3) {
                                type = 1
                            }
                            this.robberyForm.certificate_type = String(type)
                            this.robberyForm.id_card = newData.id_card ? newData.id_card : ''
                            this.robberyForm.phone = newData.owner_phone ? newData.owner_phone : ''
                            this.robberyForm.car_model = newData.car_model ? newData.car_model : ''
                            this.robberyForm.engine_number = newData.engine_number ? newData.engine_number : ''
                            this.robberyForm.price = newData.price ? newData.price : ''
                            if (newData.children.length > 0) {
                                this.robberyForm.install_time = newData.children[0].install_time
                            }
                        }
                    }
                })
            },

            getBindDrivers() {
                Request.get('carGetDrivers', {params: {store_id: this.robberyForm.store_id, vin_code: this.robberyForm.vin_code}}, ({type, data}) => {
                  if (type === 'success') {
                      if (data.data === undefined) {
                          this.bindDrivers = undefined
                          this.robberyForm.gps_model = ''
                      } else {
                          this.bindDrivers = data.data
                          this.robberyForm.gps_model = data.data[0].name
                      }
                  }
              })
            },
            getRule() {
                return new Promise((resolve) => {
                    model.getRule({}, ({type, data}) => {
                        if (type === 'success') {
                            for (const index of data.data) {
                                this.$set(this.rules, index, [{ required: true, message: '请输入' + model.getAttributeLabel(index), trigger: 'blur' }])
                                if (index === 'store_id') {
                                    this.$set(this.rules, index, [{ required: true, message: '请输入' + model.getAttributeLabel(index), trigger: 'change' }])
                                }
                            }
                            resolve(true)
                            return
                        }
                        resolve(false)
                    })
                })
            },
            async submitFrom() {
                this.loading = true
                // 同步获取规则信息
                // let ruleList = await this.getRule();
                // if(!ruleList){
                //     this.$store.dispatch("showTip", {
                //         text: '系统错误，请再试一次',
                //         type: "error",
                //         duration: 1000
                //     });
                //     this.loading = false;
                //     return
                // }
                this.loading = false
                this.robberyForm.status = 1
                this.$refs.from.validate((valid) => {
                    if (valid) {
                        model.create(this.robberyForm, ({type, data}) => {
                            if (type === 'success') {
                                this.$store.dispatch('hideModal')
                                this.$store.dispatch('showTip', {
                                    text: '新增成功',
                                    type: 'success',
                                    duration: 1000
                                })
                                this.$router.push('index')
                            } else {
                                this.$store.dispatch('showTip', {
                                    text: data.message,
                                    type: 'error',
                                    duration: 1000
                                })
                            }
                        })
                    } else {
                            // this.$refs.span.style.display = 'none';
                            console.log('error submit!!')
                            return false
                        }
                })
            },
            draftSubmit() {
                this.$refs.from.clearValidate()
                this.robberyForm.status = 0
                this.rules = {
                    store_id: [
                        { required: true, message: '请输入' + model.getAttributeLabel('store_id'), trigger: 'blur' }
                    ]
                }
                this.$nextTick(function() {
                    this.$refs.from.validate((valid) => {
                        if (valid) {
                            model.draftCreate(this.robberyForm, ({type, data}) => {
                                if (type === 'success') {
                                    this.$store.dispatch('hideModal')
                                    this.$store.dispatch('showTip', {
                                        text: '新增成功',
                                        type: 'success',
                                        duration: 1000
                                    })
                                } else {
                                    this.$store.dispatch('showTip', {
                                        text: data.message,
                                        type: 'error',
                                        duration: 1000
                                    })
                                }
                            })
                        } else {
                            // this.$refs.span.style.display = 'none';
                            console.log('error submit!!')
                            return false
                        }
                    })
                })
            },
            buttonDispatch() {
                this.$store.dispatch('hideModal')
            }
        }
    }
</script>

<style scoped>
    .header-list{
        padding-bottom: 20px;
    }
    .user-submit{
        padding-top: 20px;
        text-align: center;
    }
    .suggest{
        font-weight: bold;
        color: black;
    }
    .suggest-content{
        font-size: 12px;
        color:#aaa
    }
    .el-form-item /deep/ .sec{
        width: 100%;
    }
    .el-col{
        padding: 0 5px;
    }
    .filter-item-store /deep/ .tree-select{
        width: 100%;
    }
</style>
