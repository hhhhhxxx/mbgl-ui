import storage from "../../../utils/storage";
import key from "../../../utils/key";

Component({
    properties: {},
    data: {
        info: {
            name: ''
        },
        avatarUrl: null
    },

    lifetimes: {
        attached: function () {

            this.getAvatarUrl()

            this.setData({
                info: {
                    name: storage.get(key.USER).username
                }
            })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    methods: {

        getAvatarUrl() {

            let {avatarUrl} = storage.get(key.WX_USER_INFO)

            if(!avatarUrl) {
                avatarUrl = '../../../pic/head.jpg'
            }

            this.setData({
                avatarUrl: avatarUrl
            })

        },

        logout() {
            storage.remove(key.USER)
        }
    },
});
