import noticeApi from "../../../../api/noticeApi";
import storage from "../../../../utils/storage";
import key from "../../../../utils/key";
import constant from "../../../../utils/constant";
import connectApi from "../../../../api/connectApi";

Page({
    data: {
        queryForm: {
            pageIndex: 1,
            pageSize: 10,
            userId: null,
            state: 0
        },

        noticeList: [],
        noticeType: {}
    },
    onLoad: function (options) {

        const user = storage.get(key.USER)
        const form = this.data.queryForm

        form.userId = user.id

        const noticeType = constant.NoticeType

        this.setData({
            queryForm: form,
            noticeType: noticeType
        })

        this.search()
    },

    onShow() {

        if(this.data.noticeList.length < 1 ) {
            this.search()
        }

    },

    search() {

        noticeApi.pageList(this.data.queryForm).then(res=>{
            this.setData({
                noticeList: res.response.records
            })
        })
    },

    delete(e) {
        const {id} = e.currentTarget.dataset

        noticeApi.delelte(id).then((res)=>{
            this.search()
        })
    }
});
