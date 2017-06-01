/*
 * 创建用户 - 控制器文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const db = require('./../../../DB/mongoDB.js');


// 创建用户
exports.createUser = (req, res) => {
    console.log(111)

    res.send('createUser');
};
