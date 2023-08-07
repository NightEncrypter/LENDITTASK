const NewUser=require('./NewUser')

module.exports=(sequelize,DataTypes)=>{

  


    const Contact=sequelize.define('contacts',({


        name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        number:{
            type:DataTypes.TEXT,
            allowNull:true,
        
    
            // Allow null to true
        },
        user_id:DataTypes.INTEGER
    }))


        return Contact
}





