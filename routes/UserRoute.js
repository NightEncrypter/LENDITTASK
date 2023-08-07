const express =require("express");
const UserController=require("../controllers/UserController")

const userRoute=express.Router()

userRoute.post("/add-user",UserController.addUser)
userRoute.post("/add-user-contact-direct",UserController.addUserContactDirect)
userRoute.post("/add-user-contact",UserController.addUserContact)
userRoute.get("/common-user/:searchNumber",UserController.fetchCommonUsers)
userRoute.get("/contacts",UserController.fetchContacts)







module.exports=userRoute