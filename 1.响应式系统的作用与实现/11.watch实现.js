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
    effects && effects.forEach(effectFn => {
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

// computed计算属性是我们封装的一个代码执行库，getter函数实际就是我们的副作用执行函数，我们用effectFn来包裹
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

// // watch函数接收2个参数，一个是响应式数据，一个是响应的回调函数
// function  watch(source,cb) {
//     effect(
//         //  调用traverse函数递归读取
//         ()=>traverse(source), // 触发读取操作，从而建立联系
//         {
//             scheduler() {
//                 cb()
//             }
//         }
//     )
// }
//
function traverse(value,seen = new Set()) {
    // 如果读取的数据是原始值，或者已经被读取过，那么return
    if(typeof value !=='object' || value === null || seen.has(value)) return
    seen.add(value) // Set[1] proxy
    for(const key in value) {
        traverse(value[key],seen) // 递归调用这个对象的每一个值，因为可能对象的属性还是一个对象。
        // 这样就可以对对象内部所有的属性进行依赖
    }
    return value  // Proxy{foo: 1, bar: 2}
}
//
// watch(obj,()=>{
//     console.log('数据发生改变')
// })
// obj.foo++
// obj.bar++
function watch(source,cb) {
    let getter
    if(typeof source === 'function') {
        getter = source
    }else {
        getter = () => traverse(source)
    }
    let oldValue,newValue
    const effectFn = effect(
        ()=> getter(), // 对用户自己传入得数据进行依赖收集
        {
            lazy:true,
            scheduler() {
                // 在scheduler刷新之前执行副作用函数得到的是新值
                newValue = effectFn()
                // 将旧值和新值作为回调函数参数
                cb(newValue,oldValue)
                // 更新旧值，不然下次会得到错误的旧值
                oldValue = newValue
            }
        }
    )
    // 手动调用副作用函数，拿到的就是旧值
    oldValue = effectFn() // 1
}

watch(
    ()=>obj.foo,
    (newValue,oldValue)=>{
        console.log(`新值:${newValue}--旧值:${oldValue}`)
        // console.log('数据发生改变')
    }
)
debugger
// 当wacth函数执行完毕之后，会对我们传入得getter中得数据进行收集依赖，由于我们手动调用了oldValue = effectFn()则会拿到这个数据的返回值（旧值：1）
obj.foo++
// 首先会触发tack函数，由于我们之前清理了activeEffect，所以不执行，然后执行trigger函数（此时obj.foo = 2），然后由于scheduler存在，所以执行scheduler函数 里面执行effectFn => 然后在里面执行fn函数 也就是getter函数()=>obj.foo(这里foo为2,所以重新进行依赖收集),effectFn函数执行完毕拿到fn的返回值为2 也就是newValue => cb(newValue,oldValue)





