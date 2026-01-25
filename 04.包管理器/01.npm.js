/*
    package.json
        -package.json是包的描述文件
        -node中通过该文件对项目进行描述
        -每一个node项目必须有package.json
    命令
        npm init 初始化项目，创建package.json文件（需要回答问题）
        npm init -y 初始化项目，创建package.json文件（所有值都采用默认值）
        npm initall 包名 将指定包下载到当前项目中
            install 时发生了什么？
                1.将包下载到当前项目的node_modules目录下
                2.会在package.json的dependencies属性中添加一个新属性
                    "loash": "^4.17.23"
                3.会自动添加package-lock.json文件

        npm install 自动安装所有依赖
        npm install 包名 -g 全局安装
            -全局安装是将包安装到计算机中
            -全局安装的通常都是一些工具
        
        npm uninstall 包名 卸载
*/

/*
    引入从npm下载的包时，不需要书写路径，直接写包名即可
*/

/*
    package.json
        script:
            -可以自定义一些命令
            -定义以后可以直接通过npm来执行这些命令
            -start和test可以直接通过npm start   npm test执行
            -其他命令需要通过npm run xxx 执行
    
    npm 镜像
        -npm的仓库的服务器位于国外，有时候不好使
        -为了解决这个问题，可以在npm中配置一个镜像服务器
        -npm镜像的配置：
            1.在系统中安装cnpm（不推荐）
                npm install -g cnpm --registry=https://registry.npmmirror.com
            2.彻底修改npm仓库地址
                npm set registry https://registry.npmmirror.com
                -还原到原版仓库
                npm config delete registry
*/

import lodash from "lodash"
console.log(lodash);
