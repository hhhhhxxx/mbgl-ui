import message from "../../../../utils/message";
import recordApi from "../../../../api/recordApi";
import storage from "../../../../utils/storage";
import messageApi from "../../../../api/messageApi";

Page({
    data: {
        chatList: [],
        scrollTop: 0,
        form: {
            sendUserId: '',
            receiveUserId: '',
            content: '',
            pageSize: 9,
        },

        rules: [{
            name: 'content',
            rules: {required: true, message: '输入不能为空'},
        }],
        timer: null,
        upTimer: null,
        lowTimer: null
    },
    onLoad: function (options) {

        let meId = storage.getCurrentUserId()

        let varForm = this.data.form

        varForm.sendUserId = meId
        varForm.receiveUserId = options.taId,

        this.setData({
            form: varForm
        })

        const that = this

        this.data.timer = setInterval(()=>{
            that.getAfterChatList();
        },8000)
    },

    onUnload() {
      clearInterval(this.data.timer)
    },

    onShow: function (options) {
        this.getChatList()
    },

    getChatList() {

        const that = this

        let beforeForm = that.data.form

        if(that.data.chatList.length > 1) {
            beforeForm.targetTime = that.data.chatList[0].createTime
        }

        messageApi.getBefore(beforeForm).then(res => {

            let list = [...res.response,...this.data.chatList]

            that.setData({
                chatList: list
            })
        })
    },

    getAfterChatList() {

        const that = this

        let afterForm = that.data.form

        let len = that.data.chatList.length

        if(len > 0) {
            afterForm.targetTime = that.data.chatList[len-1].createTime
        }

        messageApi.getAfter(afterForm).then(res => {
            let list = [...this.data.chatList,...res.response,]
            that.setData({
                chatList: list,
                scrollTop: list.length * 415
            })


        })

    },

    formInputChange(e) {
        const {field} = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail.value
        })
    },

    submitForm() {

        const that = this

        this.selectComponent('#form').validateField('content', (valid, errors) => {
            console.log('valid', valid, errors)
            if (!valid) {
                message.error(errors.message)
            } else {
                messageApi.send({
                    content: that.data.form.content,
                    sendUserId: that.data.form.sendUserId,
                    receiveUserId: that.data.form.receiveUserId
                }).then(res => {

                    let varForm = that.data.form
                    varForm.content = ''
                    that.setData({
                        form: varForm
                    })
                    this.getAfterChatList()
                }).catch(() => {
                        message.info('发送失败')
                    })
            }
        })
    },
    upper(e) {
        console.log(e)

        clearTimeout(this.data.upTimer)
        this.data.upTimer = setTimeout(this.getChatList,1500)
    },

    lower(e) {

        clearTimeout(this.data.lowTimer)
        this.data.lowTimer = setTimeout(this.getAfterChatList,1500)
        console.log(e)
    }
});

