const app = getApp();

Page({
    data: {},
    onLoad: function (options) {

    },
    onShow: function () {
        this.setData({
            userRole: app.globalData.userRole,
        })


        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3,
                list: app.globalData.tabBarList
            })
        }
    }
});
