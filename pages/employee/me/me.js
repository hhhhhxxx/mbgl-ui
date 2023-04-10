import storage from "../../../utils/storage";
import key from "../../../utils/key";

Component({
    properties: {

    },
    data: {
        info: {
            name: ''
        }
    },

    lifetimes: {
        attached: function() {
            this.setData({
                info: {
                    name: storage.get(key.USER).username
                }
            })
        },
        detached: function() {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    methods: {
        logout() {
            storage.remove(key.USER)
        }
    },
});
