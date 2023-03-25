import Toast from '@vant/weapp/toast/toast';
import drugApi from '../../../../api/drugApi'
import calUtil from '../../../../utils/calUtil';
import key from '../../../../utils/key';
import storage from '../../../../utils/storage';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        drug: '',
        isShowPreview: false,
        isShowShopList: false,
        tempPrice: -1,
        quantity: 1,
        shopLength: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDrugInfo(options.drugId)
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

        if (this.data.drug.prescription == 1) {
            Toast('处方药无法直接购买，请联系医生');
        } else {
            this.setData({
                isShowPreview: true
            })
        }
    },

    onClosePreview () {

        this.setData({
            isShowPreview: false
        })


    },

    // -----购物清单   


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
    
        onChangeShopListLength(e) {
            this.setData({
                shopLength: e.detail.len
            })
        },


    onSubmit () {
        wx.navigateTo({
            url: '/pages/patient/drug/pay/pay',
        })
    }
})