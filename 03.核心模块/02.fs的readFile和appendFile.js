/*
    fs（File System）
        -fs用来操作磁盘中的文件
        -文件操作也就是所谓的I/O,input output
        -使用fs模块，同样需要引入
*/

/*
    fs.appendFile()创建新文件，或将数据添加到已有文件中
    fs.mkdir()创建目录
    fs.rmdir()删除目录
    fs.rm()删除文件
    fs.rename()重命名
    fs.copyFile()复制文件
*/

// import fs from 'node:fs'
// import { buffer } from "node:stream/consumers";

// readFileSync()同步的读取文件的方法，会阻塞后边代码的执行
// 当我们通过fs模块读取磁盘中的数据时，读到的数据总会以Buffer对象的形式返回
// Buffer是一个临时用来存储数据的缓冲区
// const buf = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), './hello.txt'))
// console.log(buf.toString());

// readFile()异步的读取文件的方法
// fs.readFile(
//     path.resolve(path.dirname(fileURLToPath(import.meta.url)), './hello.txt'),
//     (err, buffer) => {
//         if (err) {
//             console.log('出错了');
//         } else {
//             console.log(buffer.toString());

//         }
//     }
// )
// console.log('后续代码');


/*
    Promise版本的fs方法
*/
// import fs from 'node:fs/promises'
// fs.readFile(path.resolve(path.dirname(fileURLToPath(import.meta.url))), './hello.txt')
//     .then(buffer => {
//         console.log(buffer.toString());
//     })
//     .catch(e => {
//         console.log('出错了');

//     })
// (async () => {
//     try {
//         const filePath = path.resolve(
//             path.dirname(fileURLToPath(import.meta.url)), // 第一个参数：当前文件目录（绝对路径）
//             './hello.txt' // 第二个参数：目标文件（相对路径），与上一个参数拼接
//         );
//         const buffer = await fs.readFile(filePath)
//         console.log(buffer.toString());
//     } catch (e) {
//         console.log('出错了');
//     }
// })()

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from "node:url";

// fs.appendFile(
//     path.resolve(path.dirname(fileURLToPath(import.meta.url)), './hello.txt'),
//     '，天气真好'
// ).then(r => {
//     console.log(r);
//     console.log('添加成功');
// })

// 复制一个文件
// "C:\Users\zjl\Desktop\ppt背景\1.jpg"
fs.readFile("C:\\Users\\zjl\\Desktop\\ppt背景\\1.jpg")
    .then(buffer =>
        fs.appendFile(
            path.resolve(path.dirname(fileURLToPath(import.meta.url)), './haha.jpg'),
            buffer
        ))
    .then(() => {
        console.log('操作结束');
    })

