/*
 * 用户 - 控制器文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const db = require('./../../../DB/mongoDB.js');
const { isMustNull } = require('./../../public/service/bodyValidate.js');


isMustNull({

});


// 创建用户
exports.createUser = (req, res) => {
    db.bind('DB_USERS');
    db.DB_USERS.find().toArray(function() {
        res.send(arguments);
        db.close();
    });
};
