const db=require("../models/index")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const createToken = (id)=>{
    const token=jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:"3d"})
    return token;
}
const userSignUp=async(req,res)=>{   
    try{
        try{
            const {email,password}=req.body;
            const hashpassword=await signupInputValidator(email,password)
            const user=await db.User.create({email:email,password:hashpassword})
            const token=createToken(user.dataValues.id)
            res.status(200).json({email:user.dataValues.email,token:token})
        }
        catch(err){
            res.status(400).json({message:err.message})
            return;
        }
    } 
    catch(err){
        res.status(500).json("something went wrong with the server")
    }
}

const userLogin=async(req,res)=>{
    try{
        try{
            const {email,password}=req.body;
            const user=await loginInputValidator(email,password)
            const passwordMatch=await bcrypt.compare(password,user.dataValues.password)
            if(!passwordMatch){
                throw new Error("Invalid credentials")
            }
            const token=createToken(user.dataValues.id)
            res.status(200).json({email:user.dataValues.email,token:token})
            return;
        }
        catch(err){
            res.status(400).json({message:err.message})
            return;
        }
    }
    catch(err){
        res.status(500).json("something went wrong with the server")
    }
}
module.exports={userSignUp,userLogin}



const signupInputValidator=async(email,password)=>{
    if(! email || !password){
        throw new Error("Please provide email and password")
    }
    if(!validator.isEmail(email)){
        throw new Error("Please enter a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    }
    const user=await db.User.findOne({where:{email:email}})
    if(user){
        throw new Error("Email already exists")
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    return hashedPassword;
}

const loginInputValidator=async(email,password)=>{
if(!email||!password){
    throw new Error("Please provide email and password")
}
if(!validator.isEmail(email)){
    throw new Error("Please enter a valid email")
}
const user=await db.User.findOne({where:{email:email}})
if(!user){
    throw new Error("user does not exist")
}
return user;
}