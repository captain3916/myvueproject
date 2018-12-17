const express = require('express');
const apiRouter = require('./Router/apiRouter');

let app = express();

app.use("/api",apiRouter);


app.listen(3000);
console.log('服务开始启动了');