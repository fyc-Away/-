// 数据库页面
const mongoose=require("mongoose");
//连接
mongoose.connect("mongodb://localhost:27017/fyc",{ useNewUrlParser: true ,useUnifiedTopology: true});
//创建连接对象
var db=mongoose.connection;
//监听连接状态
db.on("err",console.error.bind(console,"连接失败"));
db.once("open",()=>console.log("连接成功"))
//实例化Schema对象
var schema=new mongoose.Schema({
    text:String
})
// 设置集合
var col=mongoose.model("text",schema);

//暴露出去
module.exports=col
