import {get,post} from '../utils/request'

export default {
    setSessionkey: (query) => get('/wx/set/sessionkey',query),

    decodeRunData: (query) => post('/wx/decode',query),

    getNowStep: (query) => post('/wx/getNowStep',query),

    sendMessage: (query) => post('/wx/send/message',query)
}
