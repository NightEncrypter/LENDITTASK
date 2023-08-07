// const User = require("../models/User");
const db = require("../models/connection");
const NewUser=db.user
const Contact=db.contact
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const { encrypt } = require("../utils/main");

class UserController {







// Using Create fun for entry the data into table
static async addUser  (req,res){

   const {contacts }=req.body
	// ENCODED PASS BY HASH PASSWORD
    // const salt = await bcrypt.genSalt();
    // console.log(req.body,"Body")
    const encryptedContacts = 
        contacts.map(async(c)=>{

   
       return {
            ...c,user_id:req.body.userId,number: encrypt( c.number)
        }
})

console.log(encryptedContacts,"userContact")
    const usersName=contacts.map(c=>(
c.name
    ))
    const usersNumber=contacts.map(c=>(
c.number
    ))

    try {
        const isContactExist= await Contact.findAll({
            where: {
              user_id: req.body.userId,
    
              name:{
    
                  [Op.in]: usersName                   
            },
            
            
            // number:{
            //     [Op.in]:usersNumber
            // }
    
            }
          });
    
    
          if(isContactExist.length>0){
            return   res.status(400).json({
                message:"Contact already exist"
            })
          }
    
          console.log(isContactExist.length>0,"exist")
    
    
        const contact = await Contact.bulkCreate(encryptedContacts);
 
              
                res.status(201).json({
                    success:true
                    ,data:contact
                })
    } catch (error) {
        console.log(error)
    }

  
        }


static async fetchCommonUsers(req,res){


    const num=req.params.searchNumber
    try {
        
        const user = await NewUser.findOne({
            include: 
              {
                model: Contact,
                where: {
                  number:  num,
                },
              },
            
          });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found with the given number.' });
          }


        const commonData = await Contact.findAll({
            where: {
              number:num,
            },
            include: [
              {
                model: NewUser,
                // where: {
                //   id: { [Op.not]: user.id },
                // },
              },
            ],
            attributes: ['name',"number"],
            // raw: true,
          });

          const commonUsersArrIds=commonData.map(v=>(
          v.NewUser.id
          ))
console.log(commonData.name,"con")
const resData={
    name:user.contacts[0].name,
commonUsers:commonUsersArrIds
}

        res.status(200).json(
resData
        )
    
    } catch (error) {
        console.log(error)
        
    }
}



static async fetchContacts(req,res){
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage =parseInt(req.query.pageSize) ||2;
    const offset = (page - 1) * itemsPerPage;

    try {
        const {rows,count} =await Contact.findAndCountAll(
            {
                            limit: itemsPerPage,
                            offset: offset,}
                      
                        )
            
                        res.status(200).json({
                            totalCount:count,
            rows:rows
                        })   
    } catch (error) {
        console.log(error)
    }

        }
static async fetchAllUsers(req,res){

            const data =await NewUser.findAll()

            res.status(200).json({
data
            })
        }

      }

module.exports =UserController