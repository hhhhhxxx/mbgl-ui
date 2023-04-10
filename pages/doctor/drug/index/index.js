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
        patientId: null,
        isShowPreview: false,
        isShowShopList: false,
        shopLength: 0,
    },
    onLoad: function (options) {
        this.setData({
            patientId: options.patientId
        })

        this.searchDrugView();
        const that = this
        drugApi.typeList().then(res => {
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

    onChangeShopListLength (e) {
        this.setData({
            shopLength: e.detail.len
        })
    },

    onSubmit () {

        const that = this
        let shopList = storage.getList(key.SHOP_LIST)

        let preList = storage.getList(key.PRESCRIPTION_LIST);

        preList.push({
            shopList: shopList,
            info: "",
            name: "处方"+(preList.length+1)
        })
        

        storage.set(key.PRESCRIPTION_LIST,preList);
        
        wx.navigateBack({
            delta: 1
        });

    }

});


