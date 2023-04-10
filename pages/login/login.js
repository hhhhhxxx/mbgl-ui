// index.js
import { patientTabBar, doctorTabBar, employeeTabBar } from '../../utils/tabBarUrl'

import userApi from "../../api/userApi"
import message from "../../utils/message"
import storage from "../../utils/storage";
import key from "../../utils/key";

// 获取应用实例
const app = getApp()

Page({
    data: {
        form: {
            username: 'hhhhhx',
            password: '123123',
        },
        errorMsg: '', // 验证表单显示错误信息
        rules: [
            {
                name: 'username',
                rules: [{ required: true, message: '请填写用户名' }, { minlength: 3, message: '太短' }]
            },
            {
                name: 'password',
                rules: { required: true, message: '请填写密码' },
            }
        ],
    },

    onLoad (query) {
    },

    formInputChange (e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail.value
        })
    },

    submitForm () {

        const { username, password } = this.data.form


        this.selectComponent('#form').validate((valid, errors) => {
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        errorMsg: errors[firstError[0]].message
                    })
                }
            } else {
                const that = this

                // 登录请求
                userApi.login(this.data.form).then(res => {
                    message.success("登录成功")
                    console.log("这里")
                    this.setRole(res.data.roleId)

                    storage.set(key.USER, res.data)
                }).catch()
            }
        })
    },

    setRole (roleId) {

        if (roleId === 1) {
            app.globalData.tabBarList = patientTabBar

        } else if (roleId === 2) {
            app.globalData.tabBarList = doctorTabBar

        } else if (roleId === 3) {
            app.globalData.tabBarList = employeeTabBar

        }
        
        app.globalData.userRole = roleId

        wx.switchTab({
            url: '/pages/tab1/tab1'
        })
    },


    loginWeixin (e) {
        const that = this

        wx.login({
            success (res) {
                userApi.wxLogin({
                    code: res.code
                }).then(res => {
                    let user = res.data
                    message.success("登录成功")
                    that.setRole(res.data.roleId)
                    storage.set(key.USER, user)


                })
            }
        })
    }
})
