/*
 * mongodb 配置文件
 * Date: 2017-06-01
 * Author: miaoyu
 */
const mongo = require('mongoskin');
const { db_url } = require('./../config.json');


// 导出单例mongo数据库
module.exports = mongo.db(db_url, { native_parser: true });
