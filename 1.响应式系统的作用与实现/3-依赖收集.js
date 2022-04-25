const buckct = new WeakMap()
let activeEffect
const data = {text:'hello world'}

//依赖函数
function effect(fn) {
    activeEffect = fn
    fn()
}

// 代理对象
const obj = new Proxy(data,{
    get(target,key){
        track(target,key)
        return target[key]
    },
    set(target,key,newValue) {
        target[key] = newValue
        trigger(target,key)
    }
    // weakMap 由target和map构成
    // map 由key 和 set构成
})

function track(target,key) {
    if(!activeEffect) return
    let depMap = buckct.get(target)
    if(!depMap) {
        buckct.set(target,(depMap=new Map()))
    }
    let deps = depMap.get(key)
    if(!deps) {
        depMap.set(key,(deps = new Set()))
    }
    deps.add(activeEffect) // [f1,f2,f3] type:set
}

function trigger(target,key) {
    // 判断对象有没有和自己的属性建立依赖，如果不存在则直接终止函数
    const depMap = buckct.get(target)
    if(!depMap) return // 判断如果没有建立联系的属性则不执行渲染函数
    const effects = depMap.get(key)
    effects && effects.forEach(fn=>fn())
}

// 第一次收集依赖
effect(()=>{
    console.log('effect fn')
    document.body.innerText = obj.text
    // 第一次读取触发代理对象的读取操作，并将effect函数建立和obj依赖
})
setTimeout(() =>{
    obj.text = 'hello vue3'
    // obj.name ='我是没有建立依赖的属性呀' // 由于新的属性没有建立对应的依赖，所以函数不会在此执行
},1000)