import BaseModel from '../cores/model/BaseModel'
import Request from '../cores/request/request'
import NumberFormatter from '../cores/formatter/NumberFormatter'
// import DataDict from "./DataDict";
// import WtfDate from "../cores/helpers/WtfDate";
import Driver from './Driver'

export default class DriverNew extends BaseModel {
    constructor(data = {}) {
        super(data)
        this.format = {
            carOwner: {
              label: '车主'
            },
            equipmentId: {
                label: '设备号'
            },
            driverModel: {
              label: '设备型号'
            },
            driverType: {
                label: '设备类型'
            },
            carVinCode: {
                label: '车架号'
            },
            carLicensePlate: {
              label: '车牌号'
            },
            driverStatus: {
                label: '状态',
                value: () => {
                    // eslint-disable-next-line no-unused-vars
                    const dataDict = {}

                    if (this.data.driverType === '有线') {
                        // dataDict = DataDict.getValueNameLocal( 'tb_driver_running_status_wired' );
                    } else {
                        // dataDict = DataDict.getValueNameLocal('tb_driver_running_status_wireless');
                    }
                    // return dataDict[ this.data.lineStatus ] + " ( "+ WtfDate.fromNow( this.data.lineStatusTime, false ) +" )";

                    return this.data.driverStatus
                }
            },
            accStatus: {
                label: 'ACC状态',
                value: ''// DataDict.getValueNameLocal('tb_acc_status')
            },
            reportTime: {
                label: '信号时间'
            },
            locateTime: {
                label: '定位时间'
            },
            locationType: {
                label: '定位类型'
            },
            gpsLongitude: {
                label: '经度'
            },
            gpsLatitude: {
                label: '纬度'
            },
            heading: {
                label: '朝向'
            },
            address: {
                label: '地址'
            },
            otherInfo: {
                label: '其他信息',
                value: () => {
                    const workPattern = this.getValue('workPattern')
                    return this.data.otherInfo + workPattern
                }
            },
            alarm_view: {
                label: '报警信息'
            },
            workPattern: {
                label: '工作模式',
                value: () => {
                    let workPattern = '工作模式:'
                    if (typeof this.data.workPattern === 'string' && this.data.workPattern) {
                        const _workPattern = JSON.parse(this.data.workPattern)
                        if (Object.keys(_workPattern).includes('workPattern') && Object.keys(_workPattern).includes('description')) {
                            let description = _workPattern.description
                            if (description.indexOf('{') !== -1) {
                                description = JSON.parse(_workPattern.description)
                            }
                            switch (_workPattern.workPattern) {
                                case '01':
                                    workPattern += `(闹钟回传模式: ${this.formatWorkPattern(description)} )`
                                    break
                                case '03':
                                    workPattern += `(定时回传模式: ${this.formatWorkPattern(description)} )`
                                    break
                                case '04':
                                    workPattern += `(星期模式: ${this.formatWorkPattern(description)} )`
                                    break
                                case '05':
                                    workPattern += `(省电模式: ${this.formatWorkPattern(description)})`
                                    break
                                case '06':
                                    workPattern += `( 连续模式: ${this.formatWorkPattern(description)} )`
                                    break
                                default:
                                    workPattern += '未知'
                                    break
                            }
                            return workPattern
                        }
                        return ''
                    }
                    return ''
                }
            },
            speed: {
                label: '速度',
                formatter: NumberFormatter,
                formatterOptions: {
                    toFixed: 2,
                    unit: ' km/h'
                }
            },
            is_switch: {
                label: '是否切换'
            },
            is_showButton: {
                label: '是否展示按钮',
                value: () => {
                    return true
                }
            }
        }
    }

    formatWorkPattern(data) {
        let res = ''
        if (typeof data !== 'object') {
            return data
        }
        const desc = {
            onlineInterval: ' 上线间隔 ',
            nextOnlineTime: ' 下次上线时间 ',
            wakeupInterval: ' 唤醒间隔 '
        }

        const list = Object.keys(data)
        list.forEach((item) => {
            if (item === 'nextOnlineTime') {
                res = '测试'
                // res += desc[item] + WtfDate.getData(data[item]);
            } else {
                res += desc[item] + data[item]
                    .replace('min', '分钟')
                    .replace('h', '小时')
                    .replace('day', '天')
            }
        })
        return res
    }

    getIcon() {
        return 'https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_car_icons/' + this.data.runningStatusView + '.png'
    }

    getContent(button) {
        const list = [
            'carOwner',
            'carVinCode',
            'carLicensePlate',
            'equipmentId',
            'driverType',
            'driverModel',
            'driverStatus',
            'reportTime',
            'locateTime',
            'locationType',
            'accStatus',
            'speed',
            'gpsLongitude',
            'gpsLatitude',
            'heading',
            'address',
            'otherInfo'
        ]
        const content = {}
        const _content = []
        let value = ''
        for (const index in list) {
            value = this.getValue(list[index])
            if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === '') {
                value = '无'
            }
            if (list[index] === 'carVinCode' && this.getValue('alarm_view')) {
                value = value + '（' + this.getValue('alarm_view') + '）'
            }
            _content.push({label: this.getLabel(list[index]), value: value})
            content[this.getLabel(list[index])] = value
        }
        if (button && button instanceof Array && button.length) {
            console.log([
                ..._content,
                ...button
            ])
            return [
                ..._content,
                ...button
            ]
        }
        return content
    }

    async readSync() {
        const res = await this.readAsync()
        console.log(res)
    }

    readAsync() {
        return new Promise((resolve, reject) => {
            console.log(reject)
            Driver.getCarPositionNew({code: this.getValue('equipmentId'), locationType: 'GPS'}, ({type, data}) => {
                console.log(data)
                resolve(type)
            })
        })
    }

    readAsyncCallback(callback) {
        Driver.getCarPositionNew({code: this.getValue('equipmentId'), locationType: 'GPS'}, ({type, data}) => {
            console.log(data)
            callback(type)
        })
    }

    static getCarPositionNew(params, fn) {
        Request.get('carStatusNew', {params: params}, ({type, data}) => {
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }
}
