export default {
    male: 1,
    female: 0,
    toSexName: (value) => {
        return value === 1 ? '男' : '女'
    },

    NoticeType: {
        INFO: 222,
        APPLY_CONNECT: 1001
    },
    NoticeOption: {
        CONFIRM: 11,
        REFUSED: 22
    },

    MiBand3: {
        // 认证
        CUSTOM_SERVICE_FEE1: '0000FEE1-0000-1000-8000-00805F9B34FB',
        CUSTOM_SERVICE_AUTH_CHARACTERISTIC: '00000009-0000-3512-2118-0009AF100700',

        // 心率
        HEART_RATE_SERVICE: '0000180D-0000-1000-8000-00805F9B34FB',
        HEART_RATE_MEASUREMENT_CHARACTERISTIC: '00002A37-0000-1000-8000-00805F9B34FB', // 通知 不可读写
        HEART_RATE_CONTROL_POINT_CHARACTERISTIC: '00002A39-0000-1000-8000-00805F9B34FB', // 可写

        // 步数
        STEP_COUNT_SERVICE: '0000FEE0-0000-1000-8000-00805F9B34FB',
        STEP_COUNT_CHARACTERISTIC: '00000007-0000-3512-2118-0009AF100700'
    }
}
