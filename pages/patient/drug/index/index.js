import drugApi from "../../../../api/drugApi"

Page({
    data: {
        array: ['全部','中成药', '中药饮片', '西药', '其他'],
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

        this.setData({
            search: this.search.bind(this)
        })

        this.searchDrugView();
    },

    onShow() {
        if(this.drugApi == []) {
            this.searchDrugView();
        }

    },


    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })

        let query = this.data.queryForm;
        query.classification = e.detail.value
        this.setData({queryForm: query})

        this.searchDrugView()
    },

    search: function (value) {
        const that = this

        return new Promise((resolve, reject) => {
            
            let query = this.data.queryForm;
            query.name = value
            this.setData({queryForm: query})
            this.searchDrugView()
            resolve([])
        })
    },
    
    doClear() {
        let query = this.data.queryForm;
        query.name = ''
        this.setData({queryForm: query})
        this.searchDrugView()
    },
    
    searchDrugView() {
        const that = this
        drugApi.pageDrugView(this.data.queryForm).then(res => {
            that.setData({
                drugList: res.data.records
            })
        })
    }
});


