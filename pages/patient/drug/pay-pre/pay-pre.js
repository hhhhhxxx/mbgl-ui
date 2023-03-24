import calUtil from '../../../../utils/calUtil';
import key from '../../../../utils/key';
import storage from '../../../../utils/storage';
import { areaList } from '@vant/area-data';
import orderApi from '../../../../api/orderApi'
import drugApi from '../../../../api/drugApi';

Page({
    data: {
        shopList: [],
        total: 0,
        areaList: areaList,
        isShowArea: false,
        addressParam: {
            name: '',
            phone: '',
            address: '',
            area: '',
        },
        option1: [],
        addressIndex: 0,
    },
    onLoad: function (options) {
        let addressList = storage.getList(key.ADDRESS_LIST)
        if (addressList != [] && addressList.length > 0) {

            let op = addressList.map((e, i) => {
                return {
                    text: e.name + " " + e.phone,
                    value: i
                }
            })

            this.setData({
                addressList: addressList,
                addressIndex: 0,
                addressParam: addressList[0],
                option1: op
            })
        }

        this.setData({
            preId: Number(options.id)
        })
        this.loadShopList(options.id)
    },

    loadShopList (preid) {
        const that = this
        drugApi.getPreShopList(preid).then(res=>{

            let shopList = res.data
            let total = 0
    
            shopList.forEach(element => {
                total = calUtil.calAdd(total, calUtil.calMul(element.price, element.quantity))
                // 新增用于价格展示的字段
                element.tempPrice = calUtil.calMul(calUtil.calDiv(element.price, 100), element.quantity)
            });

            that.setData({
                shopList: shopList,
                total: total
            })

        })

       
    },

    onSubmit () {
        console.log('付款成功')
    },

    onClickArea () {
        this.setData({
            isShowArea: true
        })
    },

    onCancelArea () {
        this.setData({
            isShowArea: false
        })
    },

    onConfirmArea (e) {
        console.log(e.detail)

        let list = e.detail.values

        let areaText = ""
        list.forEach(e => {
            areaText += e.name
        })

        let op = this.data.orderParam
        op.area = areaText
        this.setData({
            isShowArea: false,
            orderParam: op
        })
    },

    onChangeOption (e) {
        let index = e.detail
        this.setData({
            addressParam: this.data.addressList[index]
        })
        console.log(e)
    },

    onSubmit () {

        let shopList = this.data.shopList

        let plainList = shopList.map(e => {
            return { 
                id: e.id, 
                quantity: e.quantity 
            }
        })
        
        let query = {
            userId: storage.getCurrentUserId(),
            shopList: plainList,
            addressParam: this.data.addressParam,
            preId: this.data.preId
        }

        orderApi.prePay(query).then(res=>{
            wx.navigateTo({
                url: '/pages/patient/drug/order/order',
              })       
        })

    }
})