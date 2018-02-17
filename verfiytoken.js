//verify token function middleware
function verifyToken(req,res,next){
    //get auth header value
    const HeaderToken=req.headers['authorization'];
    if(typeof HeaderToken!='undefined'){
        const tokenValue=HeaderToken.split(' ');

        const GetToken=tokenValue[1];
        req.token=GetToken;
        next();
    }else{
        //Forbidden
        res.sendStatus(403);
        }
}

module.exports={
    verifyToken
}