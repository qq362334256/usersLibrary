/*
 * 用户入口 - 控制器文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const db = require('./../../../DB/mongoDB.js');


// 登录
exports.login = (req, res) => {
    console.log(111)

    res.send('login');
};


// 注销
exports.logout = (req, res) => {
    console.log(111)

    res.send('logout');
};