import drugApi from "../../../../api/drugApi"
import calUtil from '../../../../utils/calUtil'
import key from '../../../../utils/key'
import storage from '../../../../utils/storage'
import messageApi from '../../../../api/messageApi'

Page({
    data: {
        active: 0,
        array: ['全部', '中成药', '中药饮片', '西药', '其他'],
        index: 0,
        drugList: [],
        queryForm: {
            pageIndex: 1,
            pageSize: 10,
            classification: '',
            name: ''
        },
        isShowPreview: false,
        isShwoShopList: false,
        shopList: [],
        total: 0,
        patientId: null
    },
    onLoad: function (options) {
        this.setData({
            patientId: options.patientId
        })

        this.searchDrugView();
        this.loadShopList()
    },

    onShow () {
        if (this.drugApi == []) {
            this.searchDrugView();
        }
    },


    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })

        let query = this.data.queryForm;
        query.classification = e.detail.value
        this.setData({ queryForm: query })

        this.searchDrugView()
    },

    onChange (e) {
        let query = this.data.queryForm;
        query.name = e.detail
        this.setData({
            queryForm: query,
        });
    },

    onSearch () {
        const that = this
        this.searchDrugView()
    },
    onClear () {
        let query = this.data.queryForm;
        query.name = ''
        this.setData({ 
            queryForm: query 
        })
        this.searchDrugView()
    },

    searchDrugView () {
        const that = this
        drugApi.pageDrugView(this.data.queryForm).then(res => {
            that.setData({
                drugList: res.data.records
            })
        })
    },

    onChangeTag (event) {
        let query = this.data.queryForm;
        query.classification = event.detail.name
        this.setData({ queryForm: query })
        this.searchDrugView()
    },

    // -----购物清单   
    onClickShopList () {
        this.setData({
            isShwoShopList: true
        })
        this.loadShopList()
    },

    loadShopList() {

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

    onChangeShopListItemNum(e) {

        let index = e.target.dataset.index
        let total = this.data.total
        let shopList = this.data.shopList;
        
        total = total - calUtil.calMul(shopList[index].quantity,shopList[index].price)
        shopList[index].quantity = e.detail
        shopList[index].tempPrice = calUtil.calMul(calUtil.calDiv(shopList[index].price, 100), e.detail)
        total = total + calUtil.calMul(shopList[index].quantity,shopList[index].price)

        
        if(e.detail == 0) {
            shopList.splice(index,1)
        }
        
        this.setData({
            shopList: shopList,
            total: total
        })
    },

    onSubmit() {
        
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
                delta: 1
            });
        })
    },

    onDeleteItem() {
        let index = e.currentTarget.dataset.index
    }
});


