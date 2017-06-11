/*
 * 验证码路由配置文件
 * Date: 2017/6/11 0011
 * Author: miaoyu
 */
const express = require('express');
const router = express.Router();


// 获取手机验证码
router.get('/phoneCode', require('./controller/phoneCode.js').getPhoneVerCode);


// 导出用户模块
module.exports = router;