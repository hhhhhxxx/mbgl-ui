
import {get,post} from '../utils/request'

export default {
    getEmployeeByUserId: (id) => get('/employee/user/'+id),
    updateEmployee: (query) => post('/employee/update',query),
    list: () => get('/employee/list'),
}
