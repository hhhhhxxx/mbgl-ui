import storage from "../../../../utils/storage";
import key from "../../../../utils/key";
import constant from "../../../../utils/constant";
import doctorApi from '../../../../api/doctorApi'

Page({
    data: {
        doctorInfo: {}
    },
    onLoad: function (options) {
        // this.search()
    },

    onShow() {
        this.search()
    },

    search() {
        const user = storage.get(key.USER)

        const that = this

        doctorApi.getDoctorByUserId(user.id).then(res => {

            const info = res.data;

            info.sex = constant.toSexName(info.sex)

            that.setData({
                doctorInfo: info
            })
        })
    }
});
