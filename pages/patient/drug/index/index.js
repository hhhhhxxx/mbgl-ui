import drugApi from "../../../../api/drugApi"

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
        }
    },
    onLoad: function (options) {
        this.searchDrugView();
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
        console.log(4234)
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
    }
});


