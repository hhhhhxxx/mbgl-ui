// pages/data/equipment/equipment.js
import {u8array, concatenate} from "../../../../utils/cryptoUtil";
import CryptoJS from "crypto-js";

import WxBluetooth from "../../../../utils/WxBluetooth";
import message from "../../../../utils/message";
import constant from "../../../../utils/constant";
import recordApi from "../../../../api/recordApi";

Page({
    data: {
        field: '',
        info: "",
        connectedDeviceId: "",
        devices: [],
        hrvalue: '',
        stepCount: ''
    },


    // 创建连接
    createConnection(event) {
        wx.showLoading({
            title: '加载中',
        })
        const that = this
        let selectId = event.currentTarget.id

        WxBluetooth.createBLEConnection(selectId).then(res => {

            let list = that.data.devices
            let deviceName = ''

            list.forEach((v, i) => {
                if (v.deviceId == selectId) {
                    list[i].active = true
                    deviceName = v.name
                }
            });

            that.setData({
                info: "连接成功",
                devices: list,
                connectedDeviceId: selectId
            })

            if (deviceName != 'Mi Band 3') {
                message.error('设备不是小米手环')
                return
            }

            WxBluetooth.getBLEDeviceServices(this.data.connectedDeviceId).then(res => {

                for (let i = 0; i < res.services.length; i++) {
                    // if (res.services[i].isPrimary) {
                    //     // 可根据具体业务需要，选择一个主服务进行通信
                    // }
                    let serviceId = res.services[i].uuid
                    // 适配ios 扫描一遍所有特征值
                    WxBluetooth.getBLEDeviceCharacteristics(this.data.connectedDeviceId, serviceId).then(res => {

                        for (let i = 0; i < res.characteristics.length; i++) {
                            let item = res.characteristics[i]
                            if (item.properties.notify || item.properties.indicate) {
                                console.log('具有通知', item)
                                // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
                                // wx.notifyBLECharacteristicValueChange({
                                //     deviceId,
                                //     serviceId,
                                //     characteristicId: item.uuid,
                                //     state: true,
                                // })
                            }
                        }


                    })
                }

                // 延时
                setTimeout(() => {
                    var deviceId = that.data.connectedDeviceId

                    console.log('开始监听0009')
                    wx.notifyBLECharacteristicValueChange({
                        deviceId,
                        serviceId: constant.MiBand3.CUSTOM_SERVICE_FEE1,
                        characteristicId: constant.MiBand3.CUSTOM_SERVICE_AUTH_CHARACTERISTIC,
                        state: true,
                    })

                    // 认证

                    let authKey = [0x01, 0x08, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45]

                    let buffer = new Uint8Array(authKey).buffer;

                    console.log(buffer)

                    wx.writeBLECharacteristicValue({
                        deviceId,
                        serviceId: constant.MiBand3.CUSTOM_SERVICE_FEE1,
                        characteristicId: constant.MiBand3.CUSTOM_SERVICE_AUTH_CHARACTERISTIC,
                        value: buffer,
                    })
                }, 2000)


                // 监听心率值


            })

        }).catch(res => {
            that.setData({
                info: "连接失败"
            })
        }).finally(() => {
            wx.hideLoading()
        })


    },


    getStep() {

        this.setData({
            stepCount: '正在查询'
        })

        var deviceId = this.data.connectedDeviceId

        if(deviceId != '') {
            wx.readBLECharacteristicValue({
                deviceId,
                serviceId: constant.MiBand3.STEP_COUNT_SERVICE,
                characteristicId: constant.MiBand3.STEP_COUNT_CHARACTERISTIC,
            })
        } else {
            message.info('请连接蓝牙设备')
        }
    },

    getHeartRate() {

        this.setData({
            hrvalue: '正在查询心率'
        })

        var deviceId = this.data.connectedDeviceId


        wx.notifyBLECharacteristicValueChange({
            deviceId,
            serviceId: constant.MiBand3.HEART_RATE_SERVICE,
            characteristicId: constant.MiBand3.HEART_RATE_MEASUREMENT_CHARACTERISTIC,
            state: true,
        })

        let input = [0x15, 0x2, 0x1]
        let buffer = new Uint8Array(input).buffer;

        wx.writeBLECharacteristicValue({
            deviceId,
            serviceId: constant.MiBand3.HEART_RATE_SERVICE,
            characteristicId: constant.MiBand3.HEART_RATE_CONTROL_POINT_CHARACTERISTIC,
            value: buffer,
        })

    },

    // 取消连接
    closeConnection(event) {

        var that = this;
        let deviceId = event.currentTarget.id

        WxBluetooth.closeBLEConnection(deviceId).then(res => {
            let list = that.data.devices

            list.forEach((v, i) => {
                if (v.deviceId === deviceId) {
                    list[i].active = false
                }
            });

            that.setData({
                info: "成功断开连接",
                devices: list
            })
        }).catch(res => {
            that.setData({
                info: "断开失败",
            })
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */

    zhendong() {
        // 振动
        var deviceId = this.data.connectedDeviceId
        var serviceId = '00001802-0000-1000-8000-00805F9B34FB'
        var characteristicId = '00002A06-0000-1000-8000-00805F9B34FB'

        // 本示例是向蓝牙设备发送一个 0x00 的 16 进制数据
        // 实际使用时，应根据具体设备协议发送数据
        let buffer = new ArrayBuffer(1)
        let dataView = new DataView(buffer)
        dataView.setUint8(0, 0x01)
        wx.writeBLECharacteristicValue({
            deviceId,
            serviceId,
            characteristicId,
            value: buffer,
        })
    },

    onLoad: function (options) {
        this.setData({
            field: options.field
        })

        const that = this

        WxBluetooth.openBluetoothAdapter().then(res => {

            wx.showLoading({
                title: '蓝牙设备搜索中',
            })

            WxBluetooth.getBluetoothAdapterState().then(res => {

                WxBluetooth.startBluetoothDevicesDiscovery().then(res => {

                    WxBluetooth.getBluetoothDevices().then(res => {

                        that.setData({
                            devices: res.devices,
                            info: '获取成功'
                        })

                        console.log(res.devices)
                    })
                })
            }).catch(() => {
                that.setData({
                    info: "蓝牙不可用",
                })
            })
        }).catch(() => {
            that.setData({
                info: "蓝牙未打开",
            })
        }).finally(() => {
            wx.hideLoading()
        })

        // 监听特殊值 相当于获取消息
        wx.onBLECharacteristicValueChange((result) => {
            const that = this

            console.log('监听：', result)

            var value = new Uint8Array(result.value);

            if (result.characteristicId === constant.MiBand3.CUSTOM_SERVICE_AUTH_CHARACTERISTIC) {

                // 第一次
                if (value[0] == 0x10 && value[1] == 0x01 && value[2] == 0x01) {

                    let buffer = new ArrayBuffer(18)
                    let dataView = new DataView(buffer)

                    dataView.setUint8(0, 0x02)
                    dataView.setUint8(1, 0x08)

                    wx.writeBLECharacteristicValue({
                        deviceId: this.data.connectedDeviceId,
                        serviceId: result.serviceId,
                        characteristicId: result.characteristicId,
                        value: buffer,
                    })
                } else if (value[0] == 0x10 && value[1] == 0x02 && value[2] == 0x01) {

                    // 第二次
                    // 原二进制流
                    var source = new Uint8Array(result.value);

                    //需要加密的bytes数组
                    var text = source.subarray(3, 19)

                    // 密钥
                    var secretKey = new Uint8Array([0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45]);

                    var textStream = u8array.parse(text)
                    var secretStream = u8array.parse(secretKey)

                    var encrypted = CryptoJS.AES.encrypt(textStream, secretStream, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.NoPadding
                    });

                    var enText = u8array.stringify(encrypted.ciphertext);


                    const ia = new Uint8Array(enText)

                    console.log(enText)

                    const title = new Uint8Array([0x03, 0x8])
                    const re = concatenate(Uint8Array, title, ia)

                    console.log(re)

                    let buffer = new Uint8Array(re).buffer;

                    wx.writeBLECharacteristicValue({
                        deviceId: this.data.connectedDeviceId,
                        serviceId: result.serviceId,
                        characteristicId: result.characteristicId,
                        value: buffer,
                    })
                } else if (value[0] == 0x10 && value[1] == 0x03 && value[2] == 0x01) {

                    that.setData({
                        hrvalue: '点击此按钮并进行心率测量'
                    })

                    message.info('miband3验证通过')

                } else {
                    console.log('其他消息')
                }
            } else if (result.characteristicId === constant.MiBand3.HEART_RATE_MEASUREMENT_CHARACTERISTIC) {


                if (value.length == 2 && value[0] == 0) {
                    let hrvalue = (value[1] & 0xff);
                    that.setData({
                        hrvalue: hrvalue
                    })

                    wx.showModal({
                        title: '提示',
                        content: '今日手环心率：'+that.data.hrvalue+'BPM 是否上传',
                        success (res) {
                            if (res.confirm) {

                                recordApi.addRecord({
                                    heartRate: that.data.hrvalue
                                }).then(res=>{
                                    message.success('上传成功')
                                    wx.navigateBack('/pages/patient/data/heart-rate/heart-rate')
                                })

                            } else if (res.cancel) {
                                message.info('已取消')
                            }
                        }
                    })
                } else {
                    message.error('心率数值异常')
                }

            } else if (result.characteristicId === constant.MiBand3.STEP_COUNT_CHARACTERISTIC) {
                that.setData({
                    stepCount: value[1]
                })

                wx.showModal({
                    title: '提示',
                    content: '今日手环步数：'+that.data.stepCount+' 是否上传',
                    success (res) {
                        if (res.confirm) {

                            recordApi.addRecord({
                                stepCount: that.data.stepCount
                            }).then(res=>{
                                message.success('上传成功')
                                wx.navigateBack('/pages/patient/data/step-count/step-count')
                            })

                        } else if (res.cancel) {
                            message.info('已取消')
                        }
                    }
                })

            } else {
                console.log('未知消息')
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    onUnload: function () {
        wx.stopBluetoothDevicesDiscovery({
            success: function (res) {
                console.log("关闭蓝牙");
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

        const that = this

        WxBluetooth.openBluetoothAdapter().then(res => {

            wx.showLoading({
                title: '蓝牙设备搜索中',
            })

            WxBluetooth.getBluetoothAdapterState().then(res => {

                WxBluetooth.startBluetoothDevicesDiscovery().then(res => {

                    WxBluetooth.getBluetoothDevices().then(res => {

                        that.setData({
                            devices: res.devices,
                            info: '获取成功'
                        })

                        console.log(res.devices)
                    })
                })
            }).catch(() => {
                that.setData({
                    info: "蓝牙不可用",
                })
            })
        }).catch(() => {
            that.setData({
                info: "蓝牙未打开",
            })
        }).finally(() => {
            wx.hideLoading()
        })

    }
})
