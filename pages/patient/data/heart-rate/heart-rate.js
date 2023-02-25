import * as echarts from "../../../../ec-canvas/echarts";
import recordApi from "../../../../api/recordApi";

Page({
    data: {
        ec: {
            onInit: initChart
        }
    },
    onLoad: function (options) {
        recordApi.getWeekData({
            type: 1,
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


    console.log('多少次')
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
            name: '心率',
            type: 'line',
            smooth: true,
            data: y1List
        }]
    };

    chart.setOption(option);
    return chart;
}
