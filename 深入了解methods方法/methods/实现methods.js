const Vue = (function () {
    function Vue(options) {
        this.$data = options.data()
        this._methods = options.methods
        this._init(this)
        delete this._methods
    }
    Vue.prototype._init = function (vm) {
        initData(vm)
        initMethods(vm)
    }

    function initData(vm) {
        for (let key in vm.$data) {
            Object.defineProperty(vm, key, {
                get() {
                    return vm.$data[key]
                },
                set(newValue) {
                    vm.$data[key] = newValue
                }
            })
        }
    }

    function initMethods(vm) {
        for (let key in vm._methods) {
            vm[key] = vm._methods[key] // 将methods的配置项挂载到vm实例的全局属性上
        }
    }
    return Vue
})()

const vm = new Vue({
    data() {
        return {
            a: 1,
            b: 2
        }
    },
    methods: {
        add1(num) {
            this.a += num
        },
        add2(num) {
            this.b += num
        },
        getTotal() {
            console.log(this.a + this.b)
        }
    }
})
vm.add1(1)
vm.add1(1)
vm.add1(1)
vm.add1(1)
// 5
console.log(vm.a)

vm.add2(2)
vm.add2(2)
vm.add2(2)
vm.add2(2)
// b 10
console.log(vm.a)
console.log(vm.b)
vm.getTotal() // 15
console.log(vm)
