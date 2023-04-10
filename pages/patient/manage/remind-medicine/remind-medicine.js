import wxApi from '../../../../api/wxApi'
import key from '../../../../utils/key';
import storage from '../../../../utils/storage';
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
        form: {
            userId: null,
            drugName: '',
            advice: '',
            num: '',
            info: '',
            time: new Date().getTime()
        },
        minDate: new Date().getTime(),
        maxDate: new Date(2023, 10, 1).getTime(),
        show: false,
        date: ''
    },
    onLoad: function (options) {
        this.setData({
            form: {
                userId: storage.getCurrentUserId()
            }
        })
    },

    onShow () {
        let form = this.data.form
        form.time = new Date().getTime()
        this.setData({
            form: form,
            minDate: new Date().getTime(),
            maxDate: new Date(2023, 10, 1).getTime(),
        })
    },

    onclick () {
        const that = this
        wx.requestSubscribeMessage({
            tmplIds: [
                'EfZDuJ1O5KfT7gqW9kb3upmkVUaYk0csck3_cJlrzto'
            ],
            success (res) {
                wxApi.sendMessage(that.data.form).then(res => {
                    console.log(res.data)
                    Toast.success('设置成功');
                })
            },
            fail (err) {
                console.log('err', err)
            }
        })
    },

    formInputChange (e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`form.${field}`]: e.detail
        })

        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
                "H+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }


        if (field == 'time') {
            let date = new Date(e.detail).format("yyyy-MM-dd HH:mm:ss");
            this.setData({
                date: date
            })

        }
    },
    onShowTimePicker () {
        this.setData({
            show: true
        })
    },

    onCloseTimePicker () {
        this.setData({
            show: false
        })
    },
    formatter1: function (type, value) {
        if (type === 'year') {
            return value + '年'
        } else if (type === 'month') {
            return value + '月'
        } else if (type === 'day') {
            return value + '日'
        } else if (type === 'hour') {
            return value + '时'
        } else if (type === 'minute') {
            return value + '分'
        } else if (type === 'second') {
            return value + '秒'
        }
        return value
    }
});
