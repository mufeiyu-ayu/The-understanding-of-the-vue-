import proxy from './proxy'
import observe from './observe'
function initState(vm) {
    let options = vm.$options
    if (options.data) {
        initData(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    // _data 是临时保存options.data 这样后面操作data的时候我们可以从vm._data中取值进行数据劫持
    vm._data = data = typeof data === 'function' ? data.call(vm) : {}
    // console.log(vm)

    // 这是第一次代理 当直接从vm身上访问属性的时候设置依次代理
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    // 观察
    observe(vm._data)
}
export { initState }
