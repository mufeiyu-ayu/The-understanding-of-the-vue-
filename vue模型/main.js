/* 
加减计数器
Model -> data -> a b s r
         watch -> data change ->update view

view -> template -> render
controller -> event trigger -> model/data

*/

;(function () {
    function init() {
        model.init() // 组织数据 + 数据监听操作 / 数据代理
        view.render() // 组织HTML模板 + 渲染HTML模板
        controller.init() // 事件处理函数定义与绑定
    }
    var model = {
        data: {
            a: 0,
            b: 0,
            s: '+',
            r: 0
        },
        init: function () {
            var _this = this
            for (let k in _this.data) {
                Object.defineProperty(_this, k, {
                    get() {
                        return _this.data[k]
                    },
                    set(newValue) {
                        _this.data[k] = newValue
                        view.render({ [k]: newValue }) // 当改变值的同时，更新数据以及更新页面
                    }
                })
            }
        }
    }

    var view = {
        el: '#app',
        template: `
        <p>
           <span class="cal-a">{{ a }}</span>
           <span class="cal-s">{{ s }}</span>
           <span class="cal-b">{{ b }}</span>
           <span>=</span>
           <span class="cal-r">{{ r }}</span>
        </p>
        <p>
           <input type="text" placeholder="Number a" class="cal-input a"><br/>
           <input type="text" placeholder="Number b" class="cal-input b">
        </p>        
        <p>
           <button class="cal-btn">+</button> 
           <button class="cal-btn">-</button> 
           <button class="cal-btn">*</button> 
           <button class="cal-btn">/</button> 
        </p>
        `,
        render(mutedData) {
            // 不存在直接渲染页面
            if (!mutedData) {
                this.template = this.template.replace(/\{\{(.*?)\}\}/g, function (node, key) {
                    return model[key.trim()]
                })

                var container = document.createElement('div')
                container.innerHTML = this.template
                document.querySelector(this.el).appendChild(container)
            } else {
                for (var key in mutedData) {
                    document.querySelector('.cal-' + key).textContent = mutedData[key]
                }
            }
        }
    }

    var controller = {
        init() {
            var oCalInputs = document.querySelectorAll('.cal-input'),
                oBtns = document.querySelectorAll('.cal-btn'),
                btnItem,
                inputItem

            for (let i = 0; i < oCalInputs.length; i++) {
                inputItem = oCalInputs[i]
                inputItem.addEventListener('input', this.handleInput, false)
            }

            for (let i = 0; i < oBtns.length; i++) {
                btnItem = oBtns[i]
                btnItem.addEventListener('click', this.handleBtnClick, false)
            }
        },
        handleInput(e) {
            var tar = e.target,
                value = Number(tar.value),
                filed = tar.className.split(' ')[1]

            model[filed] = value
            with (model) {
                r = eval('a' + s + 'b')
            }
        },
        handleBtnClick(e) {
            var type = e.target.textContent
            model.s = type
            with (model) {
                r = eval('a' + s + 'b')
            }
        }
    }
    init()
})()
