import storage from "../../../../utils/storage";
import key from "../../../../utils/key";
import Toast from '@vant/weapp/toast/toast';
import messageApi from '../../../../api/messageApi'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        prescriptionList: [],
        patientId: null,
        radio: null,
        show: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let prescriptionList = storage.getList(key.PRESCRIPTION_LIST)

        console.log()

        if (options.patientId != undefined) {
            this.setData({
                prescriptionList: prescriptionList,
                patientId: options.patientId,
                show: true
            })
        } else {
            this.setData({
                prescriptionList: prescriptionList,
                false: true
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let prescriptionList = storage.getList(key.PRESCRIPTION_LIST)

        this.setData({
            prescriptionList: prescriptionList,
        })
    },

    toInfo (e) {
        const { index } = e.currentTarget.dataset

        wx.navigateTo({
            url: '/pages/doctor/drug/prescription/info/info?index=' + index
        })
    },
    // 添加   
    toDrugStore () {
        wx.navigateTo({
            url: '/pages/doctor/drug/index/index'
        })
    },

    onChange (event) {
        this.setData({
            radio: event.detail,
        });
    },

    onSubmit () {

        if (this.data.radio != undefined) {
            const that = this

            let preList = storage.getList(key.PRESCRIPTION_LIST)

            let index = Number(this.data.radio)

            let item = preList[index]

            let shopList = item.shopList

            let plainList = shopList.map(e => {
                return {
                    id: e.id,
                    quantity: e.quantity
                }
            })

            messageApi.send({
                shopList: plainList,
                content: "_P",
                sendUserId: storage.getCurrentUserId(),
                receiveUserId: that.data.patientId,
                type: 2,
                info: item.info
            }).finally(res => {

                wx.navigateBack({
                    delta: 1
                });
                // wx.switchTab({
                //     url: '/pages/tab3/tab3',
                // })
            })

        } else {
            Toast('请选择处方');
        }
    }
})