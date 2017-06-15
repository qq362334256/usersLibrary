/*
 * 用户入口 - 控制器文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const os = require('os');
const { validateParam } = require('./../../public/services/reqBody.service.js');
const { getPassWordHash } = require('./../../public/utils/math.util.js');
const { getAllErrorBody } = require('./../../public/utils/errorCodeHandle.util.js');
const { mongodb, findOne } = require('./../../public/services/mongodb.service.js');
const { createToken } = require('./../../public/services/signature.service.js');
const { redisSet } = require('./../../public/services/redis.service.js');

createToken();
// 登录
exports.login = (req, res) => {
    let mustPar = { // 必传参数
            phone: { // 手机
                type: 'string'
            },
            password: { // 密码
                type: 'string'
            }
        },
        query = Object.assign({}, mustPar), // 预设值
        params = validateParam(mustPar, query, req.body, res); // 最终得值

    // 全部通过验证服务返回正确的参数才能继续
    if (!params) return;


    // 数据库CURD操作
    const curd = function* (params, res) {
        // 连接数据库集合
        const dbCollection = mongodb.bind('C_USERS');

        const info = yield findOne(dbCollection, {
            res,
            query: { phone: params.phone }
        }).catch(error => console.error(`mongo查询手机号码出错!${error}`));

        // 写入当前唯一token到redis数据库
        const { key, lock, tokenId, userId, createTime } = info;
        return redisSet({
            key: `tokenId-${tokenId}`,
            res,
            val: {
                key,
                lock,
                userId,
                createTime
            },
            outTime: 60 * 60 * 2 // 过期时间2小时
        }).catch(error => console.error(`redis插入token信息出错!${error}`));
    }(params, res);


    // 查询传入的手机号用户是否存在
    curd.next().value.then(({ dbCollection, data }) => {

        // 查询的手机号不存在
        if (!data) {
            dbCollection.close();
            res.send(getAllErrorBody(['登录的账号不存在']));

            return;
        };

        // 判断密码是否正确
        if (getPassWordHash(params.password) !== data.password) {
            dbCollection.close();
            res.send(getAllErrorBody(['登录的密码错误']));

            return;
        };


        // 密码校验成功，进入下一个流
        // 生成token
        const { key, lock, token, tokenId, createTime } = createToken();
        curd.next({
            key,
            lock,
            tokenId,
            createTime,
            userId: params.userId
        }).value.then(data => {

            // 登录成功的操作
            res.send(JSON.stringify({
                data: { token },
                code: 200,
                msg: '登录成功'
            }));
        });
    })


    // 输出信息信息
    // console.log(`ip - ${req.ip}`)
    // console.log(`cpu - ${os.arch()}`)
    // console.log(`cpu线程 - ${os.cpus().forEach(val => console.log(val))}`)
    // console.log(`总内存 - ${os.totalmem()}`)
    // console.log(`剩余内存 - ${os.freemem()}`)
    // console.log(`当前桌面用户 - ${os.homedir()}`)
    // console.log(`主机名 - ${os.hostname()}`)
    // console.log(`当前网络信息 - ${Object.entries(os.networkInterfaces()).forEach(val => console.log(val))}`)
    // console.log(`操作系统 - ${os.platform()} - ${os.release()} - ${os.type()}`)
    // console.log(`用户信息 - ${Object.entries(os.userInfo()).forEach(val => console.log(val))}`)

};


// 注销
exports.logout = (req, res) => {
    console.log(111)

    res.send('logout');
};