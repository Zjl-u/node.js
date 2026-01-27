import express from 'express'
import path from "path"
import { fileURLToPath } from 'url'
import fs from "fs"
import fsPromises from 'fs/promises'

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let STUDENT_ARR = []
try {
    const jsonContent = fs.readFileSync(
        path.resolve(__dirname, 'data/students.json'),
        'utf8'
    )
    STUDENT_ARR = JSON.parse(jsonContent)
} catch (err) {
    console.warn('JSON文件读取失败，初始化空学生数组：', err.message)
    STUDENT_ARR = []
}

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))
app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded())
app.get("/students", (req, res) => {

})

app.get('/to-update', (req, res) => {
    const id = +req.query.id
    const student = STUDENT_ARR.find(item => item.id === id)
    res.render('update', { student })
})
app.post('/update-student', (req, res) => {
    const { id, name, age, gender, adress } = req.body
    const studentId = +id
    const student = STUDENT_ARR.find(item => item.id === studentId)
    student.name = name
    student.age = +age
    student.gender = gender
    student.adress = adress

    fsPromises.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR, null, 2)
    );
    res.redirect('/students');

})

app.use((req, res) => {
    res.status(404)
    res.send("<h1>您访问的地址已被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log('服务器已启动');

})