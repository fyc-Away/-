// 创建路由
const express=require("express");
const router=express.Router();
// 引用文字数据库
const col=require("./db");
//引用登录注册数据库
const user=require("./user");
// 设置文字路由
router.get("/txt",(req,res)=>{
    col.find().then((ok)=>res.send({status:200,msg:ok})).catch((err)=>res.send({status:500,msg:"查找错误"}))
    
})
//引用body-parser模块
const parser=require("body-parser");
//创建解析器
const uE=parser.urlencoded({extended:false});
//引用crypto模块进行加密
const crypto=require("crypto");
// 设置注册路由
router.post("/register",uE,(req,res)=>{
    //将客户端的数据加密
    const upass=crypto.createHash("md5").update(req.body.upass).digest("hex");
    //存入数据库
    var users=new user({
        uname:req.body.uname,
        upass
    })
    users.save().then((ok)=>res.send({status:200,msg:"成功"})).catch(()=>res.send({status:400,msg:"失败"}))
});
//引入jsonwebtoken模块
const jwt=require("jsonwebtoken");
//设置登录路由
router.post("/login",uE,(req,res)=>{
    const upass=crypto.createHash("md5").update(req.body.upass).digest("hex");
    //数据库查找
    user.find({uname:req.body.uname,upass}).then((ok)=>{
        if(ok.length>0){
            //查询到了，登录成功
            //自定义数据
            var obj={ok:true};
            //自定义密文
            var miwen="awdwawfakfwfkbwba";
            //生成token
            var token=jwt.sign(obj,miwen);
            res.send({
                status:200,msg:"登录成功",token
            })
        }
    }).catch((err)=>res.send({status:400,msg:"用户不存在"}))
})
//设置token的路由
router.post("/token",uE,(req,res)=>{
    //获取客户端发送的token
    var token=req.body.token;
    //解码
    var miwen="awdwawfakfwfkbwba";
    jwt.verify(token,miwen,(err,data)=>{
        if(data==undefined){
            res.send({status:400,msg:"非法访问"})
        }        
        if(data.ok){
            res.send({status:200,msg:"用户已登录"})
        }else{
            res.send({status:400,msg:"用户未登录"})
        }
    })
})
//设置上传文件的路由
//引用模块
const multer=require("multer");
//设置上传图片的文件和文件名
var storage=multer.diskStorage({
    destination(req,file,cd){
        cd(null,"./img")
    },
    filename(req,file,cd){
        var fext=file.originalname.split(".")[1];
        var dname=new Date().getTime();
        cd(null,`${dname}.${fext}`)
    }
})
var upload=multer({storage})
router.post("/one",upload.single("upimg"),(req,res)=>{
    res.send({msg:"上传成功",status:200})
})
//暴露出去
module.exports=router;