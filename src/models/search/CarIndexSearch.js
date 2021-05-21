import Car from '../Car'

export default class CarIndexSearch extends Car {
    constructor(data) {
        super(data)

        this.format = Object.assign(this.format, {
            driver_code: {
                label: '设备号'
            },
            tags: {
                label: '车辆标签'
            },
            grade: {
                label: '风险等级'
            }
        })

        this.searchAttribute = [
            {
                name: 'driver_code',
                type: 'input',
                value: ''
            },
            {
                name: 'tags',
                type: 'input',
                value: ''
            },
            {
                name: 'grade',
                type: 'dataDictSelect',
                groupName: 'tb_car_grade',
                value: '',
                span: 2
            }
        ]
    }
}
