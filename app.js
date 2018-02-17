const express=require('express');
const jwt =require('jsonwebtoken');
var bodyParse=require("body-parser");
var Token=require('./verfiytoken');
const jsonpatch=require('jsonpatch');
var qt = require('quickthumb');
var PORT=process.env.PORT||5000;
const app=express();

//MOCK USER OBJECT
var userJSON={
    username:"ABHAYBEHKI",
    password:"ABHAYBEHKI@123"
};


//data from POST
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());


//simple get api
app.get('/api',(req,res)=>{
    res.json({
        message:'Welcome to JWT with Abhay Behki'
    });
});


//Login API and get Token in body
app.post('/api/login',(req,res)=>{
    //Data from Post body
    const user={
        username:req.body.name,
        password:req.body.password,
    } 
    jwt.sign({user},'sercetKey',(err,token)=>{
            res.json({
                token
            });
    });
});


//Authentication verification
app.post('/api/posts',Token.verifyToken,(req,res)=>{
    jwt.verify(req.token,'sercetKey',(err,authdata)=>{
        if(err){
            res.sendStatus(403)
        }else{
            thepatch = [
                { "op": "replace", "path": "/username", "value": authdata.user.username },
                { "op": "replace", "path": "/password", "value": authdata.user.password },                
              ];          
              patchedata = jsonpatch.apply_patch(userJSON, thepatch);            
            res.json({
                message:'Potected authentication created!!',
                authdata,
                patchedata
            });
        }
    });
});

//Make use of quickThumbnail npm
app.post('/api/posts/image',Token.verifyToken,(req,res)=>{
    jwt.verify(req.token,'sercetKey',(err,authdata)=>{
        if(err){
            res.sendStatus(403)
        }else{            
            form = "<!DOCTYPE HTML><html><body>" +'<img src="/public/images/Bro.png?dim=50x50" />'+
            "</body></html>";
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(form, 'utf-8');
        }
    });
});



app.listen(PORT,()=>console.log('server start at port -->'+PORT));