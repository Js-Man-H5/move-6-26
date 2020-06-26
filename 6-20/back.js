const express=require('express')
const mysql=require('mysql')
const url=require('url')
const qs=require('querystring')
const multer=require('multer')
const fs = require('fs')
const db=mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'nz2002',
    port: 3306,
    
})
const app=express()
app.use(express.static('src'))
app.use(express.urlencoded())
app.get('/load_1',(req,res)=>{
    let valObj=url.parse(req.url)
    let obj =qs.parse(valObj.query)
    let line=parseInt(obj.line)
    let startLine=parseInt(obj.page-1)*line
  
    console.log(startLine,line)
    console.log(obj)
   let sql =`select * from \`goods\` limit ${startLine},${line} `
  
   db.query(sql,(err,reselt)=>{
       if(err!==null){
          console.log(err)
           return
       }
       res.json(reselt)
   })
   
})
app.get('/list',(req,res)=>{
    let valObj=url.parse(req.url)
    let obj=qs.parse(valObj.query)
    // console.log(obj)
    let line=parseInt(obj.line)
    let startLine=parseInt(obj.page-1)*line
    console.log(line,startLine)
//    console.log(obj.cat_one)
    let sql=`select * from \`goods\` where \`${obj.cat_one_id}\` = '${obj.cat_one}' order by \`goods_price\` limit ${startLine},${line}`
    db.query(sql,(err,reselt)=>{
        if(err!==null){
            console.log(err)
            return
        }
        res.json(reselt)
    })
})
app.get('/details',(req,res)=>{
    let valObj=url.parse(req.url)
    let obj=qs.parse(valObj.query)
    // console.log(obj)
    let sql=`select * from \`goods\` where \`goods_id\` = ${obj.str}`
    db.query(sql,(err,reselt)=>{
        if(err!==null){
            console.log(err)
            return
        }
        res.json(reselt)
    })
})
app.get('/login',(req,res)=>{
    let valObj=url.parse(req.url)
    let obj=qs.parse(valObj.query)
    // console.log(obj)
    let sql=`select * from \`user\` where \`username\`='${obj.userName}' and \`userpwd\`=${obj.userPwd}`
    db.query(sql,(err,reselt)=>{
        if(err!==null){
            console.log(err)
            res.json({0:'登录失败'})
            return
        }
        res.json(reselt)
    })
})

const upload=multer({dest:'./src/img'})
app.post('/data_res',upload.single('pic'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    
    let num = req.file.originalname.lastIndexOf('.');
    let fex = req.file.originalname.substr(num);
   let newName=req.file.filename+fex
   console.log(newName)
fs.rename('./src/img/'+req.file.filename,'./src/img/'+newName,(err)=>{
    if(err!==null){
        console.log(`文件上传失败，原因是：${err}`)
        return
    }
})
let sql=`insert into \`user\` (\`username\`,\`userpwd\`,\`pic\`) values('${req.body.username}','${req.body.userpwd}','${newName}')`
db.query(sql,(err,reselt)=>{
    if(err!==null){
        console.log(`语句执行失败${err}`)
        res.json({res:'0',msg:'执行失败'})
        return
    }
    res.json({res:'1',msg:'执行成功'})
})
   
})

app.get('/name',(req,res)=>{
    let objVal=url.parse(req.url)
    let obj=qs.parse(objVal.query)
    // console.log(obj)
    let sql=`select * from \`user\` where \`username\`='${obj.username}'`
    db.query(sql,(err,reselt)=>{
        if(err!==null){
            console.log(err)
            return
        }
        res.json(reselt)
    })
})
app.get('/seek',(req,res)=>{
    let objVal=url.parse(req.url)
    let obj=qs.parse(objVal.query)
    // console.log(obj)
    let sql=`select * from \`goods\` where \`goods_name\` like '${obj.val}%'`
    // select * from `goods` `username` like '张%'
    db.query(sql,(err,reselt)=>{
        if(err!==null){
            console.log('sql语句执行错误'+err)
            return
        }
        res.json(reselt)
    })
})
app.get('/local',(req,res)=>{
    let objVal=url.parse(req.url)
    let obj=qs.parse(objVal.query)
    // console.log(obj)
})
app.listen(8080,()=>{console.log('监听成功')})