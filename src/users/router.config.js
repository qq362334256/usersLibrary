/*
 * user 路由配置文件
 * Date: 2017-06-01
 * Author: miaoyu
 */
const express = require('express');
const router = express.Router();


// 注册用户
router.post('/user', require('./controller/user.js').createUser);


// 登录 / 刷新登录 / 注销
const { login, refresh, logout } = require('./controller/userEntry.js');
router.post('/userEntry', login);
router.put('/userEntry', refresh);
router.delete('/userEntry', logout);


// 导出用户模块
module.exports = router;