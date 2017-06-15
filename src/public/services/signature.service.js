/*
 * 签名服务
 * Date: 2017/6/14 0014
 * Author: miaoyu
 */
const crypto = require('crypto');
const uuid = require('uuid');
const { getRandom } = require('./../utils/math.util.js');


/*
 * 解码token
 * token(string) - 保存在客户端token串
 * 返回：(object) - payload信息体和signature签名钥匙
 */
const undoToken = token => {
    const [payload, signature] = token.split('.');

    return {
        signature,
        payload: JSON.parse(Buffer.from(payload, 'base64').toString())
    };
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
 */
exports.createToken = () => {
    // 生成当前token的唯一id /  / 当前的时间戳
    const tokenId = uuid().replace(/-/g, '');
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






