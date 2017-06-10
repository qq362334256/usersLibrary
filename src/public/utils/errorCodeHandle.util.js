/*
 * 错误 code 处理工具类
 * Date: 2017/6/9 0009
 * Author: miaoyu
 */
const config = {
    // 通用错误码
    620: '', // 通用可弹出的状态码
    621: '版本升级了！',
    // 前端特有错误状态码
    420: '', // 自定义给开发者看的，前端错误状态码
    421: '授权令牌失效，请重新登录！',
    // 后端特有错误状态码
    520: '', // 自定义给开发者看的，后端错误状态码
    522: '服务器维护中！'
};


/*
 * 获取通用错误主体
 * errorMsgs(array) - 错误的参数集合，默认为[]
 * code(number) - 错误码，默认为620(可以弹出的msg)
 * 返回值：(object)，req的body内容
 */
exports.getAllErrorBody = (errorMsgs = [], code = 620) => {
    let msg = '';

    // 状态码不等于通用的620就去config对象里面取msg信息
    if (code !== 620) {
        const predefineMsg = config[code];

        if (predefineMsg) errorMsgs.push(predefineMsg);
    };

    // 遍历所有的错误码
    errorMsgs.forEach((val, index) => msg += `${index + 1}、${val};`);

    return JSON.stringify({
        code,
        msg: msg === '' ? '1、无法预知的错误，请联系管理员查看;' : msg
    });
};