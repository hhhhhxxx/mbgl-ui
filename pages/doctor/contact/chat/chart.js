import message from "../../../../utils/message";
import storage from "../../../../utils/storage";
import messageApi from "../../../../api/messageApi";

var socket = null;

Page({
    data: {
        chatList: [],
        scrollTop: 0,
        InputBottom: 0,
        content: '',
        form: {
            sendUserId: '',
            receiveUserId: '',
            pageSize: 7,
        },

        rules: [{
            name: 'content',
            rules: { required: true, message: '输入不能为空' },
        }],
        isLoad: false,
        upTimer: null
    },
    onLoad: function (options) {

        let meId = storage.getCurrentUserId()

        let varForm = this.data.form

        varForm.sendUserId = meId
        varForm.receiveUserId = options.taId

        this.setData({
            form: varForm
        })

        const that = this

        // this.data.timer = setInterval(() => {
        //     that.getAfterChatList();
        // }, 8000)


        socket = wx.connectSocket({
            url: 'ws://localhost:8080/mbgl/chat/' + meId,
            success: res => {
                console.info('创建连接成功');
            }
        })

        socket.onOpen(function () {
            console.info('连接打开成功');
        });
        socket.onClose(function () {
            console.info('连接关闭成功');
        });
        socket.onError(function () {
            console.info('连接报错');
        });
        //服务器发送监听
        socket.onMessage(function (e) {
            console.info(e.data);

            var newMessage = JSON.parse(e.data);

            let list = [...that.data.chatList, newMessage]

            that.setData({
                chatList: list
            })
        });

    },




    onUnload () {
        clearInterval(this.data.timer)
    },

    onShow: function (options) {
        this.getChatList()
        wx.createSelectorQuery().select('#cu-chat').boundingClientRect(function (rect) {
            // 使页面滚动到底部
            console.log(rect)
            wx.pageScrollTo({
                scrollTop: rect.height - 80
            })
        }).exec()
    },

    getChatList () {

        const that = this
        let beforeForm = that.data.form

        if (that.data.chatList.length > 1) {
            beforeForm.targetTime = that.data.chatList[0].createTime
        }

        messageApi.getBefore(beforeForm).then(res => {

            res.data.forEach(element => {
                if(element.type == 2) {
                    element.content = JSON.parse(element.content)
                }
            });

            let list = [...res.data, ...this.data.chatList]

            that.setData({
                chatList: list
            })
        })
    },


    // 输入提高
    InputFocus (e) {
        this.setData({
            InputBottom: e.detail.height
        })
    },
    InputBlur (e) {
        this.setData({
            InputBottom: 0
        })
    },

    formInputChange (e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            content: e.detail.value
        })
    },
    submitForm () {
        const that = this

        if (that.data.content != '') {
            messageApi.send({
                content: that.data.content,
                sendUserId: that.data.form.sendUserId,
                receiveUserId: that.data.form.receiveUserId,
                type: 1
            }).then(res => {

                that.setData({
                    content: ''
                })

                wx.createSelectorQuery().select('#cu-chat').boundingClientRect(function (rect) {
                    // 使页面滚动到底部
                    console.log(rect)
                    wx.pageScrollTo({
                        scrollTop: rect.height - 80
                    })
                }).exec()
            }).catch(() => {
                message.info('发送失败')
            })
        } else {
            message.error('输入为空')
        }

    },

    onPullDownRefresh () {
        const that = this
        // 上拉刷新
        console.log(that.data.isLoad)
        if (!that.loading) {

            this.setData({
                isLoad: true
            })


            let beforeForm = that.data.form

            if (that.data.chatList.length > 1) {
                beforeForm.targetTime = that.data.chatList[0].createTime
            }
            messageApi.getBefore(beforeForm).then(res => {
                // 处方
                res.data.forEach(element => {
                    if(element.type == 2) {
                        element.content = JSON.parse(element.content)
                    }
                });

                let list = [...res.data, ...this.data.chatList]

                that.setData({
                    chatList: list
                })

                let do1 = () => {
                    wx.stopPullDownRefresh()
                    that.setData({
                        chatList: list,
                        isLoad: false
                    })
                }

                setTimeout(do1, 450)

            })
        }
    },

    

    toDrug() {
        wx.navigateTo({
            url: `/pages/doctor/drug/index/index?patientId=${this.data.form.receiveUserId}`
        });
    }
});