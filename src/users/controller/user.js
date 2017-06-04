/*
 * 用户 - 控制器文件
 * Date: 2017/6/2 0002
 * Author: miaoyu
 */
const db = require('./../../../DB/mongoDB.js');
const { validateParam } = require('./../../public/service/bodyValidate.js');


// 创建用户
exports.createUser = ({ body }, req) => {
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
        query = Object.assign({ // 全部参数
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
            }
        }, mustPar);


    // 验证传递参数的准确性
    const validates = validateParam(mustPar, query, body);
    // 验证失败，直接返回错误状态
    if (!validates.validate) {
        req.send(validates.resBody);

        return;
    };


    // 绑定数据库
    db.bind('DB_USERS');

    // 判断验证码是否匹配
    db.DB_USERS.findOne(
        { code: 1234 },
        (error, data) => {
            if (error) {
                // 这里做数据库查询失败的操作

                return;
            } else {
                console.log(data)
                // db.DB_USERS.findOne({ code: query.code }).toArray(function() {
                //     console.log(arguments)
                // });
            };
        }
    );
};