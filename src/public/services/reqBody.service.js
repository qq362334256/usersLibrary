/*
 * 响应主体预操作服务
 * Date: 2017/6/9 0009
 * Author: miaoyu
 */



/*
 * 验证请求主体参数准确性
 * mustObj(object) - 必须传入的参数类型对象
 * query(object) - 内定的参数类型对象
 * reqBody(object) - 由req传递回来的body参数对象
 * 返回：(array)，属性错误的参数数组
 */
const validateParam = (mustObj, query, reqBody) => {
    const mustErrors = isMustNull(mustObj, body);

    // 必填项都传了
    if (mustErrors.length === 0) {
        const paramErrors = validateParamType(query, body);

        // 参数类型传递错误
        if (paramErrors.length !== 0) return {
            validate: false,
            body: getAllErrorBody(paramErrors, 420)
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
        body: getAllErrorBody(mustErrors, 420)
    };
};