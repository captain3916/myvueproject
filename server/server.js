const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./Router/apiRouter');
const userRouter = require('./Router/userRouter');

let app = express();

app.use((req, res, next) => {
    res.set({'Access-Control-Allow-Origin':'*'});
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api",apiRouter);
app.use("/user",userRouter);

app.listen(3000);
console.log('服务开始启动了');