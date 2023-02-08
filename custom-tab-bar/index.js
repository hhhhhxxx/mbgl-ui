Component({
    data: {
        color: "#7A7E83",
        selectedColor: "#4fa3d3",
        selected: null,
        list: []
    },
    created () {
    },
    attached () {
        const app = getApp();
        this.setData({
            list: app.globalData.tabBarList
        })
        // console.log("custom tab: 给list赋值",this.data.list)
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({url})
          }
    }
})