const data = {foo: 1,bar:2}
let activeEffect
const effectStack = []
const bucket = new WeakMap()

function effect(fn,options ={}) {
    const effectFn = ()=> {
        cleanup(effectFn)
        activeEffect = effectFn
        effectStack.push(effectFn)
        let res = fn()
        effectStack.pop()
        activeEffect = effectStack[effectStack.length -1]
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
    get(target,key) {
        track(target,key)
        return target[key]
    },
    set(target,key,newValue) {
        target[key] = newValue
        trigger(target,key)
    }
})

function  track(target,key) {
    if(!activeEffect) return
    let depMap = bucket.get(target)
    if(!depMap) {
        bucket.set(target,(depMap = new Map()))
    }
    let deps = depMap.get(key)
    if(!deps) {
        depMap.set(key,(deps = new Set()))
    }
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
}

function trigger(target,key) {
    const depMap = bucket.get(target)
    if(!depMap) return
    const effects = depMap.get(key)
    const effectToRun = new Set()
    effects.forEach(effectFn => {
        if(activeEffect !== effectFn) {
            effectToRun.add(effectFn)
        }
    })
    effectToRun.forEach(effectFn =>{
        if(effectFn.options.scheduler) {
            // 如果有条度器，则把副作用函数放到scheduer中执行
            effectFn.options.scheduler(effectFn)
        }else  {
            effectFn()
        }
    })
}

function cleanup(effectFn) {
    for(let i = 0; i<effectFn.deps.length;i++) {
        const deps = effectFn.deps[i] // Set
        deps.delete(effectFn)
    }
    effectFn.deps.length = 0
}

function computed(getter) {
    let value
    let dirty = true
    const effectFn = effect(getter,{
        lazy:true,
        scheduler() {
            dirty = true
            // 当计算属性依赖的响应式数据变化时，手动调用trigger函数触发响应
            trigger(obj,value)
        }
    })
    const obj ={
        get value() {
            //  只对脏值时才计算，并将得到的值放到value中
            if(dirty) {
                value = effectFn()
                dirty = false // 下次如果依赖的数据没有发生改变那么则下次不需要再次加载
            }
            // 当读取value时，手动调用tacj函数进行追踪
            track(obj,value)
            return value
        }
    }
    return obj
}
// computed计算属性是我们封装的一个代码执行库，getter函数实际就是我们的副作用执行函数，我们用effectFn来包裹
debugger;
const sumRes = computed(() => obj.foo + obj.bar)
effect(() => {
    console.log(sumRes.value)
})
obj.foo++






