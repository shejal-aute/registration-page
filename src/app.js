const express = require("express");
const path = require("path");
const app=express();
const hbs=require("hbs");

require("./db/connect");
const Register = require("./models/registers");

const port = process.env.PORT||3000;

const static_path = path.join(__dirname,"../public")
const templates_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

// const {json} = require("express");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
    res.render("index")
});

app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/register",async(req,res)=>{
    try{
        
        const password = req.body.password;
        const cpassword =  req.body.confirmpassword;
        if(password ===cpassword){
            const registerUser = new Register({
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    gender:req.body.gender,
                    phone:req.body.phone,
                    age:req.body.password,
                    password:req.body.password,
                    confirmpassword:req.body.confirmpassword

            })

           const registered=await registerUser.save();
           res.status(201).render("index");
        }
        else{
            res.send("password are not matching")
        }
    }catch(error){
        res.status(400).send(error)
    }

})


app.listen(port,()=>{
    console.log(`server is listening on  ${port}`);
})

