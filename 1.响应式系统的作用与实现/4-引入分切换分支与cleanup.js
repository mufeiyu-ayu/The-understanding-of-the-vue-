const buckct = new WeakMap()
let activeEffect
const data = {ok:true,text:'hello world'}

//依赖函数
function effect(fn) {
    activeEffect = fn
    fn()
}

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

effect(()=>{
    console.log('effect fn')
    document.body.innerText = obj.ok ? obj.text : 'not'
})
obj.ok = false
obj.text = 'hello dadada'
// 当obj.ok 属性为false的时候，map中依然存在 ok 和 text的2个依赖，按理来说我们只需要ok的依赖，而不需要set的依赖，以为当我们执行set依赖的时候页面并不会刷新内容， 而且当我们修改obj.text值得时候，仍然会导致副作用函数重复执行，即使document.body.innertext值不需要改变
// 既 理想状态下副作用函数不应该被字段obj.text收集依赖
console.log(buckct)
// 我们在下节探讨如何消除这种依赖
