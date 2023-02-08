import patientApi from "../../../../api/patientApi";
import storage from "../../../../utils/storage";
import key from "../../../../utils/key";
import constant from "../../../../utils/constant";

Page({
    data: {
        patientInfo: {}
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

        patientApi.getPatientByUserId(user.id).then(res => {

            const info = res.response;

            info.sex = constant.toSexName(info.sex)

            that.setData({
                patientInfo: info
            })
        })
    }
});
