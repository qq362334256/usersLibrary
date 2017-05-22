const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const { json: parJson, urlencoded: parUrlencoded } = require('body-parser');
const multer = require('multer');
const compression = require('compression');
const morgan = require('morgan');


// 使用中间件
app.use(morgan('tiny')); // 日志中间件
app.use(compression()); // 压缩数据，这个中间件必须放在最前面
app.use(parJson()); // 解析 application/json 请求方式
app.use(parUrlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded 请求方式
app.use(multer()); // 解析 multipart/form-data 请求方式


// 设置



app.get('/', (req, res) => res.send('get请求'));

app.listen('5001', () => console.log('API服务启动，端口号为：5001'));
