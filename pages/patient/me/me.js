import storage from "../../../utils/storage";
import key from "../../../utils/key";
import userApi from "../../../api/userApi"

Component({
    properties: {},
    data: {
        info: {
            name: '',
            image: ''
        }
    },

    pageLifetimes: {
        show: function() {
          // 页面被展示
          let patientDTO = storage.get(key.USER);
            this.setData({
                info: {
                    name: patientDTO.name != '' ? patientDTO.name : patientDTO.username,
                    image: patientDTO.image != '' ? patientDTO.image : 'https://inews.gtimg.com/news_bt/OzSCOasYS8Hk2wvZK5EymAU0mk6NYgCFw9yL3f496al6wAA/1000'
                } 
            })
        },
    },
    
    lifetimes: {
        attached: function () {
            let patientDTO = storage.get(key.USER);
            this.setData({
                info: {
                    name: patientDTO.name != '' ? patientDTO.name : patientDTO.username,
                    image: patientDTO.image != '' ? patientDTO.image : 'https://inews.gtimg.com/news_bt/OzSCOasYS8Hk2wvZK5EymAU0mk6NYgCFw9yL3f496al6wAA/1000'
                } 
            })
            console.log(this.data.info);
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    methods: {

        getUserInfo () {
            let patientDTO = storage.get(key.USER);
            var that = this
            return new Promise((resolve, reject) => {
                
                wx.getUserProfile({
                    desc: '获取微信头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success: (res) => {
                        console.log("获取用户信息成功", res)
        
                        let param = {
                            image: res.userInfo.avatarUrl,
                            id: patientDTO.id
                        }
                        userApi.uploadImage(param).then()
                        
                        let info = that.data.info

                        info.image = res.userInfo.avatarUrl;
                        thart.setData({info})

                        resolve(res.userInfo)
                    },
                    fail: res => {
                        console.log("获取用户信息失败", res)
                        reject(res)
                    }
                })
    
            })
        },

        logout() {
            storage.remove(key.USER)
        }
    },
});
