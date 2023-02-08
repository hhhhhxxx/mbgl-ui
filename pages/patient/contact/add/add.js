import doctorApi from "../../../../api/doctorApi";

Page({
    data: {
        doctorList: [],
        queryForm: {
            key: '',
            pageIndex: 1,
            pageSize: 10
        }
    },
    onLoad: function (options) {
        this.setData({
            search: this.search.bind(this)
        })
        this.searchDoctor()
    },

    onShow() {
        if(this.data.queryForm.length < 1) {
            this.searchDoctor()
        }
    },

    searchDoctor() {
        const that = this
        doctorApi.getDoctorPage(this.data.queryForm).then(res => {
            that.setData({
                doctorList: res.response.records
            })
        })
    },


    search: function (value) {
        const that = this

        return new Promise((resolve, reject) => {

            let form = that.data.queryForm
            form.key = value
            that.setData({
                queryForm: form
            })
            that.searchDoctor()
            resolve([])
        })
    },

    toDoctorInfo (e) {
        let doctorId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/patient/contact/info/info?id=${doctorId}`
        });
    }
});
