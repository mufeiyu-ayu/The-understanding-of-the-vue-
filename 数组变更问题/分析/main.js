/*
数组变更检测 
 */
/* 
var vm = {
    data: {
        a: 1,
        b: 2,
        list: [1, 2, 3, 4]
    }
}
for (let key in vm.data) {
    Object.defineProperty(vm, key, {
        get() {
            console.log('数据获取')
            return vm.data[key]
        },
        set(newValue) {
            console.log('数据设置')
            vm.data[key] = newValue
        }
    })
}

// 无法监听push pop ,shift ,unshit,splice,sort,reverse等
vm.list.push(6)
console.log(vm.list) */

/* const ArrayPrototype = Array.prototype
const ARR_METHODS = ['pop', 'push', 'shift', 'sort', 'unshift', 'splice', 'reverse']

ARR_METHODS.forEach((method) => {
    method = function (...arg) {
        ArrayPrototype[method].call(this, arg)
    }
})
const vm = new Vue({
    el: '#app',
    data() {
        return {
            list: [1, 2, 3, 4]
        }
    },
    template: `
      <div>{{ list }}</div>
    `
})
console.log(vm.list) */
