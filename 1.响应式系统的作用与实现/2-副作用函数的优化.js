let activeEffect
const bucket = new Set()
function effect(fn) {
    activeEffect = fn
    fn()
}
const data = {text:'我是初始数据'}
const obj = new Proxy(data,{
    get(target,key) {
        if(activeEffect) {
            bucket.add(activeEffect)
        }
        return target[key]
    },
    set(target,key,newValue) {
        target[key] = newValue
        bucket.forEach(fn=>fn())
    }
})
effect(()=>{
    console.log('effect fn')
    document.body.innerText = obj.text
    // 第一次读取触发代理对象的读取操作，并将effect函数建立和obj依赖
})
// setTimeout(() =>{
//     obj.text = 'hello vue3'
// },1000)

setTimeout(() =>{
    obj.name = '我是新创建的属性'
},1000)
// 这里effect函数还会执行2次，但是我们obj.name和effect并没有相对于的响应，我们不应该让这个函数执行第二次
