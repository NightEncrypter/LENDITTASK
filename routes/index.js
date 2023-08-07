const express=require("express")
const userRoute=require("./UserRoute")

const router=express.Router()



router.use("/user",userRoute)

module.exports=router
// router.use("user")