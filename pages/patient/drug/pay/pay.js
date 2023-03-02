import calUtil from '../../../../utils/calUtil';
import key from '../../../../utils/key';
import storage from '../../../../utils/storage';

Page({
    data: {
        shopList: [],
        total: 0
    },
    onLoad: function (options) {
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

    onChangeShopListItemNum(e) {

        let shopList = this.data.shopList;
        let index = e.target.dataset.index
        shopList[index].quantity = e.detail
        shopList[index].tempPrice = calUtil.calMul(calUtil.calDiv(shopList[index].price,100),e.detail) 
        this.setData({
            shopList: shopList
        })
        console.log(e.detail);
    },

    
    onSubmit() {
        console.log('付款成功')
    }
})