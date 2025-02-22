const express=require('express')
var app=express()
let students=[
    {name:"john",id:20},
    {name:"jane",id:22},
    {name:"tom",id:18}
]
app.use(express.json())
app.post ("/addstudent",(req,res)=>{
    let student=req.body;
    students.push(student);
    res.status(200).json({
        "message":"Student added successfully",
        "student":students
    })
})
app.listen(2000,()=>{
    console.log("server started on port 3000")
})