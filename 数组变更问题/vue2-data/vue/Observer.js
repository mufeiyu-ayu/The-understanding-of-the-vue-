import defineReactiveData from './reactive'
import { arrMethods } from './array'
import { observeArr } from './observeArr'
function Observer(data) {
    if (Array.isArray(data)) {
        data.__proto__ = arrMethods
        observeArr(data) // 数组里面可能还有数组所以需要递归观察
    } else {
        this.walk(data)
    }
}
Observer.prototype.walk = function (data) {
    var keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i],
            value = data[key]
        defineReactiveData(data, key, value)
    }
}
export default Observer
