const { createApp } = Vue
const app = {
    data() {
        return {
            isShowImg1: false,
            isShowImg2: false
        }
    },
    template: `
    <div>
       <div>
         <img v-if="isShowImg1" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.Y9b6yLkdFg30UIoajiCC6AHaEo?w=290&h=181&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="">
         <img v-show="isShowImg2" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.MzvGvfgvGX0co4c-YkeV2gHaEK?w=322&h=181&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="">
       </div>
       <button @click="showImg1">显示图片1</button>
       <button @click="showImg2">显示图片2</button>
    </div>
    `,
    methods: {
        showImg1() {
            this.isShowImg1 = !this.isShowImg1
        },
        showImg2() {
            this.isShowImg2 = !this.isShowImg2
        }
    }
}
const vm = createApp(app).mount('#app')
