const express=require("express")
const EffortRouter=express.Router()
const EffortsController=require("../Controller/EffortsController")

EffortRouter.get("/",EffortsController.getEffortsController)
EffortRouter.post("/",EffortsController.postEffortsController)
EffortRouter.delete("/:id",EffortsController.deleteEffortsController)



module.exports=EffortRouter