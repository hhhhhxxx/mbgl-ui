import key from '../../../../utils/key';
import storage from '../../../../utils/storage';
import orderApi from '../../../../api/orderApi'
import calUtil from '../../../../utils/calUtil';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDTOList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = storage.getCurrentUserId()
    this.getOrderDTOList(id)
  },

  toInfo(e) {
    wx.navigateTo({
        url: '/pages/patient/drug/order/info/info?id='+e.currentTarget.dataset.id,
      })
  },

  getOrderDTOList(id) {
    const that = this
    orderApi.getOrderDTOList(id).then(res=>{       
        
        let list = res.data
        
        list.forEach(element => {

            element.orderItemList.forEach(e2=>{
                e2.price= calUtil.calDiv(e2.price,100.0)
            })

            element.cost = calUtil.calDiv(element.cost,100.0)
        });

        that.setData({
            orderDTOList: res.data
        })
    })
  }
})