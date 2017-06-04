/*
 * paramsOperate(参数操作)服务
 * Date: 2017/6/4 0004
 * Author: miaoyu
 */


/*
 * 获取完整的参数
 * query(object) - 内定的参数类型对象
 * body(object) - 由req传递回来的body参数对象
 * 返回值：(object)，写入数据库需要的完整参数
 */
const getFullParam = (query, body) => {
    let params = {};

    Object.keys(query).forEach(key => {
        const currVal = body[key];

        params[key] = currVal ? currVal : query[key].val;
    });

    return params;
};


// 导出模块
module.exports = {
    getFullParam
};