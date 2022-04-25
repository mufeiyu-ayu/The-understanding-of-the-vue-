function effect() {
    document.body.innerText = obj.text
}
const bucket = new Set()
const data = {text:'hello world'}
const obj = new Proxy(data,{
    get(target,key) {
        bucket.add(effect)
        return target[key]
    },
    set(target,key ,newValue) {
        target[key] = newValue
        bucket.forEach(fn=>fn())
        return true
    }
})
effect()
setTimeout(() =>{
    obj.text = 'hello vue3'
},1000)