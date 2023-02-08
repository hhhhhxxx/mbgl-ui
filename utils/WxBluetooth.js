export default {
    // 打开蓝牙
    openBluetoothAdapter: () => {
        return new Promise((resolve, reject) => {
            wx.openBluetoothAdapter({
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        })
    },

    // 获取蓝牙状态
    getBluetoothAdapterState: () => {
        return new Promise((resolve, reject) => {
            wx.getBluetoothAdapterState({
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        })
    },

    // 发现设备
    startBluetoothDevicesDiscovery: () => {
        return new Promise((resolve, reject) => {
            wx.startBluetoothDevicesDiscovery({
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        })
    },

    // 获取设备
    getBluetoothDevices: () => {
        return new Promise((resolve, reject) => {
            wx.getBluetoothDevices({
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        })

    },

    createBLEConnection(deviceId) {
        return new Promise((resolve, reject) => {
            wx.createBLEConnection({
                deviceId: deviceId,
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                },
            })
        })
    },
    // 获取服务
    getBLEDeviceServices(deviceId) {
        return new Promise((resolve, reject) => {
            wx.getBLEDeviceServices({
                deviceId, // 搜索到设备的 deviceId
                success: (res) => {
                    resolve(res)
                },
                fail: function (res) {
                    that.setData({
                        info: "获取服务失败"
                    })
                    reject(res)
                },
            })
        })
    },

    // 获取服务下的特征值
    getBLEDeviceCharacteristics: (deviceId, serviceId) => {
        return new Promise((resolve, reject) => {
            wx.getBLEDeviceCharacteristics({
                deviceId, // 搜索到设备的 deviceId
                serviceId, // 上一步中找到的某个服务
                success: (res) => {
                    // for (let i = 0; i < res.characteristics.length; i++) {
                    //     let item = res.characteristics[i]
                    //     console.log(item)
                    // }
                    resolve(res)
                },
                fail: function (res) {
                    reject(res)
                }
            })
        })
    },

    closeBLEConnection: (deviceId) => {
        return new Promise((resolve, reject) => {
            wx.closeBLEConnection({
                deviceId: deviceId,
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    wx.hideLoading()
                    reject(res)
                }
            })
        })
    },

    // 停止搜索
    stopBluetoothDevicesDiscovery: () => {
        return new Promise((resolve, reject) => {
            wx.stopBluetoothDevicesDiscovery({
                success: function (res) {
                    resolve(res)
                },
                fail: function (res) {
                    reject(res)
                }
            })
        })
    }
}
