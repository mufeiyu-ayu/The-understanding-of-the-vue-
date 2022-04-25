const buckct = new WeakMap()
const data = {foo:1,bar:2}
const effectStack = []
// 此时得activeEffect是一个函数，有一个数组得属性
let activeEffect

function effect(fn,options = {}) {
    const effectFn = () => {
        cleanup(effectFn)
        activeEffect = effectFn
        // 将外层副作用函数压入栈中
        effectStack.push(effectFn)
        // 将 res 的结果
        const res = fn() // 收集依赖``
        effectStack.pop()
        activeEffect = effectStack[effectStack.length-1]
        return res
    }
    effectFn.options = options
    effectFn.deps = []
    if(!options.lazy) {
        effectFn()
    }
    return effectFn
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
    const effectToRun = new Set()
    effects.forEach(effectFn => {
        if(effectFn !==activeEffect) {
            effectToRun.add(effectFn)
        }
    })
    effectToRun.forEach(effectFn=> {
        if(effectFn.options.scheduler) {
            effectFn.options.scheduler(effectFn)
        }else  {
            effectFn()
        }
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

const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false

function flushJob() {
    if(isFlushing) return
    isFlushing  =true
    p.then(() => {
        jobQueue.forEach(job=> job())
    }).finally(()=>{
        isFlushing = false
    })
}

debugger;
const effectFn = effect(
    ()=>obj.foo + obj.bar,
    { lazy:true }
)
// effect函数返回值为effectFn函数
const value = effectFn()
// console.log('end')
console.log(value)