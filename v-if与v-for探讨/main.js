const vm = {
    data() {
        return {
            list: [
                { id: 1, content: 'title1', isTrue: false },
                { id: 2, content: 'title2', isTrue: false },
                { id: 3, content: 'title3', isTrue: true },
                { id: 4, content: 'title4', isTrue: false }
            ]
        }
    },
    template: `
     <div>
        <ul>
          <li v-for="(item,index) in list" :key="item.id" v-if="!item.isTrue">
             {{item.content}}
          </li>
        </ul>
     </div>
    `
}
Vue.createApp(vm).mount('#app')
/*
vue2中v-for 比v-if优先级更高，页面渲染完毕后又会通过v-if来判断是否渲染，影响性能，不合理
vue3中v-if比v-for优先级更高，想要联合使用可以通过template或者计算属性来操作 
 */