import fs from 'node:fs/promises'
import path from "node:path"
import { fileURLToPath } from "node:url";

/*
    fs.appendFile()创建新文件，或将数据添加到已有文件中
    fs.mkdir()创建目录
    fs.rmdir()删除目录
    fs.rm()删除文件
    fs.rename()重命名
    fs.copyFile()复制文件
*/

/*
    mkdir可以接收一个 配置对象作为第二个参数
        通过该对象可以对方法功能进行配置
            recursive默认值为false
                -设置true以后，会自动创建不存在的上一级目录
*/

// fs.mkdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./hello/abc"), { recursive: true })
//     .then(r => {
//         console.log('操作成功');
//     })
//     .catch(err => {
//         console.log('创建失败');
//     })

// fs.rmdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./hello"), { recursive: true })
//     .then(r => {
//         console.log('删除成功');
//     })

fs.rename(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./haha.jpg"),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./an.jpg")
).then(r => {
    console.log('重命名成功');
})