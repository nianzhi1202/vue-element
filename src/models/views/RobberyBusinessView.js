
import RobberyBusiness from '../RobberyBusiness'

export default class RobberyBusinessView extends RobberyBusiness {
    constructor(data = {}) {
        super(data)
        this.view = [
            {
                attribute: 'policy_num'
            },
            {
                attribute: 'application_num'
            },
            {
                attribute: 'store_view'
            },
            {
                attribute: 'vin_code'
            },
            {
                attribute: 'car_model'
            },
            {
                attribute: 'license_plate'
            },
            {
                attribute: 'insure_name'
            },
            {
                attribute: 'gps_model'
            },
            {
                attribute: 'install_time'
            },
            {
                attribute: 'start_time'
            },
            {
                attribute: 'end_time'
            },
            {
                attribute: 'term_date'
            },
            {
                attribute: 'register_time'
            },
            {
                attribute: 'create_time'
            },
            {
                attribute: 'safe_price'
            },
            {
                attribute: 'beneficiary'
            },
            {
                attribute: 'create_time'
            }
        ]
    }
}
