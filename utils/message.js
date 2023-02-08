
export default {
    success: (message) => baseMessage(message,"success"),
    error: (message) => baseMessage(message,"none"),
    info: (message) => baseMessage(message,"none")
}


const baseMessage = (message,type) => {
    wx.showToast({
        title: message,  //标题
        icon: type,
        duration: 2000
    })
}


