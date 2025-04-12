const express=require('express')
const mongoose=require('mongoose')
const app=express();
const jwt=require('jsonwebtoken')
const JWT_SECRET="cvr"
app.use(express.json())
const port=3000
mongoose.connect("mongodb://localhost:27017/int")
    .then(()=>console.log("connection successfully established"))
    .catch(err=>console.log("connection failed"))

const productSchema=new mongoose.Schema({
    name:{type:String,reqired:true},
    description:{type:String},
    price:{type:Number,required:true},
    category:{type:String},
    stock:{type:Number,default:0}
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const user=mongoose.model("User",userSchema)
const product=mongoose.model("Product",productSchema)

app.post('/api/register',(req,res)=>{
    const {name,email,password}=req.body
    if(!name ||!email||!password){
        return res.status(401).json({"message":"name,email and password are required"})
    }
    // if(user.some(user=>user.email===email)){
    //     return res.status(401).json({"message":"email already exists"})
    // }
    return res.json({"message":"user created successfully"})
})
app.post('/api/login',(req,res)=>{
    const {email,password}=req.body;
    user.findOne(email).then((user=>{
        if(!user){
            return res.status(401).json({"message":"invalid email or password"})
            }
            const token=jwt.sign({id:user._id},"nihaarika")
            res.json({token})
        })
        .catch((err)=>{
            res.status(500).json({"message":"err.message"})
        })
    )})




app.get('/api/products',(req,res)=>{
    product.find().then((products)=>{
        res.status(201).json(products)
    })
    .catch((err)=>{
        res.status(500).json({"message":"error fetching products"})
    })
})
app.get('/api/products/:id',(req,res)=>{
    product.findById(req.params.id).then((product)=>{
        res.status(201).json(product)
    })
    res.json(product)
    .catch((err)=>{
        res.status(500).json({"message":"couldn't find the product"})
    })
})
app.post('/api/products',(req,res)=>{
    const {name,description,price,category,stock}=req.body
    if(!name||!price){
        return res.status(401).json({"message":"name,price are required"})
    }
    product.insertOne({name,description,price,category,stock});
    res.status(201).json("product added successfully")

})
app.put('/api/products/:id',async(req,res)=>{
    const id=req.params.id; 
    const updatedprod=await product.findByIdAndUpdate((req.body),{new:true})
    res.json(updatedprod)
})
app.delete('/api/products/:id',async(req,res)=>{
    await product.findByIdAndDelete(req.params.id)
    res.json({"message":"deleted successfully"})
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
