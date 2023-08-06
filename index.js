const express =require("express");
// const User=require('./models/User');
// const Actor = require("./models/Actor");
require('./models/connection.js')
const app=express()



app.use(express.json());
app.use('/api',require('./routes'))


// User.sync({force:true}) //If command executes then existing table will Drop and then newly table created
// Actor.sync({force:true}) 


// User.sync() //If command executes then newly table created

// User.sync({alter:true}) //If command executes then existing and then newly table created


// Drop Table
// User.drop()


const PORT=5000
app.listen(PORT,()=>{
console.log("Port listening on 5000")
})