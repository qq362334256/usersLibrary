/*
 * mongodb服务
 * Date: 2017/6/11 0011
 * Author: miaoyu
 */
const mongodb = require('./../../../db/mongoDB.js');


/*
 * 查询单条数据
 * dbCollection(object) - 数据库连接集合后的对象
 * { res(object) - req返回体对, query(object) - 查询对象 }
 * 返回：pomise对象
 */
const findOne = (dbCollection, { res, query }) => new Promise((resolve, reject) => {

    // 查询服务器单条数据
    dbCollection.findOne(query, (error, data) => {

        // 数据库查询失败没必要继续了
        if (error) {
            dbCollection.close();
            res.send(getAllErrorBody(['数据库查询出错'], 520));
            reject(error);

            return;
        };

        // 成功返回
        resolve({ dbCollection, data });
    });
});


const insert = (dbCollection, { res, info }) => new Promise((resolve, reject) => {

    // 插入文档到集合
    dbCollection.insert(info, (error, result) => {

        // 数据库插入失败没必要继续了
        if (error) {
            dbCollection.close();
            res.send(getAllErrorBody(['数据库插入出错'], 520));
            reject(error);

            return;
        };

        // 成功返回
        resolve({ dbCollection, result });
    });
});


// 导出mongodb服务
module.exports = {
    mongodb,
    findOne,
    insert
};
