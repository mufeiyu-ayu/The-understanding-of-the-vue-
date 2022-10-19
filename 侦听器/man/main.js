const { createApp } = Vue
let qs = Qs

const app = {
    data() {
        return {
            order: 0,
            questionData: {},
            myAnswer: -1,
            myResult: []
        }
    },
    template: `
        <div>
           <div v-if="myResult.length > 0">
              <h1>考试结果</h1>
              <ul>
                <li v-for="(item,index) of myResult" :key="item.qid">
                   <h2>编号</h2>
                   <p>题目:{{ item.quersion }}</p>
                   <p>你的答案:{{ item.myAnswer }}</p>
                   <p>正确答案{{ item.rightAnswer }}</p>
                   <p>正确?{{ item.isRight ? 'yes' :'no' }}</p>
                </li>
              </ul>
           </div>
           <div v-else>
           <h1>编号：{{questionData.id}}</h1>
           <p>{{ questionData.quersion }}</p>
              <button 
                 v-for="(item,index) of questionData.items"
                 :key="item.id"
                 @click="selectAnswer(index)">
                 {{item}}
              </button>           
           </div>
        </div>
    `,
    mounted() {
        this.getQuestion(this.order)
    },
    watch: {
        order(newOrder, oldOrder) {
            this.uploadAnswer(oldOrder, this.myAnswer)
            this.getQuestion(newOrder)
        }
    },
    methods: {
        getQuestion(order) {
            axios.post('http://127.0.0.1:3300/getQuestion', qs.stringify({ order })).then((value) => {
                // console.log(value.data.errCode)

                if (value.data.errorCode) {
                    this.myResult = value.data.data
                    console.log(this.myResult)
                    return
                }
                this.questionData = value.data.data
            })
        },
        uploadAnswer(order, myAnswer) {
            axios.post('http://127.0.1:3300/uploadAnswer', qs.stringify({ order, myAnswer })).then((res) => {
                // console.log(res.data)
            })
        },
        selectAnswer(index) {
            this.myAnswer = index
            this.order += 1
        }
    }
}
createApp(app).mount('#app')
