//HACK 改写数组的某些方法
import { ARR_METHODS } from './config'
import { observeArr } from './observeArr'
var orginArray = Array.prototype,
    arrMethods = Object.create(orginArray)
ARR_METHODS.forEach((item) => {
    // 给这个对象设置自定义push,poo...的方法
    arrMethods[item] = function (...arg) {
        // 执行原来数组相应的方法
        let rt = orginArray[item].apply(this, arg)
        console.log('数组新方法', arg)

        let newArr
        switch (item) {
            case 'push':
            case 'unshift':
                newArr = arg
                break
            case 'splice':
                newArr = arg.slice(2)
                break
            default:
                break
        }
        newArr && observeArr(newArr)
        //返回这个数组
        return rt
    }
})
export { arrMethods }
