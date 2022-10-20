import observe from './observe'
export default function (data, key, value) {
    observe(value) // 这里的value可能又是数组或者对象，所以需要递归处理
    Object.defineProperty(data, key, {
        get() {
            console.log('获取数据', value)

            return value
        },
        set(newValue) {
            console.log('设置新值', newValue)

            if (newValue === value) return
            observe(newValue) // 新值也可能是数组或者对象，所以也需要递归处理
            value = newValue
        }
    })
}
