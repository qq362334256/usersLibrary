/*
 * bodyValidate(传输内容验证)服务
 * Date: 2017/6/3 0003
 * Author: miaoyu
 */


/*
 * 验证参数类型是否正确
 */
exports.validateParamType = () => {

};



/*
 * 验证必填项是否为空
 */
exports.isMustNull = (mustObj, param) => {
    Object.keys(mustObj).forEach(key => console.log(key))
};
