/*
 * middleware(中间件) 配置文件
 * Date: 2017-05-24
 * Author: miaoyu
 */
const { json: parJson, urlencoded: parUrlencoded } = require('body-parser');
const multer = require('multer');
const compression = require('compression');
const morgan = require('morgan');
const responseTime = require('response-time');
const timeouts = require('connect-timeout');


//  导出中间件模块
module.exports = [
	morgan(':method :url :status :res[content-length] - :response-time ms - :date'),  // 日志中间件
	timeouts('15s'),  // 设置超时时间
	compression(),   // 压缩数据，这个中间件必须放在最前面
    parUrlencoded({ extended: true }),  // 解析 application/x-www-form-urlencoded 请求方式
	parJson(), // 解析 application/json 请求方式
	responseTime(), // 设置响应的时间
	// multer() // 解析 multipart/form-data 请求方式(文件上传)
];