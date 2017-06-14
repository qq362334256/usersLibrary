/*
 * 签名服务
 * Date: 2017/6/14 0014
 * Author: miaoyu
 */
const crypto = require('crypto');
const uuid = require('uuid');
const { getRandom } = require('./../utils/math.util.js');


/*
 * 获取token
 */
exports.createToken = () => {
    // 生成当前token的唯一id
    const tokenId = uuid();

    // 生成 payload 载体
    const payload = crypto.createHash('sha256').update(JSON.stringify({
        tokenId,
        type: 'JWT',
        iss: 'miaoyu-basics'
    })).digest('base64');

    // 生成当前token唯一钥匙
    const key = crypto.createHash('sha256').update(JSON.stringify({
        tokenId,
        type: 'JWT',
        author: 'miaoyu',
        iss: 'miaoyu-basics',
        random: getRandom(0, 999999999)
    })).digest('hex');

    // 生成当前token的锁(签名)
    const signature = crypto.createHmac('sha256', key).update(payload).digest('base64');

    // 返回token
    return {
        key,
        tokenId,
        createTime: Date.parse(new Date()),
        token: `${payload}.${signature}`
    };
};
