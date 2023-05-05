import storage from "../../../../../utils/storage";
import key from "../../../../../utils/key";
import Toast from '@vant/weapp/toast/toast';
import prescriptionApi from "../../../../../api/prescriptionApi"

Page({
    /**
         * 页面的初始数据
         */
    data: {
        id: null,
        prescriptionDTO: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id
        const that = this
        prescriptionApi.get(id).then(res => {
            this.setData({
                prescriptionDTO: res.data,
                id: id
            })
        })
    },

    // 跳去 处方付费
    toPayPre () {
        let id = this.data.id
        prescriptionApi.valid(id).then(res => {
            if (res.data == true) {
                wx.navigateTo({
                    url: '/pages/patient/drug/pay-pre/pay-pre?id=' + id,
                })
            }
        })
    }
})