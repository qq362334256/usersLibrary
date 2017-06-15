/*
 * signature(中间件) 配置文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const express = require('express');
const router = express.Router();
const { signatureToken } = require('./../src/public/services/signature.service.js');


// 所有请求都会经过签名服务
router.all('*', signatureToken);


// 导出res响应头中间件
module.exports = router;