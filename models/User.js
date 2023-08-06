const sequelize =require('./connection.js')

const {DataTypes}=require("sequelize")


const User=sequelize.define('User',{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },lastName:{
        type:DataTypes.STRING,
        defaultValue:"Rathore"

        // Allow null to true
    }    
},{
    // timestamps:false
    
    createdAt:false,updatedAt:"updated_at"})

module.exports=User