import constant from "../../../../utils/constant";
import storage from "../../../../utils/storage";
import patientApi from "../../../../api/patientApi";

Page({
    data: {
        patientInfo: {},
        queryForm: {
            doctorUserId: null,
            patientId: null
        },
        state: 0
    },
    onLoad: function (options) {
        let id = storage.getCurrentUserId()
        let patientId = options.id

        this.setData({
            queryForm: {
                doctorUserId: id,
                patientId: patientId
            }
        })

        this.search()
    },

    search() {
        patientApi.getPatientByUserId(this.data.queryForm.patientId).then(res => {

            let info = res.data
            info.sex = constant.toSexName(info.sex)
            this.setData({
                patientInfo: info
            })
        })
    }
});
