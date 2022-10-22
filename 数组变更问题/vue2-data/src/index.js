import Vue from 'vue'

let vm = new Vue({
    el: 'app',
    data() {
        return {
            title: '学生列表',
            classNum: 1,
            total: 2,
            info: {
                a: {
                    b: 1
                }
            },
            teacher: ['张三', '李四'],
            students: [1, 2, 3, 4]
        }
    }
})
// console.log(vm.info.a.b)
// console.log(vm.title)
// console.log(vm.students.push(1))
vm.students.push(5)
