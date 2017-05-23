const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const compression = require('compression');
const morgan = require('morgan');
const responseTime = require('response-time');
const timeouts = require('connect-timeout');


// 使用中间件
app.use(morgan('tiny')); // 日志中间件
app.use(timeouts('6s')); // 设置超时时间
app.use(compression()); // 压缩数据，这个中间件必须放在最前面
app.use(bodyParser.json()); // 解析 application/json 请求方式
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded 请求方式
app.use(responseTime()); // 设置响应的时间
// app.use(multer()); // 解析 multipart/form-data 请求方式(文件上传)


// 设置



app.get('/', (req, res) => res.send('get请求'));

app.listen('5001', () => console.log('API服务启动，端口号为：5001'));
