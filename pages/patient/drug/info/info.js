import Toast from '@vant/weapp/toast/toast';
import drugApi from '../../../../api/drugApi'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drug: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDrugInfo(options.drugId)
  },

  getDrugInfo(id) {
    const that = this
    drugApi.getInfoById(id).then(res=>{
        this.setData({
            drug:  res.data
        })
    })
  },

  onClickIcon() {
    console.log('点击图标')
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
  },

  onClickButton() {
    console.log('点击按钮')
  }
})