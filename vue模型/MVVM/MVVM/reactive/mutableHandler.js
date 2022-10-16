import { useReactive } from '.'
import { hasOwnProperty, isEqual, isObject } from '../shared/utils'

const get = createGetter(),
    set = createSetter()

function createGetter() {
    return function (target, key, receiver) {
        const res = Reflect.get(target, key, receiver)
        console.log('响应式获取:', target[key])
        if (isObject(res)) {
            return useReactive(res)
        }
        return res
    }
}
function createSetter() {
    return function set(target, key, value, receiver) {
        const isKeyExist = hasOwnProperty(target, key),
            oldValue = target[key],
            res = Reflect.set(target, key, value, receiver)

        if (!isKeyExist) {
            console.log('响应式新增', key, value)
        } else if (!isEqual(value, oldValue)) {
            console.log('响应式修改', key, value)
            // view update
        }
        return res
    }
}
const mutableHandler = {
    get,
    set
}

export { mutableHandler }
