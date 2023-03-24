import doctorApi from '../../../../api/doctorApi'
import constant from "../../../../utils/constant";
import connectApi from "../../../../api/connectApi";
import storage from "../../../../utils/storage";
import key from "../../../../utils/key";
import message from "../../../../utils/message";

Page({
    data: {
        doctorInfo: {},
        queryForm: {
            patientUserId: null,
            doctorId: null
        },
        state: 0
    },
    onLoad: function (options) {
        let {id} = storage.get(key.USER)
        let doctorId = options.id

        this.setData({
            queryForm: {
                patientUserId: id,
                doctorId: doctorId
            }
        })

        this.search()
        this.getState()
    },

    search() {
        doctorApi.getDoctorByUserId(this.data.queryForm.doctorId).then(res => {

            let info = res.data
            info.sex = constant.toSexName(info.sex)
            this.setData({
                doctorInfo: info
            })
        })
    },

    getState() {
        connectApi.state(this.data.queryForm).then(res => {
            this.setData({
                state: res.data
            })
        })
    },

    subscribe() {

        connectApi.apply(this.data.queryForm).then(res => {
            this.getState()
        }).catch(res => {
            message.error(res.message)
        })
    },

    takeOff() {
        connectApi.disconnect(this.data.queryForm).then(res => {
            message.error(res.message)
            this.getState()
        }).catch(res => {
            message.error(res.message)
        })
    }
});
