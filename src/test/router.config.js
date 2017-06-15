/*
 * test 路由配置文件
 * Date: 2017-06-01
 * Author: miaoyu
 */
const express = require('express');
const router = express.Router();


// debug
const { getDebug, putDebug, postDebug, deleteDebug } = require('./controller/debug.js');
router.get('/debug', getDebug);
router.put('/debug', putDebug);
router.post('/debug', postDebug);
router.delete('/debug', deleteDebug);


// 导出用户模块
module.exports = router;