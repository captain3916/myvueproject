const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://127.0.0.1:27017";
const async = require('async');

let router = express.Router();
/**
 * 获取电影信息接口
 */
//地址: http://localhost:3000/api/getfilms
router.get("/getFilms",(req,res)=>{
    console.log('收到了电影列表请求')
    let pageSize = +req.query.pageSize || 5; //每页数量
    let pageNum = +req.query.pageNum || 1;  //请求的页码
    let type = +req.query.type || 1; //请求电影的类型,1为正在热映,2为即将上映
    let result = {}; //要返回的数据

    //连接数据库
    MongoClient.connect(URL,{useNewUrlParser:true},(err,client)=>{
        if(err){
            console.log(err);
            result.code = 1;
            result.msg = '网络繁忙,请稍后';
            res.json(result);
            return;
        }
        let param = {}; //查找的类型
        if(type === 1){
            param = { premiereAt : {$lt: (+new Date())/1000}}
        }else{
            param = { premiereAt : {$gte : (+new Date())/1000}}
        }
        let db = client.db('maizuo')
        async.waterfall([
            function(cb){
                db.collection('films').find(param).count((err,num)=>{
                    if(err) cb(err);
                    else cb(null,num);
                });
            },
            function(num,cb){
                db.collection('films').find(param).limit(pageSize).skip(pageSize*(pageNum-1)).toArray((err,data)=>{
                    if(err) cb(err);
                    else cb(null,{num,data});
                });
            }
        ],(err,data)=>{
            if(err){
                console.log(err);
                result.code = 1;
                result.msg = '网络繁忙,请稍后';
            }else{
                result.code = 0;
                result.msg = 'OK';
                result.data = {
                    films: data.data,
                    total:data.num //电影总数量
                }
            }
            client.close();
            res.json(result);
        });
    });
});

/**
 * 获取某部电影信息
 * @param {String} filmId 电影Id
 */
//地址: http://localhost:3000/api/getfilmItem
router.get("/getfilmItem",(req,res)=>{
    console.log('收到了获取某一部电影的请求')
    let filmId = +req.query.filmId; //每页数量
    let result = {}; //要返回的数据

    //连接数据库
    MongoClient.connect(URL,{useNewUrlParser:true},(err,client)=>{
        if(err){
            console.log(err);
            result.code = 1;
            result.msg = '网络繁忙,请稍后';
            res.json(result);
            return;
        }
        let db = client.db('maizuo')
        db.collection('films').findOne({filmId}, (err,data)=>{
            if(err){
                console.log(err);
                result.code = 1;
                result.msg = '网络繁忙,请稍后';
            }else{
                result.code = 0;
                result.msg = 'OK';
                result.data = data;
            }
            client.close();
            res.json(result);
        });
    });
});

/**
 * 获取所有城市
 */
//地址: http://localhost:3000/api/getcitys
router.get("/getcitys",(req,res)=>{
    console.log('收到了城市列表请求')
    let result = {}; //要返回的数据

    //连接数据库
    MongoClient.connect(URL,{useNewUrlParser:true},(err,client)=>{
        if(err){
            console.log(err);
            result.code = 1;
            result.msg = '网络繁忙,请稍后';
            res.json(result);
            return;
        }
        let db = client.db('maizuo');
        db.collection('citys').find().toArray((err, data) =>{
            if(err){
                console.log(err);
                result.code = 1;
                result.msg = '网络繁忙,请稍后';
            }else{
                result.code = 0;
                result.msg = 'OK';
                result.data = {
                    citys: data,
                }
            }
            client.close();
            res.json(result);
        });
    });
});

/**
 * 获取某个城市ID
 * @param {string} 城市名称
 */
//地址: http://localhost:3000/api/getcityId
router.get("/getcityId",(req,res)=>{
    let name = req.query.cityName;
    let result = {}; //要返回的数据

    //连接数据库
    MongoClient.connect(URL,{useNewUrlParser:true},(err,client)=>{
        if(err){
            console.log(err);
            result.code = 1;
            result.msg = '网络繁忙,请稍后';
            res.json(result);
            return;
        }
        let db = client.db('maizuo');
        db.collection('citys').findOne({ name }, (err, data) =>{
            if(err){
                console.log(err);
                result.code = 1;
                result.msg = '网络繁忙,请稍后';
            }else{
                result.code = 0;
                result.msg = 'OK';
                result.city = data;
            }
            client.close();
            res.json(result);
        });
    });
});

/**
 * 获取某个城市所有影院
 * @param {string} cityId:城市ID
 */
//地址: http://localhost:3000/api/getCinemas
router.get("/getCinemas",(req,res)=>{
    let cityId = +req.query.cityId;
    let result = {}; //要返回的数据

    //连接数据库
    MongoClient.connect(URL,{useNewUrlParser:true},(err,client)=>{
        if(err){
            console.log(err);
            result.code = 1;
            result.msg = '网络繁忙,请稍后';
            res.json(result);
            return;
        }
        let db = client.db('maizuo');
        db.collection('cinemas').find({ cityId }).toArray((err, data) =>{
            if(err){
                console.log(err);
                result.code = 1;
                result.msg = '网络繁忙,请稍后';
            }else{
                result.code = 0;
                result.msg = 'OK';
                result.data = {
                    cinemas: data,
                };
            }
            client.close();
            res.json(result);
        });
    });
});

module.exports = router;
