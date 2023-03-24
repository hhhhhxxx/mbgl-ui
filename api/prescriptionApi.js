
import {get,post} from '../utils/request'

export default {
    valid: (id) => get('/prescription/valid/'+id),
}
