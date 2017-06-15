/*
 * API - server启动文件
 * Date: 2017-05-24
 * Author: miaoyu
 */
const express = require('express');
const app = express();
const { host, port } = require('./config.json');


// 使用核心中间件
app.use([...require('./middleware/basic.js')]);

// headers头中间件
app.use(require('./middleware/headers.js'));

// 签名校验中间件
app.use(require('./middleware/signature.js'));


// 引入测试路由
app.use('/test' ,require('./src/test/router.config.js'));

// 引入验证码模块路由
app.use('/verCode' ,require('./src/verCode/router.config.js'));

// 引入用户模块路由
app.use('/users' ,require('./src/users/router.config.js'));


// 启动服务
app.listen(port, host, () => console.log(`API服务启动，地址为：http://${host}:${port}`));
