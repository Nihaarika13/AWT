const express = require('express');
const jwt=require('jsonwebtoken');
const app = express();  
const PORT=3000;
app.use(express.json());
const users=[];
const JWT_SECRET='cvrcollege';
app.post('/register',(req,res)=>{
    const {username,password}=req.body;
    if(!username ||!password){
        return res.status(400).json({error:'Username and password are required'});
    }
    if(users.some(user=>user.username===username)){
        return res.status(400).json({error:'Username already exists'});
    }
    const user={username,password};
    users.push(user);
    res.status(201).json(user);
});
    
app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({error:'Username and password are required'});
    }
    const user=users.find(user=>user.username===username && user.password===password);
    if(!user){
        return res.status(401).json({error:'Invalid credentials'});
    }
    const token=jwt.sign({username,password},JWT_SECRET,{expiresIn:'1h'});
    res.json({token});
});
    
app.get('/protected',verifyToken,(req,res)=>{
    res.json({message:'Access granted'});
});

function verifyToken(req,res,next){
    const authHeader=req.headers['authorization'];
    console.log(authHeader);
    const token=authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({error:'Token is required'});
    }
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({error:'Invalid token'});
        }
        req.user=user;
        next();
    });
}
app.listen(3000,(req,res)=>{
    console.log("server started on port 3000");
})
