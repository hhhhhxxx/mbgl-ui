import noticeApi from "../../../../api/noticeApi";
import storage from "../../../../utils/storage";
import key from "../../../../utils/key";
import constant from "../../../../utils/constant";

Page({
    data: {
        queryForm: {
            pageIndex: 1,
            pageSize: 10,
            userId: null,
            state: 0
        },


        noticeList: []
    },
    onLoad: function (options) {

        const user = storage.get(key.USER)
        const form = this.data.queryForm

        form.userId = user.id

        this.setData({
            queryForm: form
        })

        this.search()


        const noticeType = constant.NoticeType
        this.setData({
            queryForm: form,
            noticeType: noticeType
        })
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

    confirm(e) {
        const {id} = e.currentTarget.dataset

        const op = constant.NoticeOption.CONFIRM

        noticeApi.option({
            id: id,
            option: op
        }).then(res =>{
            this.search()
        })


    },

    refuse(e) {
        const {id} = e.currentTarget.dataset

        const op = constant.NoticeOption.REFUSED

        noticeApi.option({
            id: id,
            option: op
        }).then(res =>{
            this.search()
        })
    },

    delete(e) {
        const {id} = e.currentTarget.dataset

        noticeApi.delelte(id).then((res)=>{
            this.search()
        })
    }
});
