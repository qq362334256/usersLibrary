/*
 * mongodb 配置文件
 * Date: 2017-06-01
 * Author: miaoyu
 */
const mongo = require('mongoskin');
const { mongo_url: MONGODB_URL } = require('./../config.json');


// 输出日志
console.log('mongodb连接成功！');

// 导出单例mongo数据库
module.exports = mongo.db(MONGODB_URL, { native_parser: true });
