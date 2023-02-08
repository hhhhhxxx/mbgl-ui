
import {get,post} from '../utils/request'

export default {
    apply: (query) => post('/connect/apply',query),
    disconnect: (query) => post('/connect/disconnect',query),
    state: (query) => get('/connect/state',query)
}
