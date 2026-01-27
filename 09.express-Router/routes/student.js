import express from 'express'
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'

// 创建router对象
const router = express.Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let STUDENT_ARR = []
try {
    const jsonContent = fs.readFileSync(
        path.resolve(__dirname, '../data/students.json'), // 拼接正确的绝对路径
        'utf8' // 指定编码，防止中文乱码
    )
    STUDENT_ARR = JSON.parse(jsonContent) // 解析为可修改的数组
    console.log('成功读取学生数据，共${STUDENT_ARR.length}条');
} catch (err) {
    console.warn('学生JSON文件读取失败，初始化空数组：', err.message)
    STUDENT_ARR = [] // 容错：读取失败仍初始化空数组，避免程序崩溃
}

// 学生列表的路由
router.get('/list', (req, res) => {
    res.render("students", { stus: STUDENT_ARR })
})

// 添加学生的路由
router.post("/add", (req, res) => {
    const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1
    const newUser = {
        id,
        name: req.body.name,
        age: +req.body.age,
        gender: req.body.gender,
        adress: req.body.adress
    }
    STUDENT_ARR.push(newUser)
    fsPromises.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR, null, 2)
    );
    res.redirect('/students/list');
})

// 删除学生的路由
router.get('/delete', (req, res) => {
    const id = +req.query.id
    STUDENT_ARR = STUDENT_ARR.filter(stu => stu.id !== id)
    fsPromises.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR, null, 2)
    );
    res.redirect('/students');
})


// 将router暴露到模块外
export default router