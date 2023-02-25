
import {get,post} from '../utils/request'

export default {
    getPatientByUserId:(userId) => get('/patient/user/'+userId),

    // getPatientById: (id) => get('/patient/get/'+id),

    updatePatient: (query) => post('/patient/update',query),

    getPatientPage: (query) => get('/patient/page/list',query),
}
