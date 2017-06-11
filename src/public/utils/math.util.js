/*
 * math 工具类
 * Date: 2017/6/11 0011
 * Author: miaoyu
 */

/*
 * 取指定范围随机数
 * start(number) - 起点值
 * end(number) - 终点值
 * 返回：(number)取得区间的随机数
 */
exports.getRandom = (start, end) => Math.floor(Math.random() * (end - start + 1) + start);
