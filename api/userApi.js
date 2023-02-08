
import {get,post} from '../utils/request'

export default {
    login:(query) => post('/user/login',query)

}
