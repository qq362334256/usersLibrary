/*
 * user 路由配置文件
 * Date: 2017-06-01
 * Author: miaoyu
 */
const express = require('express');
const router = express.Router();


// 创建用户
router.post('/user', require('./controller/user.js').createUser);


// 登录 / 注销
const { login, logout } = require('./controller/userEntry.js');
router.post('/userEntry', login);
router.delete('/userEntry', logout);


// 导出用户模块
module.exports = router;