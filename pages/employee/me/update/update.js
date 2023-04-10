import constant from "../../../../utils/constant";
import message from "../../../../utils/message";
import employeeApi from "../../../../api/employeeApi"
import storage from "../../../../utils/storage";
import key from "../../../../utils/key";

Page({
    data: {
        sexItems: [
            {name: '男', value: constant.male, checked: true},
            {name: '女', value: constant.female}
        ],

        field: null,

        form: {
            id: null,
            name: null,
            age: null,
            sex: null,
            phone: null
        },

        rules: [{
            name: 'sex',
            rules: {required: false, message: '性别是必选项'},
        }, {
            name: 'name',
            rules: {required: true, message: '请输入姓名'},
        }, {
            name: 'age',
            rules: [{required: true, message: '请输入年龄'}, {range: [0, 130], message: '年龄超出范围'},]
        }, {
            name: 'phone',
            rules: [{required: true, message: '请输入手机号'}, {mobile: true, message: '手机号格式不会'}],
        }]
    },
    onLoad: function (options) {
        const user = storage.get(key.USER)
        let temp = this.data.form
        temp.id = user.id;
        this.setData({
            form: temp,
            field: options.field
        })

        const field = this.data.field
        employeeApi.getEmployeeByUserId(user.id).then(res => {
            this.setData({
                [`form.${field}`]: res.data[`${field}`]
            })

            if (field == 'sex') {
                const sexItems = this.data.sexItems;
                for (var i = 0, len = sexItems.length; i < len; ++i) {
                    sexItems[i].checked = sexItems[i].value == this.data.form.sex;
                    console.log(sexItems[i].checked)
                }

                this.setData({
                    sexItems: sexItems,
                    [`form.sex`]: this.data.form.sex
                });
            }
        })


    },

    formInputChange(e) {
        const {field} = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail.value
        })
    },

    sexChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var sexItems = this.data.sexItems;
        for (var i = 0, len = sexItems.length; i < len; ++i) {
            sexItems[i].checked = sexItems[i].value == e.detail.value;
        }

        this.setData({
            sexItems: sexItems,
            [`form.sex`]: e.detail.value
        });
    },

    submitForm() {
        this.selectComponent('#form').validateField(this.data.field, (valid, errors) => {
            console.log('valid', valid, errors)
            if (!valid) {
                message.error(errors.message)
            } else {

                console.log(this.data.form)

                employeeApi.updateEmployee(this.data.form).then(res => {
                    message.success('成功提交')

                    wx.navigateBack({
                        url: '/pages/employee/me/info/info'
                    })
                }).catch()


            }
        })
    }
});
