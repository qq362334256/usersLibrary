/*
 * 验证参数工具类
 * Date: 2017/6/9 0009
 * Author: miaoyu
 */


/*
 * 验证必填项是否为空
 * mustObj(object) - 必填项参数
 * body(object) - 由req传递回来的body参数对象
 * 返回：(array)必填项缺失数组
 */
exports.isMustNull = (mustObj, body) => {
    let lackMusts = [];

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
exports.validateParamType = (query, body) => {
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
