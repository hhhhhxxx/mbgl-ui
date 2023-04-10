import {get,post} from '../utils/request'

export default {
    pageDrugView: (query) => get('/drug/page/view',query),
    getInfoById: (id) => get('/drug/get/info/'+id),
    getPreShopList: (preid) => get('/drug/get/pre/shoplist/'+preid),

    getClazz:() => get('/drug/get/class'),

    typeList: () => get('/drug/type/list'),
}