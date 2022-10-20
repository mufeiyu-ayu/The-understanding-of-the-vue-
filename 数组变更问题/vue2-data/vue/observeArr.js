import observe from './observe'
//HACK 对数组新增的值进行数据劫持
function observeArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        observe(arr[i])
    }
}
export { observeArr }
