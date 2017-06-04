/*
 * reqBody(返回内容)服务
 * Date: 2017/6/4
 * Author: miaoyu
 */
const config = {
    // 通用错误码
    620: '', // 这里的msg由当时的状态自定义
    621: '版本升级了！', // 前后端版本升级
    // 前端特有错误状态码
    420: '授权令牌失效，请重新登录！', // token失效
    // 后端特有错误状态码
    520: '服务器维护中！', // 服务器维护
};


/*
 * 获取通用错误主体
 */
const getAllErrorBody = errorMsgs => {
    let msg = '';

    // 遍历所有的错误码
    errorMsgs.forEach((val, index) => msg += `${index + 1}、${val};`);

    return {
        code: 620,
        msg
    };
};


/*
 * 获取客户端错误主体
 */
const getClientErrorBody = () => {

};


/*
 * 获取后端错误主体
 */
const getServerErrorBody = () => {

};


// 导出模块
module.exports = {
    getAllErrorBody,
    getClientErrorBody,
    getServerErrorBody
};