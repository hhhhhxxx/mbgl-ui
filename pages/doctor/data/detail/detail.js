import wxApi from "../../../../api/wxApi";
import message from "../../../../utils/message";
import recordApi from "../../../../api/recordApi";


import * as echarts from '../../../../ec-canvas/echarts';

Page({
    data: {
        wxStep: '',

        ec1: {
            onInit: initChart1
        },

        ec2: {
            onInit: initChart2
        },

        ec3: {
            onInit: initChart3
        },

        ec4: {
            onInit: initChart4
        }
    },
    onLoad: function (options) {

        recordApi.getAllDetail({
            patientUserId: options.patientUserId,
            pageIndex: 1,
            pageSize: 7
        }).then(res=>{

            x1 = res.response.x1
            y1= res.response.y1

            x2 = res.response.x2
            y2= res.response.y2

            x3 = res.response.x3
            y31= res.response.y31
            y32= res.response.y32


            x4 = res.response.x4
            y4= res.response.y4

            this.setData({
                ec1: {
                    onInit: initChart1
                },
                ec2: {
                    onInit: initChart2
                },
                ec3: {
                    onInit: initChart3
                },
                ec4: {
                    onInit: initChart4
                }
            })

        })

    }
});

let x1 = []
let y1 = []

let x2 = []
let y2 = []

let x3 = []
let y31 = []
let y32 = []

let x4 = []
let y4 = []


function initChart1(canvas, width, height, dpr) {
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
            data: ['心率'],
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
            data: x1,
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
            name: '心率',
            type: 'line',
            smooth: true,
            data: y1
        }]
    };

    chart.setOption(option);
    return chart;
}

function initChart2(canvas, width, height, dpr) {
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
            data: x2,
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
            data: y2
        }]
    };

    chart.setOption(option);
    return chart;
}

function initChart3(canvas, width, height, dpr) {
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
            data: ['收缩压','舒张压'],
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
            data: x3,
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
            name: '收缩压',
            type: 'line',
            smooth: true,
            data: y31
        },{
            name: '舒张压',
            type: 'line',
            smooth: true,
            data: y32
        }]
    };

    chart.setOption(option);
    return chart;
}

function initChart4(canvas, width, height, dpr) {
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
            data: ['血糖'],
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
            data: x4,
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
            name: '血糖',
            type: 'line',
            smooth: true,
            data: y4
        }]
    };

    chart.setOption(option);
    return chart;
}
