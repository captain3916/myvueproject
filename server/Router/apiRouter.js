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
 * 获取所有城市信息接口
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
 * 获取城市ID
 */
//地址: http://localhost:3000/api/getcityId
router.get("/getcityId",(req,res)=>{
    console.log('收到了查询城市ID的请求');
    let name = req.query.cityName;
    console.log(name);
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

module.exports = router;