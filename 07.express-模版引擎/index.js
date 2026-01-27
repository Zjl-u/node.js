import express from 'express'
import path from "path"
import { fileURLToPath } from 'url'

const app = express()

const STUDENT_ARR = [
    {
        name: '孙悟空',
        age: 18,
        gender: "男",
        adress: "花果山"
    }, {
        name: '猪八戒',
        age: 28,
        gender: "男",
        adress: "高老庄"
    }, {
        name: '沙和尚',
        age: 38,
        gender: "男",
        adress: "流沙河"
    }
]

let name = "猪八戒"

// 将ejs设置为默认引擎
app.set("view engine", "ejs")

// 配置模版路径
app.set("views", path.resolve(
    path.dirname(
        fileURLToPath(import.meta.url))
    , "views"))

// 配置静态资源路径
app.use(express.static(
    path.resolve(
        path.dirname(
            fileURLToPath(import.meta.url)
        ), "public"
    )
))

// 配置请求体解析
app.use(express.urlencoded())

app.get('/hello', (req, res) => {
    res.send('hello')
})

app.get("/students", (req, res) => {
    // 希望用户在访问students路由时，可以给用户返回一个显示有学生信息的页面
    /*
        html页面属于静态页面，创建的时候什么样子，用户看到就是什么样子
            不会自动跟随服务器中数据的变化而变化

        希望有一个东西长得像网页，但是能嵌入变量
            这个东西在node中叫 模版

        在node中存在很多模版引擎，各具特色，推荐用 ejs

        ejs是node中的一款模版引擎，使用步骤：
            1.安装ejs     yarn add ejs
            2.配置express的模版引擎为ejs        app.set("view engine","ejs")
            3.配置模版路径  app.set("views", path.resolve(path.dirname(fileURLToPath(import.meta.url)), "views"))
            
            
            注意，模版引擎需要被express渲染后使用

    */
    // res.render()用来渲染一个模版引擎，并将其返回给浏览器
    // 可以将一个对象作为render的第二个参数，这样在模版里可以访问到对象中的数据
    // res.render("students", { name: "孙悟空", age: 18 })
    // <%= %>在ejs中输出内容时，它会自动对字符串中的特殊符号进行转译  &lt;
    //  这个设计主要是为了避免 xss 攻击
    // <%- %> 直接原样输出
    // <% %>  可以在其中直接编写js代码，js代码会在服务器中执行
    res.render("students", { name })
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