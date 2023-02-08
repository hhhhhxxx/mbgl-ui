const app = getApp();

Page({
    data: {
        result: ''
    },
    onLoad: function (options) {

    },

    onShow: function () {


        this.setData({
            userRole: app.globalData.userRole,
        })


        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1,
                list: app.globalData.tabBarList
            })
        }
    }
});
