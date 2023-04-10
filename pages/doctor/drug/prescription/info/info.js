import storage from "../../../../../utils/storage";
import key from "../../../../../utils/key";
import Toast from '@vant/weapp/toast/toast';
Page({
    /**
         * 页面的初始数据
         */
    data: {
        preItem: {},
        index: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let prescriptionList = storage.getList(key.PRESCRIPTION_LIST)

        let index = options.index

        let item = prescriptionList[index]

        this.setData({
            preItem: item,
            index: index
        })
    },

    formInputChange (e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`preItem.${field}`]: e.detail
        })
    },

    onSave () {
        let prescriptionList = storage.getList(key.PRESCRIPTION_LIST)
        let index = this.data.index

        let item = prescriptionList[index]

        item.name = this.data.preItem.name
        item.info = this.data.preItem.info

        prescriptionList[index] = item
        storage.set(key.PRESCRIPTION_LIST,prescriptionList)

                
        wx.navigateBack({
            delta: 1
        });
    },
    onDel() {
        let prescriptionList = storage.getList(key.PRESCRIPTION_LIST)
        let index = this.data.index

        let item = prescriptionList[index]

        
        prescriptionList = prescriptionList.filter((item,i) => i != index)

        storage.set(key.PRESCRIPTION_LIST,prescriptionList)
     
        // Toast("删除成功")

        wx.navigateBack({
            delta: 1
        });
    }
})