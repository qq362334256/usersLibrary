/*
 * 手机验证码 - 控制器
 * Date: 2017/6/11 0011
 * Author: miaoyu
 */
const { redisSet, redisGet } = require('./../../public/services/redis.service.js');
const { validateParam } = require('./../../public/services/reqBody.service.js');
const { getRandom } = require('./../../public/utils/math.util.js');


// 获取手机验证码
exports.getPhoneVerCode = ({ query: body }, res) => {
    let mustPar = { // 必传参数
            phone: { // 手机号
                type: 'string'
            }
        },
        query = Object.assign({}, mustPar); // 预设值
        params = validateParam(mustPar, query, body, res); // 最终得值


    // 全部通过验证服务返回正确的参数才能继续
    if (!params) return;


    // 手机验证码gennetor函数
    const curd = function* ({ phone }, res) {

        // 验证码的缓存时长，1为1秒
        const outTime = 60 * 10;
        // 随机码
        const randomNum = getRandom(1000, 9999).toString();

        // 读取当前手机号的验证码信息
        yield redisGet({
            res,
            key: `phoneVerCode-${phone}`
        }).catch(error => console.error(`redis读取当前手机号验证码是否存在出错！${error}`));

        // 写入验证码
        return redisSet({
            res,
            outTime,
            key: `phoneVerCode-${phone}`,
            val: randomNum
        }).then(() => randomNum)
          .catch(error => console.error(`redis写入当前手机号请求的验证码出错！${error}`));
    }(params, res);


    // 查询请求手机号在redis中是否存在
    curd.next().value.then(data => {

        if (!data) {
            // 查询不到就写入新的验证码
            curd.next().value.then(data => {

                // 返回验证码
                res.send(JSON.stringify({
                    data,
                    code: 200,
                    msg: 'success'
                }));
            });
        } else {
            // 查询到了就返回验证码
            res.send(JSON.stringify({
                data,
                code: 200,
                msg: 'success'
            }));
        };
    });
};
