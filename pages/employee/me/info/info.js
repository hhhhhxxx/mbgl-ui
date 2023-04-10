import storage from "../../../../utils/storage";
import key from "../../../../utils/key";
import constant from "../../../../utils/constant";
import employeeApi from '../../../../api/employeeApi'

Page({
    data: {
        employeeInfo: {}
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

        employeeApi.getEmployeeByUserId(user.id).then(res => {

            const info = res.data;

            info.sex = constant.toSexName(info.sex)

            that.setData({
                employeeInfo: info
            })
        })
    }
});
