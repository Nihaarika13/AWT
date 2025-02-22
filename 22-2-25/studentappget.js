const express=require('express')
var app=express()
let students={
    "1":{name:"john",id:20},
    "2":{name:"jane",id:22},
    "3":{name:"tom",id:18}
 };

// app.get("/students",(req,res)=>{
//     res.json(students)
// });

app.get("/students/:id",(req,res)=>{
    const id=req.params.id;
    if(students[id]){
        res.json({"message":"student found",student:students[id]})
    }else{
        res.status(404).json({message:"student not found"})
    }
});
app.listen(2000,()=>{
    console.log("server started")
});