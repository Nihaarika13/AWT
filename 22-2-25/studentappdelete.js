const express=require('express')
var app=express()
let students=[
    {name:"john",id:20},
    {name:"jane",id:22},
    {name:"tom",id:18}
]
app.delete("/studentsdelete/:id",(req,res)=>{
    const id=req.params.id;
    let stud=students.find(s=>s.id==id)
    if(stud){
        students=students.filter(s=>s.id!=id)
        res.status(200).json({
            "message":"student deleted sucessfully","student":students
        })
    }else{
        res.status(404).json({"message":"student not found"})
    }
 });

app.listen(2000,()=>{
    console.log("server started on port 3000")
})