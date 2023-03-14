import storage from "../../../../utils/storage";
import key from "../../../../utils/key";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressList = storage.getList(key.ADDRESS_LIST)
    this.setData({
        addressList: addressList
    })
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
    let addressList = storage.getList(key.ADDRESS_LIST)
    this.setData({
        addressList: addressList
    })
  },

  toInfo(e) {
    const {index} = e.currentTarget.dataset
    console.log(index)
    if(index == null || index == undefined ||index === '') {
        wx.navigateTo({
            url: '/pages/patient/me/area/info/info'
          })
      
    } else {
        
        wx.navigateTo({
            url: '/pages/patient/me/area/info/info?index='+index
          })
    }

  }
})