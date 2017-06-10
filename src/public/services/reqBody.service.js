/*
 * 响应主体预操作服务
 * Date: 2017/6/9 0009
 * Author: miaoyu
 */
 const { isMustNull, validateParamType } = require('./../utils/validateParams.util.js');
 const { getAllErrorBody } = require('./../utils/errorCodeHandle.util.js');


/*
 * 获取完整的参数
 * query(object) - 内定的参数类型对象
 * body(object) - 由req传递回来的body参数对象
 * 返回值：(object)，写入数据库需要的完整参数
 */
const getFullParam = (query, reqBody) => {
    let params = {};

    Object.keys(query).forEach(key => {
        const currVal = reqBody[key];

        params[key] = currVal ? currVal : query[key].val;
    });

    return params;
};


/*
 * 验证请求主体参数准确性
 * 要是验证失败会直接返回错误返回体
 * mustObj(object) - 必须传入的参数类型对象
 * query(object) - 内定的参数类型对象
 * reqBody(object) - 由req传递回来的body参数对象
 * res(obj) - 返回信息的载体
 * 返回：(object) - 返回完整的查询参数体
 */
const validateParam = (mustObj, query, reqBody, res) => {
    const mustErrors = isMustNull(mustObj, reqBody);

    // 必填项都传了
    if (mustErrors.length === 0) {
        const paramErrors = validateParamType(query, reqBody);

        // 所有参数类型合法
        if (paramErrors.length === 0) return getFullParam(query, reqBody);

        // 有参数验证不合法
        res.send(getAllErrorBody(paramErrors, 420));
    };

    // 缺失必填项
    res.send(getAllErrorBody(mustErrors, 420));
};


// 导出服务模块
module.exports = {
    getFullParam,
    validateParam
};