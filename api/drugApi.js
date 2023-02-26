import {get,post} from '../utils/request'

export default {
    pageDrugView: (query) => get('/drug/page/view',query),
    getInfoById: (id) => get('/drug/get/info/'+id)
}