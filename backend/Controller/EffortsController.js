
const db=require("../models/index")


const getEffortsController=async(req,res)=>{
try{
    const efforts=await db.EachEffort.findAll({where:{userId:req.user.id}})
    res.status(200).json(efforts)
}
catch(err){
    res.status(400).json({message:'could not fetch please check your input'})
}
}




const postEffortsController=async(req,res)=>{
try{
    const {date,time}=req.body;
    const effort=await db.EachEffort.create({date:date,time:time,userId:req.user.id})
    res.status(200).json(effort)
}
catch(err){
    res.status(400).json({message:'could not create please check your input'})
}
}




const deleteEffortsController=async(req,res)=>{
try{
    const id=req.params.id;
    const effort=await db.EachEffort.destroy({
        where: {
          id: id,
        },
      });
    res.status(200).json({message:'deleted successfully',effort:effort})
}
catch(err){
    res.status(400).json({message:'could not delete please check your input'})
}
}



module.exports={
    getEffortsController,
    postEffortsController,
    deleteEffortsController
}