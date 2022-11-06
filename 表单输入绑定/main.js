const vm = new Vue({
    el: '#app',
    data() {
        return {
            checked: false,
            checkedNames: [],
            picked: '',
            selected: '',
            msg: '',
            age: ''
        }
    },
    template: `
     <div>
        <p>复选框</p>
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>
      <hr>
      <p>复选框</p>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
        <hr>
            <div id="example-4">
        <input type="radio" id="one" value="One" v-model="picked">
        // <label for="one">One</label>
        <br>
        <input type="radio" id="one" value="Two" v-model="picked">
        // <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
        </div>
        <hr>
      <p>
         <select v-model="selected">
            <option disabled value="">请选择</option>
            <option value="h1">A</option>
            <option value="h2">B</option>
            <option value="h3">C</option>
        </select>
        <span>Selected: {{ selected }}</span>
        <hr>
        <div>lazy:{{msg}}</div>
        <input type="text" v-model.lazy="msg">
        <input v-model.number="age" type="number"><span>{{age}}</span>
        <input v-model.trim="msg">1
      </p>1
     </div>
     
    `
})
