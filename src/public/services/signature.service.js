/*
 * 签名服务
 * Date: 2017/6/14 0014
 * Author: miaoyu
 */
const crypto = require('crypto');
const { getRandom } = require('./../utils/math.util.js');
const { getAllErrorBody } = require('./../utils/errorCodeHandle.util.js');
const { redisGet } = require('./redis.service.js');


// 配置不用校验的接口
const configAPI = [
    '/verCode/phoneCode',
    '/users/user',
    '/users/userEntry'
];


/*
 * 解码token
 * token(string) - 保存在客户端token串
 * 返回：(object) - payload信息体和signature签名钥匙
 */
const undoToken = token => {
    const [payload, signature] = token.split('.');

    try {
        return {
            signature,
            payload: JSON.parse(Buffer.from(payload, 'base64').toString())
        };
    } catch(error) {
        console.log(`参入的token非法，${error}`);

        return {
            signature: '',
            payload: { tokenId: 'made' }
        };
    }
};


/*
 * 获取锁
 * key(string) - 保存在redis中的token唯一钥匙
 * tokenKey(string) - 保存在客户端token的钥匙
 * 返回：(string) - 生成的唯一锁
 */
const getLock = (key, tokenKey) => crypto.createHash('sha256').update(key + tokenKey).digest('hex');


/*
 * 获取token
 * userId(string) - 将用户的userId传入即可
 */
exports.createToken = userId => {
    // 生成当前token的唯一id / 当前的时间戳 / 当前随机数 / 加密规则
    const tokenId = userId.replace(/-/g, '');
    const createTime = new Date().getTime();
    const random = getRandom(0, 999999999);
    const encrypt = createTime.toString() + random.toString();


    // 生成 payload 载体
    const payload = Buffer.from(JSON.stringify({
        tokenId,
        type: 'JWT',
        iss: 'miaoyu-basics'
    })).toString('base64');

    // 生成当前token的(签名)(放在客户端的一把钥匙)
    const signature = crypto.createHmac('sha256', encrypt).update(payload).digest('base64');

    // 生成当前储存在服务端的唯一钥匙
    const key = crypto.createHmac('sha256', encrypt).update(JSON.stringify({
        tokenId,
        type: 'JWT',
        iss: 'miaoyu-basics',
        author: 'miaoyu'
    })).digest('hex');

    // 生成当前token的唯一锁
    const lock = crypto.createHash('sha256').update(key + signature).digest('hex');

    // 返回token
    return {
        key,
        lock,
        tokenId,
        createTime,
        token: `${payload}.${signature}`
    };
};


/*
 * 签名token
 * req(object) - 流进来的res对象
 * res(object) - 流进来的res对象
 * next(function) - 流进来的next方法
 */
exports.signatureToken = ({ path, method, headers }, res, next) => {
    const token = headers['access-token'];

    // 如果是options或者非校验接口直接到下一步
    if (configAPI.indexOf(path) > -1 || method === 'OPTIONS') {
        next();

        return;
    };

    // token不存在无法进入校验
    if (!token) {
        res.send(getAllErrorBody(['没有经过签名无法授权'], 620));

        return;
    };

    // 如果token被恶意修改拦截流入
    if (!/^[0-9a-zA-Z\+=\.\/\,:\?;]+$/.test(token)) {
        res.send(getAllErrorBody(['会玩哦，你继续改签名，我也不让你过'], 620));

        return;
    };


    // 执行查询tokenId是否存在redis服务中
    const { signature, payload: { tokenId } } = undoToken(token);
    redisGet({ res, key: `tokenId-${tokenId}` })
        .catch(error => console.error(`redis查询tokenId出错!${error}`))
        .then(data => {

            // 查询不到说明token时效了
            if (!data) {
                res.send(getAllErrorBody([], 421));

                return;
            };

            // 获取锁比对失败
            if (!getLock(data.key, signature) === data.lock) {
                res.send(getAllErrorBody([], 421));

                return;
            };


            // 签名没有问题，可以进入下一个流
            next();
        });
};