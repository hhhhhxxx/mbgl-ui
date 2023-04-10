import drugApi from "../../../../api/drugApi"
import calUtil from '../../../../utils/calUtil'
import key from '../../../../utils/key'
import storage from '../../../../utils/storage'

Page({
    data: {
        active: 0,
        array: [],

        index: 0,
        drugList: [],
        queryForm: {
            pageIndex: 1,
            pageSize: 10,
            classification: '',
            name: ''
        },
        isShowShopList: false,
        shopLength: 0
    },
    onLoad: function (options) {
        this.searchDrugView();
        const that = this
        drugApi.typeList().then(res=>{
            console.log(res)
            that.setData({
                array: res.data
            })
        })
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
            isShowShopList: true
        })
    },

    onChangeShopListLength(e) {
        this.setData({
            shopLength: e.detail.len
        })
    },
    
    onSubmit() {
        wx.navigateTo({
            url: '/pages/patient/drug/pay/pay',
          })
    }
});


