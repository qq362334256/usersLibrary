/*
 * 响应主体预操作服务
 * Date: 2017/6/9 0009
 * Author: miaoyu
 */
const { isMustNull, validateParamType, isLegal } = require('./../utils/validateParams.util.js');
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
        const currVal = reqBody[key] || query[key].val;

        // 字符串删前后空格
        params[key] = typeof currVal === 'string' ? currVal.trim() : currVal;
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

        // 有参数类型验证不合法
        const paramErrors = validateParamType(query, reqBody);
        if (paramErrors.length !== 0) {
            res.send(getAllErrorBody(paramErrors, 420));

            return;
        };

        // 有参数格式验证不合法
        const legalErrors = isLegal(reqBody);
        if (legalErrors.length !== 0) {
            res.send(getAllErrorBody(legalErrors, 420));

            return;
        };


        // 所有参数类型合法
        return getFullParam(query, reqBody);
    };

    // 缺失必填项
    res.send(getAllErrorBody(mustErrors, 420));
};


// 导出服务模块
module.exports = {
    getFullParam,
    validateParam
};