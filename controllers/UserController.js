// const User = require("../models/User");
const db = require("../models/connection");
const NewUser=db.user
const Contact=db.contact
const { Op } = require("sequelize");
const {   encryptNumber,decryptNumber} = require("../utils/main");

class UserController {




  static async addUser  (req,res){


    try {
      const user=await NewUser.create(req.body);
  
  
  
              res.status(201).json({
                  success:true
                  ,user
              })
      
    } catch (error) {
      console.log(error)
    }
        }


// Using Create fun for entry the data into table
static async addUserContact  (req,res){


   const {contacts }=req.body

    try {



    const encryptedContacts = 
        contacts.map((c)=>{

   
       return {
            ...c,user_id:req.body.userId,
            number: encryptNumber(Number(c.number))
        }
})

    const usersName=contacts.map(c=>(
  c.name
    ))
    const usersNums=contacts.map(c=>(
 encryptNumber( c.number)
    ))


  
        const isContactExist= await Contact.findAll({
            where: {
              user_id: req.body.userId,
    
              name:{
    
                  [Op.in]: usersName                   
            },
            
            
            number:{
                [Op.in]:usersNums
            }
    
            }
          });
    
    
          if(isContactExist.length>0){
            return   res.status(400).json({
                message:"Contact already exist"
            })
          }
    
   
    
    

        const contact = await Contact.bulkCreate( encryptedContacts );
 
              
                res.status(201).json({
                    success:true
                    ,data:contact
                })
    } catch (error) {
        console.log(error)
    }

  
        }
static async addUserContactDirect  (req,res){


   const {contacts }=req.body
	// ENCODED PASS BY HASH PASSWORD
    // const salt = await bcrypt.genSalt();
    // console.log(req.body,"Body")
    try {
    const [user] = await NewUser.findOrCreate({
      where: { id:req.body.userId },
    });


    const encryptedContacts = 
        contacts.map((c)=>{

   
       return {
            ...c,user_id:req.body.userId,
            number: encryptNumber(Number(c.number))
        }
})

    const usersName=contacts.map(c=>(
  c.name
    ))
    const usersNums=contacts.map(c=>(
 encryptNumber( c.number)
    ))


  
        const isContactExist= await Contact.findAll({
            where: {
              user_id: req.body.userId,
    
              name:{
    
                  [Op.in]: usersName                   
            },
            
            
            number:{
                [Op.in]:usersNums
            }
    
            }
          });
    
    
          if(isContactExist.length>0){
            return   res.status(400).json({
                message:"Contact already exist"
            })
          }
    
       
    
    

        const contact = await Contact.bulkCreate( encryptedContacts );
 
              
                res.status(201).json({
                    success:true
                    ,data:contact
                })
    } catch (error) {
        console.log(error)
    }

  
        }


        

static async fetchCommonUsers(req,res){


    const num=  encryptNumber( req.params.searchNumber)
    
    console.log(num,"num")
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