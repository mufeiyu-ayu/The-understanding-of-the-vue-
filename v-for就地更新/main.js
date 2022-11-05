const vm = new Vue({
    el: '#app',
    data() {
        return {
            list: [
                { id: 1, value: 'item-1' },
                { id: 1, value: 'item-2' },
                { id: 1, value: 'item-3' }
            ]
        }
    },
    template: `
      <div>
        <ul>
          <li v-for="(item,index) of list">
            <span>{{item.value}}</span>
            <button @click="deleteItem(index)">Delete</button>
          </li>
        </ul>
      </div>
    `,
    methods: {
        deleteItem(index) {
            this.list.splice(index, 1)
        }
    }
})
