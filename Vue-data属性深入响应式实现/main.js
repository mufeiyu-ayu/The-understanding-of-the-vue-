/*
data 必须是一个函数 

vue 在创建实例的过程中调用data函数
返回实例对象
通过响应式包装后存储在实例的$data上
并且实例可以直接越过$data访问属性
 */
// 避免我们的data的数据对象使用同一个引用而导致实例不能拥有独一无二的data
/* const { createApp } = Vue
const app = {
    data: {
        a: 1
    },
    template: `
    <h1>{{a}}</h1>
    `
}
createApp(app).mount('#app') */

/* var data = { a: 1, b: 2 }
var vm1 = new Vue({
    data
})
var vm2 = new Vue({
    data
})

vm1.b = 3
console.log(vm1)
console.log(vm2)

function Vue(options) {
    this.$data = options.data

    for (let key in this.$data) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newValue) {
                this.$data[key] = newValue
            }
        })
    }
}
 */

function Vue(options) {
    this.$data = proxy(options.data)
}
function proxy(options) {
    return new Proxy(options, {
        get(target, key, value, receiver) {
            return Reflect.get(target, key, value, receiver)
        },
        set(target, key, newValue, receiver) {
            Reflect.set(target, key, newValue, receiver)
        }
    })
}
const data = {
    a: 'hello world'
}
const vue1 = new Vue({
    data
})
const vue2 = new Vue({
    data
})
vue1.$data.a = 'hello Vue'
console.log(vue1.$data.a)
console.log(vue2.$data.a)
