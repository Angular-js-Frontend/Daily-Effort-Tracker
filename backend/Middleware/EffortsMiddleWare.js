
const jwt=require("jsonwebtoken")
const db=require("../models/index")
require("dotenv").config()
const protectEffortsMiddleware=async(req,res,next)=>{
    try{
        const {authorization}=req.headers;
        if(!authorization){
            return res.status(401).json({msg:"No token, authorization denied"})
        }
        const token=authorization.split(" ")[1]
        const {id}=jwt.verify(token,process.env.JWT_SECRET)
        const user=await db.User.findOne({where: {id:id}})
        if(!user){
            throw new Error("Token is not valid")
        }   
        req.user=user.dataValues;
        next()
    }
    catch(err){
        return res.status(401).json({msg:"Token is not valid"})
    }
}


module.exports={protectEffortsMiddleware}