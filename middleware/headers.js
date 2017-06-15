/*
 * headers(中间件) 配置文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const express = require('express');
const router = express.Router();


// 临时跨域头
router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // 支持跨域头
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); // 支持restful规范
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Token'); // 设置可请求头类型

    next();
});


// 导出res响应头中间件
module.exports = router;