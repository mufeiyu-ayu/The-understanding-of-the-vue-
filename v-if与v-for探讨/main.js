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
