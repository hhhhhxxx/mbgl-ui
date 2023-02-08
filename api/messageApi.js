
import {get,post} from '../utils/request'

export default {
    send: (query) => post('/message/send',query),
    getBefore: (query) => post('/message/getBefore',query),
    getAfter: (query) => post('/message/getAfter',query),
}
