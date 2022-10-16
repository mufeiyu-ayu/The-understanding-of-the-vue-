/*
MVC -> 驱动被MVC分离成三部分
 MVVM -> 驱动VM -> ViewModel
 M -> Model 数据保存和处理的层
 V -> 视图
 */
import { useDOM, useReactive } from '../MVVM'
function App() {
    const state = useReactive({
        count: 0,
        name: 'hello susu'
    })
    console.log(state.count)
    state.count += 1
    const add = (num) => {
        state.count += num
    }

    const minus = (num) => {
        state.count -= num
    }

    const changeName = (name) => {
        state.name = name
    }

    return {
        template: `
          <h1>{{ count }}</h1>
          <h2>{{ name }}</h2>
          <button onClick="add(2)">+</button>
          <button onClick="minus(1)">-</button>
          <button onClick="changeName('hello susu')">ChangeName</button>
        `,
        state,
        methods: {
            add,
            minus,
            changeName
        }
    }
}

useDOM(App(), document.querySelector('#app'))
