const { createApp } = Vue
/* const app = {
    data() {
        return {
            title: 'this is my title'
        }
    },
    template: `
        <h1>{{ title }}</h1>
        <button @click=changeTitle>change Title</button>
    `,
    methods: {
        changeTitle() {
            this.title = 'this is your title'
        }
    }
}
const vm = createApp(app).mount('#app')
// 实例中直接挂载metods中每一个方法,methods方法并不暴露在实例中

console.log(vm)
 */

const List = {
    data() {
        return {
            teachers: []
        }
    },
    template: `
      <div>
        <table border="1">
          <thead>
            <tr>
              <td>ID</td>
              <td>姓名</td>
              <td>学科</td>
            </tr>
          </thead>
          <tbody v-if="teachers.length>0">
            <tr v-for="item of teachers" :key="item.id">
              <td> {{item.id}} </td>
              <td> {{item.name}} </td>
              <td> {{item.subject}} </td>
            </tr>
          </tbody>
          <tbody v-else="teachers.length>0">
            <tr>
              <td colspan="3">暂无数据</td>
            </tr>
          </tbody>
        </table>
        <button @click=getData>GET TEACHERS'DATA</button>
      </div>
    `,
    methods: {
        getData: debounce(async function () {
            // 这种是不好的，因为实例共用这一个方法会出现问题
            const result = await axios('http://127.0.0.1:8331/getTeachers')
            console.log(Object.prototype.toString.call(result.data))

            this.teachers = result.data
        }, 1000)
    }
}

function debounce(fn, delay) {
    let timer = null
    return function (...arg) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, delay)
    }
}
Vue.createApp(List).mount('#app')
