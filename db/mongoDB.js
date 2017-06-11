/*
 * mongodb 配置文件
 * Date: 2017-06-01
 * Author: miaoyu
 */
const mongo = require('mongoskin');
const { MONGODB_URL } = require('./../config.json');


// 导出单例mongo数据库
module.exports = mongo.db(MONGODB_URL, { native_parser: true });
