import express from 'express'
import path from "path"
import { fileURLToPath } from 'url'
import fs from "fs"
import fsPromises from 'fs/promises'
import studentRoute from './routes/student.js'

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))


app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))
app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.urlencoded())

// 使路由生效
app.use("/student", studentRoute)

app.use((req, res) => {
    res.status(404).send("<h1>您访问的页面被外星人劫持了</h1>")
})

app.listen(3000, () => {
    console.log('服务器已启动');

})