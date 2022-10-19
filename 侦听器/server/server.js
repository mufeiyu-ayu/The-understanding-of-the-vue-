const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser') //处理post请求
const { readFileSync } = require('fs')
const { resolve } = require('path')
// const { json } = require('express')
const app = express()
// cors()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next()
})
let myResult = []
app.use(bodyParse.urlencoded({ extended: true })) // 解析post请求参数
app.use(bodyParse.json())

app.post('/getQuestion', (req, res) => {
    const order = req.body.order
    const questionData = JSON.parse(readFileSync(resolve(__dirname, './quersion.json'), 'utf-8'))
    const questionResult = questionData[order]
    if (questionResult) {
        const { id, quersion, items } = questionResult
        res.send({
            errorCode: 0,
            msg: 'OK',
            data: {
                id,
                quersion,
                items
            }
        })
    } else {
        res.send({
            errorCode: 1,
            msg: 'NO_DATA',
            data: myResult
        })
        myResult = []
    }
})
app.post('/uploadAnswer', (req, res) => {
    const { order, myAnswer } = req.body
    const questionData = JSON.parse(readFileSync(resolve(__dirname, './quersion.json'), 'utf-8'))
    const { id, quersion, items, answer } = questionData[order]
    myResult.push({
        qid: id,
        quersion,
        myAnswer: items[myAnswer],
        rightAnswer: items[answer],
        isRight: myAnswer == answer
    })
    res.send({
        errorCode: 0,
        msg: 'OK'
    })
    // res.send(myResult)
})
app.listen('3300', () => {
    console.log('端口号为:http://127.0.0.1:3300')
})
