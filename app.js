// app.js
import { patientTabBar, doctorTabBar } from '/utils/tabBarUrl.js'
import storage from "./utils/storage";
import key from "./utils/key";
import message from "./utils/message";
import wxApi from "./api/wxApi";

App({
    onLaunch () {
        // 展示本地存储能力

        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
            }
        })

        wx.login({
            success (res) {
                console.log('微信登录返回值', res)

                // wxApi.setSessionkey({
                //     code: res.code
                // }).then(res => {
                //     console.log(res)
                // })
                storage.set(key.WX_CODE, res.code)
            }
        })



    },

    onShow (options) {

        const user = storage.get(key.USER)

        if (user === '') {
            message.info('未登录')
        } else {
            this.globalData.userRole = user.roleId
        }

        switch (this.globalData.userRole) {
            case 1:
                this.globalData.tabBarList = patientTabBar
                break;
            case 2:
                this.globalData.tabBarList = doctorTabBar
                break;
            default:
                break;
        }

    },

    globalData: {
        userRole: 1,
        tabBarList: [], // tabBar
    }
})
