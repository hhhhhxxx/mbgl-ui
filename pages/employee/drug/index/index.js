import drugApi from "../../../../api/drugApi"
import calUtil from '../../../../utils/calUtil'
import key from '../../../../utils/key'
import storage from '../../../../utils/storage'
import messageApi from '../../../../api/messageApi'

Component({
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
        },
    },
    lifetimes: {
        attached: function () {    
            this.searchDrugView();
        },
    },

    pageLifetimes: {
        show: function () {
            if (this.drugApi == []) {
                this.searchDrugView();
            }
        }
    },

    methods: {
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
    
        onChangeShopListLength(e) {
            this.setData({
                shopLength: e.detail.len
            })
        },
    
        onSubmit() {
            
            const that = this
            let shopList = storage.getList(key.SHOP_LIST)
            let plainList = shopList.map(e => {
                return { 
                    id: e.id, 
                    quantity: e.quantity 
                }
            })
    
            messageApi.send({
                shopList: plainList,
                content: "_P",
                sendUserId: storage.getCurrentUserId(),
                receiveUserId: that.data.patientId,
                type: 2
            }).finally(res=>{
                wx.navigateBack({
                    delta: 1
                });
            })
        }
    }

});


