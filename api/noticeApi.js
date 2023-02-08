import {get, post} from '../utils/request'

export default {
    pageList: (query) => get('/notice/page/list', query),
    option: (query) => post('/notice/option', query),

    delelte: (id) => post('/notice/delete/'+id),
}
