/*
    模块化
        - 在Node中，一个js文件就是一个模块
        - 在Node中，每一个js文件中的js代码都是独立运行在一个函数中
            而不是全局作用域，所以一个模块中的变量和函数在其他模块中无法访问
*/

console.log('我是一个模块,我是05.模块化CommonJSmodule.js');

export const x = '我是05.CommonJS模块化module.js的x';
export const y = 10;