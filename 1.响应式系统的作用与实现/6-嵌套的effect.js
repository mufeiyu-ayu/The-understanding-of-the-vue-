const buckct = new WeakMap()
const data = {foo:true,bar:true}
// 此时得activeEffect是一个函数，有一个数组得属性
let activeEffect
let temp1,temp2
// effect栈
const effectStack = []
function effect(fn) {
    const effectFn = () => {
        cleanup(effectFn)
        activeEffect = effectFn
        // 在调用副作用函数之前把当前副作用函数压入栈中
        effectStack.push(activeEffect)
        fn() // 收集依赖``
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
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
    const effectsToRun = new Set(effects)
    effectsToRun.forEach(effectFn =>{effectFn()})
}

function cleanup(effectFn) {
    for(let i = 0;i<effectFn.deps.length;i++) {
        const deps = effectFn.deps[i]
        deps.delete(effectFn)
    }
    // 重置effectFn.deps数组
    effectFn.deps.length = 0
}

effect(function  effectFn1() {
    console.log('effectFn1 执行')
    effect(function effectFn2() {
        console.log('effectFn2 执行')
        temp2 = obj.bar
    })
    // 当执行完内部嵌套的effect函数时内层副作用函数的执行会覆盖activeEffect的值并且对obj.bar产生依赖效果
    temp1 = obj.foo
})
// 当effect函数执行完毕后activeEffect.deps数组中包含2个set依赖，此时已经收集到了map和set的依赖,并且activeEffect.deps收集的副作用用函数是effect的内层函数，所以哪怕当我们访问外层函数进行依赖的操作，收集和触发的副作用函数都会是内层副作用函数.effectFn函数执行完毕后为
obj.foo = 'dasdas'
// 当这个执行完毕之后activeEffect.deps中只有对于bar的依赖