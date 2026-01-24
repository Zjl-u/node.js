/*
    默认情况下，node中的模块化标准是CommonJS
        要想使用ES模块化，可以采用以下两种方案
            1.使用mjs作为扩展名
            2.修改package.json将模块化规范设置为ES模块
                当我们设置"type":"module" 当前项目下所有js文件都默认为es module
*/

// 导入模块,es模块不能省略扩展名（官方标准）
// import { a, b, c } from './03.m1.mjs'

// 通过as来指定别名
// import { a as hello, b, c } from './03.m1.mjs'

// 开发时要尽量避免import*
// import * as m1 from './03.m1.mjs'
// console.log(m1.c);

// 默认导出,可以随意命名
import sum, { a, b, c } from './03.m1.mjs'

// 通过ES模块化导入的内容都是常量
// ES模块运行在严格模式下
// ES模块化，在浏览器中同样支持，但是我们通常不会直接使用
//                  通常会结合打包工具使用
console.log(a);

