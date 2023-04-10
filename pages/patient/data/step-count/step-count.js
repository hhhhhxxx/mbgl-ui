import wxApi from "../../../../api/wxApi";
import message from "../../../../utils/message";
import recordApi from "../../../../api/recordApi";


import * as echarts from '../../../../ec-canvas/echarts';
import storage from "../../../../utils/storage";

Page({
    data: {
        wxStep: '',

        ec: {
            onInit: initChart
        }
    },
    onLoad: function (options) {

        recordApi.getWeekData({
            type: 2,
            pageIndex: 1,
            pageSize: 7
        }).then(res=>{

            xList = res.data.x
            y1List= res.data.y1

            this.setData({
                ec: {
                    onInit: initChart
                }
            })

        }).catch()

    },

    getWxStep() {
        const that = this
        wx.getWeRunData({
            success(res) {
                console.log('微信步数', res)

                wxApi.getNowStep({
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    userId: storage.getCurrentUserId()
                }).then(res => {
                    console.log(res)

                    that.setData({
                        wxStep: res.data
                    })

                    wx.showModal({
                        title: '提示',
                        content: '今日微信步数：'+that.data.wxStep+' 是否上传',
                        success (res) {
                            if (res.confirm) {

                                recordApi.addRecord({
                                    stepCount: that.data.wxStep
                                }).then(res=>{
                                    message.success('上传成功')
                                })

                            } else if (res.cancel) {
                                message.info('已取消')
                            }
                        }
                    })

                })
            }
        })
    }
});

let xList = []
let y1List = []
let y2List = []

function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });



    canvas.setChart(chart);

    var option = {
        title: {
            text: '最近七次数据记录',
            left: 'center'
        },
        legend: {
            data: ['步数'],
            top: 50,
            left: 'center',
            z: 100
        },
        grid: {
            containLabel: true
        },
        tooltip: {
            show: true,
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xList,
            // show: false
        },
        yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
            // show: false
        },
        series: [{
            name: '步数',
            type: 'line',
            smooth: true,
            data: y1List
        }]
    };

    chart.setOption(option);
    return chart;
}
