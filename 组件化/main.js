const MyHeader = {
    template: `
     <div>
       <h1>子组件</h1>
     </div>
    `
}
const vm = new Vue({
    el: '#app',
    data() {
        return {
            a: 1
        }
    },
    template: `
      <div>
      <my-header/>        
      </div>
    `,
    components: {
        MyHeader
    }
})
