/*
 * user - config文件
 * Date: 2017-06-01
 * Author: miaoyu
 */
const express = require('express');
const router = express.Router();


// 创建用户
router.post('/createUser', require('./controller/createUser.js').createUser);


// 导出用户模块
module.exports = router;


