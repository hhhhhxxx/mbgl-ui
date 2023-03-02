import Decimal from "decimal.js"




export default {
    calMul: (a1, a2) => {
        return Decimal(a1).mul(Decimal(a2)).toNumber()
    },
    calAdd: (a1, a2) => {
        return Decimal(a1).add(Decimal(a2)).toNumber()
    },
    calDiv: (a1, a2) => {
        return Decimal(a1).div(Decimal(a2)).toNumber()
    },
}