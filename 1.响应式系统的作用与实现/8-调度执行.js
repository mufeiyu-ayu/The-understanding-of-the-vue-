const buckct = new WeakMap()
const data = {foo:1}
// 此时得activeEffect是一个函数，有一个数组得属性
let activeEffect
let temp1,temp2
// effect栈
const effectStack = []
function effect(fn,options = {}) {
    const effectFn = () => {
        cleanup(effectFn)
        activeEffect = effectFn
        // 在调用副作用函数之前把当前副作用函数压入栈中
        effectStack.push(activeEffect)
        fn() // 收集依赖``
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
    }
    // 将options挂载到 effectFn上
    effectFn.options = options
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
    const effectsToRun = new Set()
    //如果trigger触发的函数与当前正在执行的副作用函数相同，则不触发执行
    effects && effects.forEach(effectFn => {
        if(effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
        }
    })
    effectsToRun.forEach(effctFn => {
        if(effctFn.options. scheduler) {
            effctFn.options. scheduler(effctFn)
        }else  {
            effctFn()
        }
    })
}

function cleanup(effectFn) {
    for(let i = 0;i<effectFn.deps.length;i++) {
        const deps = effectFn.deps[i]
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
    isFlushing = true
    p.then(()=>{
        jobQueue.forEach(job=>job())
    }).finally(()=>{
        isFlushing = false
    })
}

// effect(
//     ()=>{
//         console.log(obj.foo)
//     },
//     // options
//     {
//         scheduler(fn) {
//             setTimeout(fn)
//         }
//     }
// )

effect(
    ()=>{
        console.log(obj.foo)
    },
    // options
    {
        scheduler(fn) {
            jobQueue.add(fn)
            flushJob()
        }
    }
)
obj.foo++
obj.foo++
// console.log('结束了')