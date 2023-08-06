const  Contact=require('./Contact')

module.exports=(sequelize,DataTypes,Model)=>{

    class NewUser extends Model {

    }


     NewUser.init({
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },lastName:{
            type:DataTypes.STRING,
            defaultValue:"Rathore"
    
            // Allow null to true
        }
    },{
        timestamps:false,
        sequelize,
    modelName:"NewUser"})

    // NewUser.hasMany(Contact)

    return NewUser
}



