import {get, post} from '../utils/request'

export default {
    pay: (query) => post('/order/pay', query),
    getOrderDTOList: (userId) => get('/order/list/'+userId),
    getOne: (userId,orderId) => get(`/order/get/${userId}/${orderId}`),
}
