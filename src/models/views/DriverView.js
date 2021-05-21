import Driver from '../Driver'

export default class DriverView extends Driver {
    constructor(data = {}) {
        super(data)
        this.view = [
            {
                attribute: 'code'
            },
            {
                attribute: 'type'
            },
            {
                attribute: 'simcard_view'
            },
            {
                attribute: 'period_type_view'
            },
            {
                attribute: 'period_time'
            },
            {
                attribute: 'delivery_time'
            },
            {
                attribute: 'install_place',
                permission: '客户端_V2_查看设备安装信息'
            },
            {
                attribute: 'install_time'
            },
            {
                attribute: 'setup_status'
            },
            {
                attribute: 'use_status_view'
            },
            {
                attribute: 'running_status'
            },
            {
                attribute: 'status_view'
            },
            {
                attribute: 'tags2',
                span: 24
            },
            {
                attribute: 'client_remark',
                span: 24
            },
            {
                attribute: 'car_vin_code'
            },
            {
                attribute: 'car_license_plate'
            },
            {
                attribute: 'car_model'
            },
            {
                attribute: 'car_owner_name'
            },
            {
                attribute: 'color'
            },
            {
                attribute: 'car_type'
            }
        ]
    }
}
