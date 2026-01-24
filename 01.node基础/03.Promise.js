/*
    异步必须要用回调函数来返回数据

    -Promise可以解决异步的回调函数的问题
    -Promise是一个存储数据的容器
        有一套特殊存取数据的方式，使他可以存储异步调用的结果
*/

// 创建Promise
// 创建Promise时，构造函数中需要一个函数作为参数
// Promise构造函数的回调函数，它会在创建Promise时调用，调用时会有两个参数传递进去
const promise = new Promise((resolve, reject) => {
    // resolve和reject是两个函数，通过这两个函数可以向Promise存储数据
    // resolve在执行正常时存储数据，reject在执行错误时存储数据
    // resolve('哈哈');
    // setTimeout(() => {
    //     resolve('哈哈');
    // }, 2000)
    throw new Error('哈哈，出错了');
});
// console.log(promise);

/*
    从Promise读取数据
        -可以通过Promise实例方法then来读取Promise中存储的数据
        -then需要两个回调函数作为参数，回调函数用来获取Promise中的数据
            通过resolve存储的数据，会调用第一个函数返回
            通过reject存储的数据或出现异常时，会调用第二个函数返回
*/
promise.then((result) => {
    console.log('promise中的数据', result);

}, (reason) => {
    console.log('数据', reason);
})

/*
    Promise维护了两个隐藏属性：
        PromiseResult
            -用来储存数据
        
        PromiseState
            -记录Promise的状态（三种状态）
                pending（进行中）
                fulfilled（完成）   resolve存储
                rejected（拒绝，出错了） reject存储或出错了
            -state只能修改一次，修改后永远不会变
*/ 