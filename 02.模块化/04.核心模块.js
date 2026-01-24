// 核心模块，是node中自带的模块，可以在node中直接使用
// window 是浏览器的宿主对象 node中是没有的
// global 是node中的全局对象，作用类似于window
// ES标准下，全局对象的标准名应该是 globalThis

// console.log(globalThis === global);

/*
    核心模块
        process
            - 表示当前的node进程
            - 通过该对象可以获取进程的信息，或者对进程做各种动作
            - 如何使用
                1. process是一个全局变量，可以直接使用
                2. 有哪些属性和方法：
                    process.exit() 
                        -结束当前进程
                    process.nextTick(callback[,...args]) 
                        -将函数插入到 tick队列中
                        -tick队列中的代码，会在下一次事件循环之前执行
                            会在会认为队列和宏任务队列之前执行
                调用栈
                tick队列
                微任务队列
                宏任务队列
*/
// console.log(111);
// process.exit();
// console.log(222);

setTimeout(() => {
    console.log(1);//宏任务队列
})

queueMicrotask(() => {
    console.log(2);
})//微任务队列

process.nextTick(() => {
    console.log(3);
})

console.log(4);//调用找
