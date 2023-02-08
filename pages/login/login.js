// index.js
import {patientTabBar, doctorTabBar} from '../../utils/tabBarUrl'

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
                rules: [{required: true, message: '请填写用户名'}, {minlength: 3, message: '太短'}]
            },
            {
                name: 'password',
                rules: {required: true, message: '请填写密码'},
            }
        ],
    },

    onLoad(query) {
    },

    formInputChange(e) {
        const {field} = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail.value
        })
    },

    submitForm() {

        const {username, password} = this.data.form


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

                    this.setRole(res.response.roleId)

                    storage.set(key.USER,res.response)
                }).catch(res => {
                    message.info('登录失败')
                })
            }
        })
    },

    setRole(roleId) {

        if(roleId === 1) {
            app.globalData.tabBarList = patientTabBar
            app.globalData.userRole = 1
        } else if(roleId === 2) {
            app.globalData.tabBarList = doctorTabBar
            app.globalData.userRole = 2
        }

        wx.switchTab({
            url: '/pages/tab1/tab1'
        })
    }
})
