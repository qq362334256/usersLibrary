/*
 * 用户 - 控制器文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const uuid = require('uuid');
const { redisGet } = require('./../../public/services/redis.service.js');
const { mongodb, findOne, insert } = require('./../../public/services/mongodb.service.js');
const { validateParam } = require('./../../public/services/reqBody.service.js');
const { getAllErrorBody } = require('./../../public/utils/errorCodeHandle.util.js');
const { getPassWordHash } = require('./../../public/utils/math.util.js');


// 创建用户
exports.createUser = ({ body }, res) => {
    let mustPar = { // 必传参数
            phone: { // 手机号
                type: 'string'
            },
            password: { // 密码
                type: 'string'
            },
            code: { // 验证码
                type: 'string'
            }
        },
        query = Object.assign({ // 预设值
            name: { // 姓名
                type: 'string',
                val: ''
            },
            nickName: { // 昵称
                type: 'string',
                val: ''
            },
            age: { // 年龄
                type: 'number',
                val: 0
            },
            sex: { // 性别
                type: 'string',
                val: ''
            },
            province: { // 省份
                type: 'string',
                val: ''
            },
            city: { // 城市
                type: 'string',
                val: ''
            },
            area: { // 地区
                type: 'string',
                val: ''
            },
            address: { // 地址
                type: 'string',
                val: ''
            },
            idCard: { // 身份证
                type: 'string',
                val: ''
            },
            email: { // 邮箱
                type: 'string',
                val: ''
            },
            qq: { // qq号码
                type: 'number',
                val: ''
            },
            weChat: { // 微信
                type: 'string',
                val: ''
            },
            createTime: { // 创建时间
                type: 'number',
                val: Date.parse(new Date())
            },
            updateTime: { // 修改时间
                type: 'number',
                val: Date.parse(new Date())
            }
        }, mustPar),
        params = validateParam(mustPar, query, body, res); // 最终得值

    // 全部通过验证服务返回正确的参数才能继续
    if (!params) return;


    // 数据库CURD操作
    const curd = function* (params, res) {
        // 连接数据库集合
        const dbCollection = mongodb.bind('C_USERS');

        // 查询缓存数据库，判断创建用户的验证码缓存是否存在
        const findRedisCode = redisGet({
            res,
            key: `phoneVerCode${params.phone}`
        }).catch(error => console.error(`访问redis手机验证码出错!${error}`));

        // 查询mongo数据库，判断创建用户的验证码是否存在
        const findMongoCode = findOne(dbCollection, {
            res,
            query: { code: params.code, phone: params.phone }
        }).catch(error => console.error(`访问mongo手机验证码出错!${error}`));


        // 查询验证码
        const info = yield Promise.all([findRedisCode, findMongoCode]);

        // 插入新建用户信息
        return insert(dbCollection, { res, info }).catch(error => console.error(`创建用户mongo插入出错!${error}`));;
    }(params, res);


    // 判断手机验证码是否匹配成功
    curd.next().value.then(([redisData, { dbCollection, data: mongoData }]) => {

        // 查询不到验证码 - 返回了没必要继续了
        if (!redisData || redisData !== params.code) {
            dbCollection.close();
            res.send(getAllErrorBody(['手机验证码错误']));

            return;
        };

        // 查询userId，如果有userId就说明已经注册了
        if (mongoData && mongoData.userId) {
            dbCollection.close();
            res.send(getAllErrorBody(['该手机号已经注册']));

            return;
        };


        // 没有注册可以进行其他操作
        // 生成 userid / 编译密码
        params.userId = uuid();
        params.password = getPassWordHash(params.password);

        // 用户写数据库
        curd.next(params).value.then(({ dbCollection, result }) => {

            // 关闭数据库 / 返回客户端信息
            dbCollection.close();
            res.send(JSON.stringify({
                code: 200,
                msg: '用户注册成功'
            }));
        });
    });
};