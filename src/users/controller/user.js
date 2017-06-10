/*
 * 用户 - 控制器文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const db = require('./../../../DB/mongoDB.js');
const uuid = require('uuid');
const { validateParam } = require('./../../public/services/reqBody.service.js');
const { getAllErrorBody } = require('./../../public/utils/errorCodeHandle.util.js');


// 数据库CURD操作
const dbCurdGenneroter = function* (params) {
    // 连接数据库
    db.bind('T_USERS');

    // 查询验证码
    const data = yield new Promise(
        (resolve, reject) => db.DB_USERS.findOne(
            { code: params.code }, (error, data) => {
                console.log(error)
                console.log(data)

                if (error) {
                    // 数据库查询失败没必要继续了
                    db.close();
                    reject(error);
                    res.send(getAllErrorBody(['数据库查询出错'], 520));

                    return;
                };

                resolve({db, data});
            }
        )
    );
};


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
                type: 'number'
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
        params = validateParam(mustPar, query, body, res);


    // 全部通过验证服务返回正确的参数才能继续
    if (!params) return;


    const curd = dbCurdGenneroter(params);

    // 查询验证是否存在 / 查询是否和手机号匹配
    curd.next();


    // const connectMongo = function* () {
    //
    //
    //
    //
    //     yield new Promise(
    //         (resolve, reject) => db.DB_USERS.update(
    //             { _id: data._id }, query, (error, result) => {
    //                 if (error) {
    //                     // 数据库查询失败没必要继续了
    //                     db.close();
    //                     res.send(getAllErrorBody(['数据库写入失败'], 520));
    //                     reject(error);
    //
    //                     return;
    //                 };
    //
    //                 resolve({db, result});
    //             }
    //         )
    //     )
    // };

    // const g = connectMongo();
    // g.next().value.then(({db, data}) => {
    //     // 查询不到验证码 - 返回了没必要继续了
    //     if (!data || !data.phone) {
    //         db.close();
    //         res.send(getAllErrorBody(['手机验证码错误']));

    //         return;
    //     };

    //     // 查询userId，判断手机号是否注册了
    //     if (data.userId) {
    //         db.close();
    //         res.send(getAllErrorBody(['该手机号已经注册']));

    //         return;
    //     };

    //     // 没有注册可以进行其他操作
    //     // 生成userid / companyId / companyName
    //     query.userId = uuid();
    //     query.companyId = '123456';
    //     query.companyName = '喵鱼';

    //     // 执行下一个流
    //     g.next(data).value.then(({db, result}) => {
    //         // 添加成功信息
    //         reqBody.msg = '用户注册成功！'

    //         // 关闭数据库 / 返回客户端信息
    //         db.close();
    //         res.send(JSON.stringify(reqBody));
    //     });
    // })




    //
    // // 判断验证码是否匹配
    // db.DB_USERS.findOne({ code: query.code }, (error, data) => {
    //     if (error) {
    //         // 数据库查询失败没必要继续了
    //         db.close();
    //         res.send(getAllErrorBody(['数据库查询出错'], 520));
    //
    //         return;
    //     };
    //
    //     // 查询不到验证码 - 返回了没必要继续了
    //     if (!data || !data.phone) {
    //         db.close();
    //         res.send(getAllErrorBody(['手机验证码错误']));
    //
    //         return;
    //     };
    //
    //     // 查询userId，判断手机号是否注册了
    //     if (data.userId) {
    //         db.close();
    //         res.send(getAllErrorBody(['该手机号已经注册']));
    //
    //         return;
    //     };
    //
    //
    //     // 没有注册可以进行其他操作
    //     // 生成userid / companyId / companyName
    //     query.userId = uuid();
    //     query.companyId = '123456';
    //     query.companyName = '喵鱼';
    //
    //     // 修改数据库生成新数据
    //     db.DB_USERS.update({ _id: data._id }, query, (error, result) => {
    //         if (error) {
    //             // 数据库查询失败没必要继续了
    //             db.close();
    //             res.send(getAllErrorBody(['数据库写入失败'], 520));
    //
    //             return;
    //         };
    //
    //         // 添加成功信息
    //         reqBody.msg = '用户注册成功！'
    //
    //         // 关闭数据库 / 返回客户端信息
    //         db.close();
    //         res.send(JSON.stringify(reqBody));
    //     });
    // });
};