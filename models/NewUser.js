const  Contact=require('./Contact')

module.exports=(sequelize,DataTypes,Model)=>{

    class NewUser extends Model {

    }


     NewUser.init({

        id:{
             primaryKey:true,
type:DataTypes.INTEGER,
unique:true
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:true
        },lastName:{
            type:DataTypes.STRING,
            allowNull:true
    
            // Allow null to true
        }
    },{
        // timestamps:false,
        sequelize,
    // modelName:"NewUser"

})

    // NewUser.hasMany(Contact)

    return NewUser
}



