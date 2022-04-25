const buckct = new WeakMap()
const data = {ok:true,text:'hello world'}
// 此时得activeEffect是一个函数，有一个数组得属性
let activeEffect

function effect(fn) {
    const effectFn = () => {
        cleanup(effectFn)
        activeEffect = effectFn
        fn() // 收集依赖``
    }
    effectFn.deps = []
    effectFn()
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
    deps.add(activeEffect) // [f1=>[],f2=>[],f3=>[]] type:set
    activeEffect.deps.push(deps) //
}

function trigger(target,key) {
    // 判断对象有没有和自己的属性建立依赖，如果不存在则直接终止函数
    const depMap = buckct.get(target)
    if(!depMap) return // 判断如果没有建立联系的属性则不执行渲染函数
    const effects = depMap.get(key) // [f1=>[],f2=>[],f3=>[]] type:set
    // console.log(effects)
    const effectsToRun = new Set(effects)
    // console.log(...effectsToRun)
    effectsToRun.forEach(effectFn =>{
        // console.log(effectFn)
        effectFn()
    })
}

function cleanup(effectFn) {
    for(let i = 0;i<effectFn.deps.length;i++) {
        const deps = effectFn.deps[i]
        // console.log(deps) // deps => Set[f]
        deps.delete(effectFn)
    }
    // 重置effectFn.deps数组
    effectFn.deps.length = 0
}
effect(()=>{
    console.log('effect fn')
    document.body.innerText = obj.ok ? obj.text : 'not'
})
// 当第一次effect函数执行完毕之后（收集依赖的过程）会对obj.ok obj.text 收集依赖， 并且activeEffect.deps(数组)中包含2个set依赖（即2个属性的依赖）
obj.ok = false
// console.log(activeEffect.deps)
obj.text ='dada'
// obj.text ='dadadadad'