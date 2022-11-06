function fn(a, b) {}

{
    "type": "Program",
    "body": [
        {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "fn"
            },
            "params": [
                {
                    "type": "Identifier",
                    "name": "a"
                },
                {
                    "type": "Identifier",
                    "name": "b"
                }
            ],
            "body": {
                "type": "BlockStatement",
                "body": []
            },
            "generator": false,
            "expression": false,
            "async": false
        }
    ],
    "sourceType": "script"
}

<div id="app" style="color: red;font-size: 20px;">hello     {{name}}
  <h1>{{ name }}</h1>
  <ul>
    <li style="color: green">{{ age }}</li>
    <li>{{ info.job }}</li>
  </ul>
</div>

webpack   import -> require()

ts -> js

eslint

{
  tag: 'div',
  type: 1,
  attrs: [
    {
      name: 'id', value 'app',
    },
    {
      name: 'style', 
      value: {
        color: " red", 
        font-size: " 20px"
      }
    }
  ],
  children: [
    {
      type: 3, 
      text: 'hello'
    },
    {
      type: 1,
      tag: 'h1',
      attrs: null,
      children: [
        {
          type: 3,
          text: '{{name}}'
        }
      ]
    }
  ]
}

虚拟DOM
