// 创建服务器
const express=require("express");
const app=express();
// 引用路由
var router=require("./router/router");
app.use("/",(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    // 千万千万千万不要忘了
    next()
    }) 
app.use("/user",router);
//设置监听
app.listen(9999);