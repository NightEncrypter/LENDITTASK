const express=require("express")
const userRoute=require("./UserRoute")
const queryRoute=require("./QueryRoute")

const router=express.Router()



router.use("/user",userRoute)

module.exports=router
// router.use("user")