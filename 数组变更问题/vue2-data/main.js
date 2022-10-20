// 初始化Vue
function Vue(options) {
    this._init(options)
}
// 初始化操作
Vue.prototype._init = function (options) {
    let vm = this
    vm.$options = options
    initState(vm)
}

function initState(vm) {
    let options = vm.$options
    if (options.data) {
        initData(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    vm._data = data = typeof data === 'function' ? data.call(vm) : {}
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    observe(vm._data)
}

function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
        get() {
            // console.log(`访问属性`)
            return vm[target][key]
        },
        set(newValue) {
            //  console.log(`设置属性`)
            vm[target][key] = newValue
        }
    })
}

function observe(data) {
    if (typeof data !== 'object' || data === null) return
    return new Observer(data)
}

function Observer(data) {
    if (Array.isArray(data)) {
        // 先不了解，后面解释
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
function defineReactiveData(data, key, value) {
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            console.log('获取数据', value)
            return value
        },
        set(newValue) {
            console.log('设置新值', newValue)
            if (newValue === value) return // 做点小优化嘻嘻
            observe(newValue)
            value = newValue
        }
    })
}
