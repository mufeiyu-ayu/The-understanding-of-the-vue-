var Vue = (function () {
    function Vue(options) {
        this.$el = document.querySelector(options.el)
        this.$data = options.data()
        this._init(this, options.template, options.methods)
    }
    Vue.prototype._init = function (vm, template, methods) {
        const container = document.createElement('div')
        container.innerHTML = template
        const showPoll = new Map()
        const eventPoll = new Map()
        initData(vm, showPoll) // data数据劫持
        initPoll(container, methods, showPoll, eventPoll)
        bindEvent(vm, eventPoll)
        render(vm, showPoll, container)
    }
    // data数据劫持
    function initData(vm, showPoll) {
        const _data = vm.$data

        for (let key in _data) {
            Object.defineProperty(vm, key, {
                get() {
                    return _data[key]
                },
                set(newValue) {
                    _data[key] = newValue
                    update(vm, key, showPoll)
                }
            })
        }
    }
    // 将dom与数据关联
    function initPoll(container, methods, showPoll, eventPoll) {
        const allNodes = container.getElementsByTagName('*')
        let dom = null
        for (let i = 0; i < allNodes.length; i++) {
            dom = allNodes[i]
            let vIfData = dom.getAttribute('v-if'),
                vShowData = dom.getAttribute('v-show'),
                vEvent = dom.getAttribute('@click')

            if (vIfData) {
                showPoll.set(dom, {
                    type: 'if',
                    prop: vIfData
                })
                dom.removeAttribute('v-if')
            } else if (vShowData) {
                showPoll.set(dom, {
                    type: 'show',
                    prop: vShowData
                })
                dom.removeAttribute('v-show')
            }
            if (vEvent) {
                eventPoll.set(dom, methods[vEvent])
                dom.removeAttribute('@click')
            }
        }
    }
    // 为节点绑定事件函数
    function bindEvent(vm, eventPoll) {
        for (let [dom, handler] of eventPoll) {
            vm[handler.name] = handler // 挂载到vue实例
            dom.addEventListener('click', vm[handler.name].bind(vm), false)
        }
    }

    // 渲染页面
    function render(vm, showPoll, container) {
        var _data = vm.$data
        var _el = vm.$el
        for (let [dom, info] of showPoll) {
            switch (info.type) {
                case 'if':
                    info.comment = document.createElement('v-if')
                    // 当为false的时候就替换节点
                    !_data[info.prop] && dom.parentNode.replaceChild(info.comment, dom)

                    break
                case 'show':
                    // 初始化让dom与属性关联
                    !_data[info.prop] && (dom.style.display = 'none')
                    break
                default:
                    break
            }
        }
        _el.appendChild(container)
    }
    // 更新
    function update(vm, key, showPoll) {
        var _data = vm.$data
        for (let [dom, info] of showPoll) {
            if (info.prop === key) {
                switch (info.type) {
                    case 'if':
                        !_data[key]
                            ? dom.parentNode.replaceChild(info.comment, dom)
                            : info.comment.parentNode.replaceChild(dom, info.comment)
                        break
                    case 'show':
                        !_data[info.prop] ? (dom.style.display = 'none') : dom.removeAttribute('style')
                    default:
                        break
                }
            }
        }
    }
    return Vue
})()

const vm = new Vue({
    el: '#app',
    data() {
        return {
            isShowImg1: false,
            isShowImg2: false
        }
    },
    template: `
       <div>
         <img v-if="isShowImg1" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.Y9b6yLkdFg30UIoajiCC6AHaEo?w=290&h=181&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="">
         <img v-show="isShowImg2" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.MzvGvfgvGX0co4c-YkeV2gHaEK?w=322&h=181&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="">
       </div>
       <button @click="showImg1">显示图片1</button>
       <button @click="showImg2">显示图片2</button>
    `,
    methods: {
        showImg1() {
            this.isShowImg1 = !this.isShowImg1
        },
        showImg2() {
            this.isShowImg2 = !this.isShowImg2
        }
    }
})
console.log(vm)
