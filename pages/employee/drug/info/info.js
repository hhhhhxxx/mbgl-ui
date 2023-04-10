import Toast from '@vant/weapp/toast/toast';
import drugApi from '../../../../api/drugApi'
import calUtil from '../../../../utils/calUtil';
import key from '../../../../utils/key';
import storage from '../../../../utils/storage';
import messageApi from '../../../../api/messageApi'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        drug: '',
        isShowPreview: false,
        isShwoShopList: false,
        tempPrice: -1,
        quantity: 1,
        patientId: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDrugInfo(options.drugId)
        this.setData({
            patientId: options.patientId
        })
    },

    getDrugInfo (id) {
        const that = this
        drugApi.getInfoById(id).then(res => {
            this.setData({
                drug: res.data,
                tempPrice: res.data.price
            })
        })
    },

    onClickIcon () {
        console.log('点击图标')
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        });
    },


    // 选择数量
    onChangeStep (event) {
        this.setData({
            quantity: event.detail,
            tempPrice: calUtil.calMul(this.data.drug.price, event.detail)
        })
    },

    onClickPreview () {
        console.log('点击按钮')
        this.setData({
            isShowPreview: true
        })

    },

    onClosePreview () {
        this.setData({
            isShowPreview: false
        })
    },

    saveShop () {
        let drug = {
            ...this.data.drug,
            quantity: this.data.quantity
        }
        // 页面获取自定义组件实例
        let shopList = this.selectComponent('#shop-list'); 
        // 通过实例调用组件事件
        shopList.saveShop(drug); 

        this.onClosePreview()
    },

    // -----购物清单   
    onClickShopList () {
        this.setData({
            isShowShopList: true
        })
    },

    onChangeShopListLength (e) {
        this.setData({
            shopLength: e.detail.len
        })
    },


    onSubmit () {
        const that = this
        let shopList = storage.getList(key.SHOP_LIST)
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
            type: 2
        }).finally(res => {
            wx.navigateBack({
                delta: 2
            });
        })
    }
})