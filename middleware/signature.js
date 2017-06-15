/*
 * signature(中间件) 配置文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const express = require('express');
const router = express.Router();
const { } = require('./../src/public/services/signature.service.js');


// 配置不用校验的接口
const configAPI = [
    '/verCode/phoneCode',
    '/users/userEntry'
];


router.all('*', function({ originalUrl, method, headers }, res, next) {
    // 如果是options或者非校验接口直接到下一步
    if (configAPI.indexOf(originalUrl) > -1 || method === 'OPTIONS') {
        next();

        return;
    };

    // 如果是需要校验权限的接口则开始校验
    const tokenPatt = /^[0-9a-zA-Z\.=\+\,\?]$/;
    const token = headers['access-token'];
    console.log(token)

    // const curd = function* () {
    //
    // }(req, res);

    next()
});


// 导出res响应头中间件
module.exports = router;