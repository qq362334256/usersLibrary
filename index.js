const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

// 使用中间件
app.use(bodyParser.json()); // 解析 application/json 请求方式
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded 请求方式
app.use(multer()); // 解析 multipart/form-data 请求方式






app.get('/', (req, res) => res.send('get请求'));

app.listen('5001', () => console.log('API服务启动，端口号为：5001'));
