/*
 * API - server启动文件
 * Date: 2017-05-24
 * Author: miaoyu
 */
const express = require('express');
const app = express();
const middlewares = require('./middleware/basic.js');
const { host, port } = require('./config.json');


// 使用中间件
app.use([...middlewares]);





app.get('/', (req, res) => res.send('get请求'));

app.listen(port, host, () => console.log('API服务启动，端口号为：5001'));
