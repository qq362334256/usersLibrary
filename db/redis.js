/*
 * redis - config文件
 * Date: 2017/6/11 0011
 * Author: miaoyu
 */
const redis = require('redis');
const { redis: { port, host } } = require('./../config.json');
const redisClient = redis.createClient({ host, port });


// redis服务启动成功！
redisClient.on('ready', () => console.log('redis启动成功！'));

// redis服务关闭了！
redisClient.on('error', () => console.log('redis关闭了！'))

// 错误处理
redisClient.on('error', error => console.error(`redis服务器连接出错,错误：${error}`))


// 导出单例redis数据库
module.exports = redisClient;
