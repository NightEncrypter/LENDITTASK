const { Sequelize, DataTypes, Model } = require('sequelize');



const sequelize = new Sequelize('thesequlize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',port:3306
});


try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error); 
}




const db={

}
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.user=require('./NewUser')(sequelize,DataTypes,Model)
db.contact=require('./Contact')(sequelize,DataTypes)

db.user.hasMany(db.contact,{
  foreignKey:"user_id",onDelete:"Cascade"
})
db.contact.belongsTo(db.user,{
  foreignKey:"user_id",onDelete:"Cascade"
})

// db.sequelize.sync({force:true})







module.exports=db