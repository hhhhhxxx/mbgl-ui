import doctorApi from '../../../api/doctorApi'
import storage from "../../../utils/storage";
import patientApi from "../../../api/patientApi";

Component({

    options: {
        styleIsolation: 'apply-shared'
    },

    data: {
        patientList: [],
        queryForm: {
            pageIndex: 1,
            pageSize: 10,
            doctorUserId: null,
        }
    },

    lifetimes: {
        attached: function () {

            let queryForm =  this.data.queryForm

            queryForm.doctorUserId = storage.getCurrentUserId()

            this.setData({
                queryForm: queryForm
            })

            this.search()
        },
    },

    pageLifetimes: {
        show: function () {
            this.search()
        }
    },

    methods: {
        search () {
            const that = this
            patientApi.getPatientPage(this.data.queryForm).then(res=>{
                that.setData({
                    patientList: res.data.records
                })
            })

        },

        toPatientInfo (e) {
            let patientId = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/doctor/contact/info/info?id=${patientId}`
            });
        },
    }
});
