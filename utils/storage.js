import {get} from "./request";

import key from "./key";

export default {
    set: (key, value) => {
       return  baseSet(key, value)
    },
    get: (key) => {
        return baseGet(key)
    },
    remove: (key) => wx.removeStorageSync(key),

    getCurrentUserId: () => {
        let {id} = baseGet(key.USER)
        return id
    }
}

const baseSet = (key, value) => {
    return wx.setStorageSync(key, value)
}

const baseGet = (key) => {
    return wx.getStorageSync(key)
}



