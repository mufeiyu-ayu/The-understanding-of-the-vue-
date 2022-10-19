/*
const { createApp } = Vue
const app = {
    data() {
        return {
            a: 1,
            b: 2
        }
    },
    template: `
    <span>{{ a }}</span>
     <span>+</span>
    <span>{{ b }}</span>
    <span>=</span>
    <span>{{getTotal}}</span>
    `,
    computed: {
        getTotal() {
            return this.a + this.b
        }
    }
}
createApp(app).mount('#app')

 */

var Vue = (function () {
    const computedData = {}
    /*
    total:{
        value:函数执行结果
        get:get
        dep:[a,b]
    }
     */
    function Vue(options) {
        this.$el = document.querySelector(options.el)
        this.$data = options.data
        this._init(this, options.computed, options.template)
    }

    Vue.prototype._init = function (vm, computed, template) {
        dataReactive(vm)
        computedReactive(vm, computed)
        render(vm, template)
    }

    function render() {}

    function compileTemplate() {}
    function dataReactive(vm) {
        var _data = vm.$data
        for (let key in _data) {
            Object.defineProperty(vm, key, {
                get() {
                    return _data[key]
                },
                set(newValue) {
                    _data[key] = newValue
                }
            })
        }
    }

    function computedReactive(vm, computed) {
        _initComputedData(vm, computed)
    }
    function _initComputedData(vm, computed) {
        for (let key in computed) {
            let des = Object.getOwnPropertyDescriptor(computed, key),
            
        }
    }

    return Vue
})()
