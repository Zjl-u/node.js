/*
    path
        - 表示的路径
        - 通过path可以用来获取各种路径
        - 要使用path，需要先对其进行引入
        - 方法：
            path.resolve([...paths])
                - 用来生成一个绝对路径
                    相对路径：./xxx ../xxx xxx
                    绝对路径：
                        - 在计算机本地
                            c:\xxx
                            /user/xxx
                        - 在网络中
                            http://www.xxx/...
                            https://www.xxx/...
                    -如果直接调用resolve，则返回当前的工作目录
                        C:\Users\zjl\Desktop\node

                        node .\01.path.js
                        C:\Users\zjl\Desktop\node\03.包管理器
                        -注意：我们通过不同的方式执行代码时，它的工作目录是有可能发生变化的

                    -如果将一个相对路径作为参数，
                        则resolve会自动将其转换为绝对路径
                        此时根据工作目录不同，它所产生的绝对路径也不同

                    -一般会将一个绝对路径作为第一个参数，
                        一个相对路径作为第二个参数
                        这样它会自动计算出最终的路径
*/
import path from "node:path";
import { fileURLToPath } from "node:url";

// const result = path.resolve()

// C: \Users\zjl\Desktop\node\hello.js
// const result = path.resolve('./hello.js')

// const result = path.resolve('C: \\Users\\zjl\\Desktop\\node\\hello.js', './hello.js');


// 最终形态
// // 以后在使用路径时，尽量通过path.resolve()来生成路径
// const result = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./hello.js")
// console.log(result);


/*
    fs（File System）
        -fs用来操作磁盘中的文件
        -文件操作也就是所谓的I/O,input output
        -使用fs模块，同样需要引入
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
import fs from 'node:fs/promises'
import { buffer } from "node:stream/consumers";
// fs.readFile(path.resolve(path.dirname(fileURLToPath(import.meta.url))), './hello.txt')
//     .then(buffer => {
//         console.log(buffer.toString());
//     })
//     .catch(e => {
//         console.log('出错了');

//     })
(async () => {
    try {
        const filePath = path.resolve(
            path.dirname(fileURLToPath(import.meta.url)), // 第一个参数：当前文件目录（绝对路径）
            './hello.txt' // 第二个参数：目标文件（相对路径），与上一个参数拼接
        );
        const buffer = await fs.readFile(filePath)
        console.log(buffer.toString());
    } catch (e) {
        console.log('出错了');
    }
})()