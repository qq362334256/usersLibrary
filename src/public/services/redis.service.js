/*
 * redis服务
 * Date: 2017/6/11 0011
 * Author: miaoyu
 */
const redisClient = require('./../../../db/redis.js');
const { getAllErrorBody } = require('./../utils/errorCodeHandle.util.js');

/*
 * 写入key
 * { key(string) - 键名，val(all) - 键值, res(object) - req返回体对, [outTime](number) - 设置键的有效时长 }
 * 返回：pomise对象
 */
exports.redisSet = ({ key, val, res, outTime }) => new Promise((resolve, reject) => {

    // 写入redis数据库
    redisClient.set(key, JSON.stringify(val), (error, info) => {

        // 数据库写入出错
        if (error) {
            res.send(getAllErrorBody(['redis数据库写入失败！'], 520));
            // 设置失败返回的状态
            reject(error);

            return;
        };


        // 如果传入时效缓存，则设置当前的key为时效的
        if (outTime) redisClient.expire(key, outTime);

        // 设置成功返回的状态
        resolve(info);
    });
});


/*
 * 读取key
 * { key(string) - 键名, res(object) - req返回体对 }
 * 返回：pomise对象
 */
exports.redisGet = ({ key, res }) => new Promise((resolve, reject) => {

    // 写入redis数据库
    redisClient.get(key, (error, data) => {

        // 数据库查询出错
        if (error) {
            res.send(getAllErrorBody(['redis数据库读取出错！'], 520));

            // 设置失败返回的状态
            reject(error);

            return;
        };

        // 设置成功返回的状态
        resolve(JSON.parse(data));
    });
});


/*
 * 删除key
 * { key(string) - 键名, res(object) - req返回体对 }
 * 返回：pomise对象
 */
exports.redisDel = ({ key, res }) => new Promise((resolve, reject) => {

    // 写入redis数据库
    redisClient.del(key, (error, data) => {

        // 数据库查询出错
        if (error) {
            res.send(getAllErrorBody(['redis数据库删除出错！'], 520));

            // 设置失败返回的状态
            reject(error);

            return;
        };

        // 设置成功返回的状态
        resolve(JSON.parse(data));
    });
});;

