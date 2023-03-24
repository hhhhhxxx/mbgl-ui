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
        shopList: [],
        total: 0,
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

    // -----购物清单   
    onClickShopList () {
        this.setData({
            isShwoShopList: true
        })


        let shopList = storage.getList(key.SHOP_LIST)
        let total = 0


        shopList.forEach(element => {
            total = calUtil.calAdd(total, calUtil.calMul(element.price, element.quantity))
        });
        console.log(total)
        this.setData({
            shopList: shopList,
            total: total
        })
    },

    onCloseShopList () {
        this.setData({
            isShwoShopList: false
        })
        storage.set(key.SHOP_LIST, this.data.shopList)
    },

    saveShop () {
        let shopList = storage.getList(key.SHOP_LIST)

        let flag = true

        for (let i = 0; i < shopList.length; i++) {
            if (this.data.drug.id == shopList[i].id) {
                console.log(shopList[i].quantity + this.data.quantity)
                shopList[i].quantity = shopList[i].quantity + this.data.quantity
                shopList[i].tempPrice = calUtil.calMul(calUtil.calDiv(shopList[i].price, 100), shopList[i].quantity)
                flag = false
                break;
            }
        }

        if (flag) {
            shopList.push({
                ...this.data.drug,
                tempPrice: calUtil.calMul(calUtil.calDiv(this.data.drug.price, 100), this.data.quantity),
                quantity: this.data.quantity
            })
        }
        storage.set(key.SHOP_LIST, shopList)
        this.onClosePreview()

    },

    onChangeShopListItemNum (e) {

        let index = e.target.dataset.index
        let total = this.data.total
        let shopList = this.data.shopList;

        total = total - calUtil.calMul(shopList[index].quantity, shopList[index].price)
        shopList[index].quantity = e.detail
        shopList[index].tempPrice = calUtil.calMul(calUtil.calDiv(shopList[index].price, 100), e.detail)
        total = total + calUtil.calMul(shopList[index].quantity, shopList[index].price)


        if (e.detail == 0) {
            shopList.splice(index, 1)
        }

        this.setData({
            shopList: shopList,
            total: total
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
        }).finally(res=>{
            wx.navigateBack({
                delta: 2
            });
        })
    }
})