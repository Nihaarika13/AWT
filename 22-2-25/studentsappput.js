const express=require('express')
var app=express()
let students=[
    {name:"john",id:20},
    {name:"jane",id:22},
    {name:"tom",id:18}
]
app.use(express.json())
app.put("/updatestudent/:id",(req,res)=>{
    const id=req.params.id;
    studentindex=students.findIndex(s=>s.id==id)
    if(studentindex != -1){
        students[studentindex].name=req.body.name;
        students[studentindex].id=req.body.id;
        res.status(200).json({
            "message":"student updated successfully",
            "student":students
        })
    }
    else{
        res.status(404).json({"message":"student not found"})
    }
})
app.listen(2000,()=>{
    console.log("server started on port 3000")
})