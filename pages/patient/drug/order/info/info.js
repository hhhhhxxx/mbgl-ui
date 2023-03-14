// pages/patient/drug/order/info/info.js
import key from '../../../../../utils/key';
import storage from '../../../../../utils/storage';
import orderApi from '../../../../../api/orderApi'
import calUtil from '../../../../../utils/calUtil';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderDTO: {},
        steps: [
            {
                text: '等待发货',
                desc: '',
            },
            {
                text: '卖家已发货',
                desc: '',
            },
            {
                text: '物流运输中',
                desc: '',
            },
            {
                text: '已签收',
                desc: '',
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let orderId = options.id
        let userId = storage.getCurrentUserId()

        this.getOrder(userId, orderId)
    },

    getOrder (userId, orderId) {

        orderApi.getOne(userId, orderId).then(res => {

            let element = res.data

            element.orderItemList.forEach(e2 => {
                e2.price = calUtil.calDiv(e2.price, 100.0)
            })
            element.cost = calUtil.calDiv(element.cost, 100.0)

            this.setData({
                orderDTO: element
            })
        })

    }
})