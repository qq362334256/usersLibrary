/*
 * 验证参数工具类
 * Date: 2017/6/9 0009
 * Author: miaoyu
 */
// 参数配置
const validateConfig = {
    phone: {
        name: '手机号',
        patt: /^1(3|4|5|7|8)[0-9]{9}$/
    },
    password: {
        name: '密码',
        patt: /^[0-9a-zA-Z~!@#_]{6,20}$/
    },
    code: {
        name: '验证码',
        patt: /^[0-9a-zA-Z]{4,6}$/
    },
    name: {
        name: '姓名',
        patt: /^[\u4E00-\u9FA5a-zA-Z]{2,10}$/
    },
    nickName: {
        name: '昵称',
        patt: /^[\u4E00-\u9FA5a-zA-Z~!@#_]{0,20}$/
    },
    age: {
        name: '年龄',
        patt: /^[0-9]{1,3}$/
    },
    sex: {
        name: '性别',
        patt: /^(男|女|其他)$/
    },
    province: {
        name: '省份',
        patt: /^[\u4E00-\u9FA5]{2,20}$/
    },
    city: {
        name: '城市',
        patt: /^[\u4E00-\u9FA5]{2,20}$/
    },
    area: {
        name: '地区',
        patt: /^[\u4E00-\u9FA5]{2,20}$/
    },
    address: {
        name: '地址',
        patt: /^[\u4E00-\u9FA5a-zA-Z0-9#]{2,50}$/
    },
    idCard: {
        name: '身份证',
        patt: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
    },
    email: {
        name: '邮箱',
        patt: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    },
    qq: {
        name: 'qq',
        patt: /^[0-9]{3,20}$/
    },
    weChat: {
        name: '微信',
        patt: /^[a-zA-Zd_]{5,}$/
    }
};


/*
 * 是否合法
 * reqBody(object) - 由req传递回来的body参数对象
 * 返回：(array)不合法提示数组
 */
exports.isLegal = (reqBody) => {
    let legals = [];

    // 遍历传递的参数对象是否合法
    Object.entries(reqBody).forEach(([key, val]) => {
        const currPatt = validateConfig[key];

        // 是字符串就删除首尾空
        if (typeof val === 'string') val = val.trim();

        // 存在正则列表中可以验证
        if (currPatt && !currPatt.patt.test(val)) legals.push(`输入的(${currPatt.name})格式不正确`);
    });

    return legals;
};


/*
 * 验证必填项是否为空
 * mustObj(object) - 必填项参数
 * reqBody(object) - 由req传递回来的body参数对象
 * 返回：(array)必填项缺失数组
 */
exports.isMustNull = (mustObj, reqBody) => {
    let lackMusts = [];

    // 遍历req传递回来的body对象是否缺少必填项
    Object.keys(mustObj).forEach(key => {
        if (!reqBody[key]) lackMusts.push(`缺少必传参数：${key}`);
    });

    return lackMusts;
};


/*
 * 验证参数类型是否正确
 * query(object) - 内定的参数类型对象
 * reqBody(object) - 由req传递回来的body参数对象
 * 返回：(array)，属性错误的参数数组
 */
exports.validateParamType = (query, reqBody) => {
    let typeErrors = [];

    Object.entries(query).forEach(function([key, { type }]) {
        const val = reqBody[key];

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
