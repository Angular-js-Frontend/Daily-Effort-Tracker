
const express=require("express")
const UserRouter=express.Router()
const userController=require("../Controller/UserController")

UserRouter.post("/login",userController.userLogin)

UserRouter.post("/signup",userController.userSignUp)

module.exports=UserRouter