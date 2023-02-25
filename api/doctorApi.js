
import {get,post} from '../utils/request'

export default {
    getDoctorPage: (query) => get('/doctor/page/list',query),
    // getDoctorById: (id) => get('/doctor/get/'+id),

    getDoctorByUserId: (id) => get('/doctor/user/'+id),
    updateDoctor: (query) => post('/doctor/update',query)
}
