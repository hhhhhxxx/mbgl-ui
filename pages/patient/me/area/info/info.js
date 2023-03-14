import { areaList } from '@vant/area-data';
import Toast from '@vant/weapp/toast/toast';
import key from '../../../../../utils/key';
import storage from '../../../../../utils/storage';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        areaList: areaList,
        isShowArea: false,
        index: '',
        addressParam: {
            name: '',
            phone: '',
            address: '',
            area: '',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.index != undefined && options.index != null) {
            let list = storage.getList(key.ADDRESS_LIST)
            let index = options.index
            this.setData({
                index: index,
                addressParam: list[index]
            })
        } else {

        }
    },

    formInputChange (e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`addressParam.${field}`]: e.detail
        })
    },

    onConfirmArea (e) {
        console.log(e.detail)

        let list = e.detail.values

        let areaText = ""
        list.forEach(e => {
            areaText += e.name
        })

        this.setData({
            isShowArea: false,
            [`addressParam.area`]: areaText
        })
    },

    onSave () {
        let param = this.data.addressParam

        if (param.name == '' || param.phone == '' || param.area == '' || param.address == '') {
            Toast('请输入完全');
        } else {
            let list = storage.getList(key.ADDRESS_LIST)
            if (this.data.index !== '') {
                list[this.data.index] = param
            } else {
                list.push(param)
            }
            storage.set(key.ADDRESS_LIST, list)
            wx.navigateBack({
                delta: 1
            });
        }
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
})