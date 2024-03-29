import doctorApi from '../../../api/doctorApi'
import storage from "../../../utils/storage";
import patientApi from "../../../api/patientApi";
import employeeApi from '../../../api/employeeApi'

Component({

    data: {
        doctorList: [],
        employeeList: [],
        queryForm: {
            pageIndex: 1,
            pageSize: 100,
            patientUserId: null,
        }
    },

    lifetimes: {
        attached: function () {

            let queryForm =  this.data.queryForm

            queryForm.patientUserId = storage.getCurrentUserId()

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
            doctorApi.getDoctorPage(this.data.queryForm).then(res=>{
                that.setData({
                    doctorList: res.data.records
                })
            })
            
            employeeApi.list().then(res=>{
                that.setData({
                    employeeList: res.data
                })
            })
        },

        toDoctorInfo (e) {
            let doctorId = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/patient/contact/info/info?id=${doctorId}`
            });
        },
    }
});
