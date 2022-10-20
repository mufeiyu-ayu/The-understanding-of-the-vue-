import Observer from './Observer'
export default function (data) {
    if (typeof data !== 'object' || data === null) return
    // 自己代理的data
    return new Observer(data)
}
