const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://127.0.0.1:27017";
const async = require('async');

let router = express.Router();
/**
 * 用户注册接口
 * @param {String} userName
 * @param {String} userPsw
 */
//地址: http://localhost:3000/user/register
router.post("/register", (req, res) => {
  console.log("收到了注册请求!");
  let userName = req.body.userName;
  let userPsw = req.body.userPsw;

  let result = {};

  MongoClient.connect(URL, {useNewUrlParser: true}, (err, client) => {
    if (err) {
      console.log(err);
      result.code = 1;
      result.msg = '网络繁忙,请稍后!';
      res.json(result);
      return;
    }

    let db = client.db("maizuo");
    async.series([
      function(cb) {
        db.collection("users").find({userName}).count().then(
          (num) => {
            if (num === 0) cb(null);
            else cb('用户名已经存在!');
          },
          (err) => cb(err)
        )
      },
      function(cb) {
        db.collection('users').insertOne({userName,userPsw}, (err) => {
          if (err) cb('数据库写入失败!');
          else cb(null);
        });
      }
    ], (err, data) => {
      if(err) {
        result.code = 1;
        result.msg = err;
      } else {
        result.code = 0;
        result.msg = '注册成功!';
      }
      client.close();
      res.json(result);
    });
  });
});

/**
 * 用户登录接口
 * @param {String} userName
 * @param {String} userPsw
 */
//地址: http://localhost:3000/user/login
router.post("/login", (req, res) => {
  console.log("收到了登录请求!");
  let userName = req.body.userName;
  let userPsw = req.body.userPsw;

  let result = {};

  MongoClient.connect(URL, {useNewUrlParser: true}, (err, client) => {
    if (err) {
      console.log(err);
      result.code = 1;
      result.msg = '网络繁忙,请稍后!';
      res.json(result);
      return;
    }

    let db = client.db("maizuo");
    db.collection("users").find({userName, userPsw}).count().then(
      (num) => {
        if (num === 0) {
          result.code = 0;
          result.msg = '用户名或密码错误!';
        }
        else if(num === 1) {
          result.code = 0;
          result.msg = '登录成功!';
          result.userName = userName;
        }
        client.close();
        res.json(result);
      },
      (err) => {
        console.log(err);
        result.code = 1;
        result.msg = '数据库连接错误!';
        client.close();
        res.json(result);
      }
    )
  });
});


module.exports = router;
