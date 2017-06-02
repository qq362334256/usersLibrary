/*
 * API - server启动文件
 * Date: 2017-05-24
 * Author: miaoyu
 */
const express = require('express');
const app = express();
const middlewares = require('./middleware/basic.js');
const { host, port } = require('./config.json');


// 临时跨域头
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    next();
});



// 使用中间件
app.use([...middlewares]);

// app.get('/', (req, res) => {
// 	res.send('get请求');
// });


// 引入用户模块路由
app.use('/users' ,require('./src/users/router.config.js'));





app.listen(port, host, () => console.log(`API服务启动，地址为：http://${host}:${port}`));
