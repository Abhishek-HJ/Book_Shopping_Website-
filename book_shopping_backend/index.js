const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const { log } = require("console");

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://abhi:Poornima%4025@cluster0.irkcnfx.mongodb.net/bookshoppingwebsite")


app.get("/",(req,res)=>{
    res.send("Express App is Running");

})

//Image storage engine

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

    }
})
const upload=multer({storage:storage})

//creating uplaod
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
}) 

//Schema for creating products
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    new_price:{
        type:Number,
        require:true,
    },
    old_price:{
        type:Number,
        require:true,

    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
    description:{
        type: String,
        required: true,
    },
    author: { 
        type: String,
        required: true,
    }

})
app.post('/addProduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last = products.slice(-1);
        let lp = last[0];
        id = lp.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        description: req.body.description,
        author: req.body.author, 
    });
    console.log(product);
    await product.save();
    console.log("Saved", product);
    res.json({
        id: product.id,
        success: true,
        name: product.name,
    });
});


app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        // Use $or to match either name or author
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for name
                { author: { $regex: query, $options: 'i' } } // Case-insensitive search for author
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


//deleting product
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name,
    })

});

//Creating api for getting all products
app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All products fetched",);
    res.send(products);

})



//User 
const Users=mongoose.model('Users',{
    name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,

    },
    cartData:{
        type:Object,

    },
    date:{
        type:Date,
        default:Date.now,
    }
})



//Creating Registration for user
app.post('/signup',async (req,res)=>{
    let check= await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:'existing user found with same email'})
    }
    let cart={};
    for(let i=0;i<300;i++)
    {
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})

//creating user login
app.post('/login',async (req,res)=>{
let user=await Users.findOne({email:req.body.email});
if(user){
    const passCompare=req.body.password===user.password;
    if(passCompare){
        const data={
            user:{
                id:user.id
            }
        }
        const token=jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
    }
    else{
        res.json({success:false,errors:"Wrong Password"});
    }
}
else{
    res.json({success:false,errors:"Wrong email id"})
}

})




//creating for new collection data
app.get('/newcollections',async (req,res)=>{
    let products =await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);

})


//popular in personality development
app.get('/popularinpd',async(req,res)=>{
    let products =await Product.find({category:'pd'});
    let popularinpd=products.slice(0,4);
    console.log("Popularinpd  Fetched");
    res.send(popularinpd);
})
//create middleware to fetch user
const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authentiacte using valid"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }
        catch(error){
           res.status(401).send({errors:"Please authenticate using a valid token "})
        }
    }
}

//cart

app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log(req.body,req.user);

    let userData= await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")
})


//creating to remove from cart
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData= await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed")

})

//getcart
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userDate=await Users.findOne({_id:req.user.id});
    res.json(userDate.cartData);

})


app.listen(port,(error)=>{
if(!error){
    console.log("Server Running on port"+port);
}
else{
    console.log("Error:"+error);
}
});

