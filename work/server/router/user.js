// 登录注册数据库
const mongoose=require("mongoose");
//连接
mongoose.connect("mongodb://localhost:27017/fyc",{ useNewUrlParser: true ,useUnifiedTopology: true });
// 创建连接对象
const db=mongoose.connection;
// 判断连接状态
db.on("err",console.error.bind(console,"连接失败"));
db.once("open",()=>console.log("连接成功,卧室登录注册"));
// 创建Schema对象
const schema=new mongoose.Schema({
    uname:String,
    upass:String
});
//创建集合
const user=new mongoose.model("users",schema);
module.exports=user;
