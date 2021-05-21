import RobberyBusiness from '../RobberyBusiness'

export default class RobberyBusinessSearch extends RobberyBusiness {
    constructor(data) {
        super(data)

        this.format = Object.assign(this.format, {
            insure_name: {
                label: '车主姓名'
            }

        })

        this.searchAttribute = [
            {
                name: 'store_id',
                type: 'storeSelect',
                radio: true,
                value: ''
            },
            {
                name: 'vin_code',
                type: 'input',
                value: ''
            },
            {
                name: 'license_plate',
                type: 'input',
                value: ''
            },
            {
                name: 'insure_name',
                type: 'input',
                value: ''
            },
            {
                name: 'id_card',
                type: 'input',
                value: ''
            },
            {
                name: 'status',
                type: 'dataDictSelect',
                groupName: 'tb_robbery_business_status',
                value: ''
            }
        ]
    }
}
