const express = require('express')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const app = express()

// 解决跨域
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

app.get('/getTeachers', (req, res) => {
    const teacherData = JSON.parse(readFileSync(resolve(__dirname, './data/teachers.json'), 'utf8'))
    console.log(teacherData)

    res.send(teacherData)
})
app.get('/getStudents', (req, res) => {
    const studentData = JSON.parse(readFileSync(resolve(__dirname, './data/students.json'), 'utf8'))
    res.send(studentData)
})
app.listen(8080, (err) => {
    if (!err) {
        console.log('地址为http://127.0.0.1:8080')
    }
})
