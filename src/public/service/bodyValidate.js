/*
 * bodyValidate(传输内容验证)服务
 * Date: 2017/6/3
 * Author: miaoyu
 */
const { getAllErrorBody } = require('./resBody.js');


/*
 * 验证必填项是否为空
 * mustObj(object) - 必填项参数
 * body(object) - 由req传递回来的body参数对象
 * 返回：(array)必填项缺失数组
 */
const isMustNull = (mustObj, body) => {
    let lackMusts= [];

    // 遍历req传递回来的body对象是否缺少必填项
    Object.keys(mustObj).forEach(key => {
        if (!body[key]) lackMusts.push(`缺少必传参数：${key}`);
    });

    return lackMusts;
};


/*
 * 验证参数类型是否正确
 * query(object) - 内定的参数类型对象
 * body(object) - 由req传递回来的body参数对象
 * 返回：(array)，属性错误的参数数组
 */
const validateParamType = (query, body) => {
    let typeErrors = [];

    Object.entries(query).forEach(function([key, { type }]) {
        const val = body[key];

        if (val !== undefined)
            switch (type) {
                case 'string':
                    if (typeof val !== 'string') typeErrors.push(`传参类型错误：${key}，应该为：string`);
                    break;
                case 'number':
                    if (typeof val !== 'number') typeErrors.push(`传参类型错误：${key}，应该为：number`);
                    break;
                case 'boolean':
                    if (typeof val !== 'boolean') typeErrors.push(`传参类型错误：${key}，应该为：boolean`);
                    break;
                case 'array':
                    if (!(val instanceof Array)) typeErrors.push(`传参类型错误：${key}，应该为：array`);
                    break;
                case 'object':
                    if (!(val instanceof Object)) typeErrors.push(`传参类型错误：${key}，应该为：object`);
                    break;
            };
    });

    return typeErrors;
};


/*
 * 验证参数准确性
 * query(object) - 内定的参数类型对象
 * body(object) - 由req传递回来的body参数对象
 * 返回：(array)，属性错误的参数数组
 */
const validateParam = (mustObj,query,body) => {
    const mustErrors = isMustNull(mustObj, body);

    // 必填项都传了
    if (mustErrors.length === 0) {
        const paramErrors = validateParamType(query, body);

        // 参数类型传递错误
        if (paramErrors.length !== 0) return {
            validate: false,
            body: getAllErrorBody(paramErrors)
        };

        // 验证成功
        return {
            validate: true,
            body: {
                code: 200,
                msg: ''
            }
        };
    };

    // 缺失必填项
    return {
        validate: false,
        body: getAllErrorBody(mustErrors)
    };
};


// 导出模块
module.exports = {
    isMustNull,
    validateParamType,
    validateParam
};
