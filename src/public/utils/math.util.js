/*
 * math 工具类
 * Date: 2017/6/11 0011
 * Author: miaoyu
 */
const crypto = require('crypto');


/*
 * 取指定范围随机数
 * start(number) - 起点值
 * end(number) - 终点值
 * 返回：(number)取得区间的随机数
 */
exports.getRandom = (start, end) => Math.floor(Math.random() * (end - start + 1) + start);


/*
 * 取hash加密后的密码
 * passWord(string) - 需要加密的密码
 * 返回：(string)取得加密后的密码
 */
exports.getPassWordHash = passWord => {
    const sha256 = crypto.createHash('sha256');
    const passStart = 'miaoyu-start';
    const passEnd = 'miaoyu-end'

    // 植入明文密码
    sha256.update(`${passStart}@${passWord}@${passEnd}`);

    // 返回最终加密 hex 的密码
    return sha256.digest('hex')
};
