const { createApp } = Vue
const app = {
    data() {
        return {
            a: 1,
            b: 2
        }
    },
    template: `
    <span>{{ a }}</span>
     <span>+</span>
    <span>{{ b }}</span>
    <span>=</span>
    <span>{{getTotal}}</span>
    `,
    computed: {
        getTotal() {
            return this.a + this.b
        }
    }
}
createApp(app).mount('#app')
