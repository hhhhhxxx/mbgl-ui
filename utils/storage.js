import key from "./key";

export default {
    set: (key, value) => {
       return  baseSet(key, value)
    },
    get: (key) => {
        return baseGet(key)
    },

    getList: (key) => {
        let value = baseGet(key)
        if(isValid(value)) {
            return value
        }
        return []
    },
    remove: (key) => wx.removeStorageSync(key),

    getCurrentUserId: () => {
        let {id} = baseGet(key.USER)
        return id
    }
}

const isValid = (val) => {
   if(val == '' || val == null || val == undefined || val == NaN) {
    return false
   } 
   return true
}

const baseSet = (key, value) => {
    return wx.setStorageSync(key, value)
}

const baseGet = (key) => {
    return wx.getStorageSync(key)
}



