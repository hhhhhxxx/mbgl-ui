import calUtil from '../../utils/calUtil'
import key from '../../utils/key'
import storage from '../../utils/storage'

Component({
    data: {
        shopList: [],
        total: 0,
    },
    properties: {
        show: {
            tpye: Boolean,
            value: false
        }
    },
    methods: {
        loadShopList () {
            let shopList = storage.getList(key.SHOP_LIST)
            let total = 0

            shopList.forEach(element => {
                total = calUtil.calAdd(total, calUtil.calMul(element.price, element.quantity))
            });

            this.onChangeShopListLength(shopList.length)
            
            this.setData({
                shopList: shopList,
                total: total
            })
        },
        onCloseShopList () {
            storage.set(key.SHOP_LIST, this.data.shopList)
            this.setData({
                show: false
            })
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
                this.onChangeShopListLength(shopList.length)
            }

            this.setData({
                shopList: shopList,
                total: total
            })
            storage.set(key.SHOP_LIST, shopList)
        },

        saveShop (drug) {
            let shopList = this.data.shopList
            let total = this.data.total

            let flag = true
    
            for (let i = 0; i < shopList.length; i++) {
                if (drug.id == shopList[i].id) {
                    console.log(shopList[i].quantity + drug.quantity)
                    shopList[i].quantity = shopList[i].quantity + drug.quantity
                    shopList[i].tempPrice = calUtil.calMul(calUtil.calDiv(shopList[i].price, 100), shopList[i].quantity)
                    flag = false
                    break;
                }
            }
    
            if (flag) {
                shopList.push({
                    ...drug,
                    tempPrice: calUtil.calMul(calUtil.calDiv(drug.price, 100), drug.quantity),
                    quantity: drug.quantity
                })
                this.onChangeShopListLength(shopList.length)
            }

            total = total + calUtil.calMul(drug.quantity, drug.price)

            this.setData({
                shopList: shopList,
                total: total
            })
            storage.set(key.SHOP_LIST, shopList)
        },

        onChangeShopListLength(len) {
            this.triggerEvent('change', {len})    
        },
        onSubmit() {
            this.triggerEvent('submit')    
        }
    },

    lifetimes: {
        created () {
        },
        attached(){
            console.log('attached');
            // this.loadShopList()
        }
    },
    pageLifetimes:{
        show:function(){
            this.loadShopList() 
        }
    }
})