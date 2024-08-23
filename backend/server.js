const express=require("express")
const cors=require("cors")
const app=express()
require("dotenv").config()

const effortsMiddleware=require("./Middleware/EffortsMiddleWare")


const UserRouter=require("./Routes/UserRoutes")
const EffortRouter=require("./Routes/EffortRoutes")


app.use(cors())
app.use(express.json())
app.use("/users",UserRouter)


app.use("/efforts",effortsMiddleware.protectEffortsMiddleware)
app.use("/efforts",EffortRouter)

app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})