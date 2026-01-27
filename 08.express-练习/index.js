import express from 'express'
import path from "path"
import { fileURLToPath } from 'url'
import fs from "fs"
import fsPromises from 'fs/promises'

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let STUDENT_ARR = []
try {
    // 同步读取JSON文件（服务器启动时执行，不影响后续逻辑）
    const jsonContent = fs.readFileSync(
        path.resolve(__dirname, 'data/students.json'), // 绝对路径，避免歧义
        'utf8' // 指定编码，防止中文乱码
    )
    STUDENT_ARR = JSON.parse(jsonContent) // 解析为JavaScript数组
} catch (err) {
    // 容错处理：文件不存在/格式错误时，初始化空数组（不崩溃）
    console.warn('JSON文件读取失败，初始化空学生数组：', err.message)
    STUDENT_ARR = []
}

// 将ejs设置为默认引擎
app.set("view engine", "ejs")

// 配置模版路径
app.set("views", path.resolve(__dirname, "views"))

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")))

// 配置请求体解析
app.use(express.urlencoded())

app.get("/students", (req, res) => {

    res.render("students", { stus: STUDENT_ARR })
})

// 创建一个添加学生信息的路由
app.post("/add-student", (req, res) => {

    // 生成一个id
    const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1

    // 1.获取用户填写的信息
    const newUser = {
        id,
        name: req.body.name,
        age: +req.body.age,
        gender: req.body.gender,
        adress: req.body.adress
    }

    // 2.验证用户信息（略）

    // 3.将用户信息添加到数组中
    STUDENT_ARR.push(newUser)

    // 4.返回响应
    // res.send('添加成功')
    // 直接在添加路由中渲染js，会面临表单重复提交的问题
    // res.render('students',{stus:STUDENT_ARR})

    // 将新的数据写入到json文件里
    fsPromises.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR, null, 2) // 格式化写入，JSON文件更易读
    );
    // res.redirect()用来发起重定向
    // 重定向的作用是告诉浏览器向另外一个地址再次发生一次请求
    res.redirect('/students');

})

// 删除一个学生信息的路由
app.get('/delete', (req, res) => {
    // 获取需要删除的学生的id
    const id = +req.query.id

    // 根据id删除学生
    STUDENT_ARR = STUDENT_ARR.filter(stu => stu.id !== id)

    // 将新的数组写入到文件中
    fsPromises.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR, null, 2) // 格式化写入，JSON文件更易读
    );
    // res.redirect()用来发起重定向
    // 重定向的作用是告诉浏览器向另外一个地址再次发生一次请求
    res.redirect('/students');
})

// 修改一个学生信息的路由
app.get('/to-update', (req, res) => {
    const id = +req.query.id
    // 获取要修改的学生信息
    const student = STUDENT_ARR.find(item => item.id === id)

    res.render('update', { student })
})

app.post('/update-student', (req, res) => {
    // 获取id
    // const id = req.query.id

    const { id, name, age, gender, adress } = req.body
    const studentId = +id

    // 修改学生信息
    // 根据学生id获取学生对象
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

// 可以在所有路由的后边配置错误路由
app.use((req, res) => {
    // 只要这个中间体一执行，说明上面的地址都没匹配
    res.status(404)
    res.send("<h1>您访问的地址已被外星人劫持</h1>")
})

app.listen(3000, () => {
    console.log('服务器已启动');

})