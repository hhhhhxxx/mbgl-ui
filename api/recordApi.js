import {get,post} from '../utils/request'

export default {
    addRecord:(query) => post('/record/add',query),

    getWeekData:(query) => get('/record/getWeekData',query),

    getAllDetail:(query) => get('/record/getAllDetail',query),
}
