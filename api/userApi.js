
import {get,post} from '../utils/request'

export default {
    login:(query) => post('/user/login',query),
    wxLogin:(query) => post('/user/wx/login',query),
    uploadImage: (query) => post('/user/upload/image',query)
}
