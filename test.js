// const secretNum=process.env.SECRET_NUMBER

const { encrypt } = require("./utils/main");

// function encryptNumber(number) {
//   console.log(number,"num",secretNum)
//     const encrypted = (number * secretNum ) + '$GBX'
//     console.log(encrypted,"encry")
//     return encrypted;
//   }
  
//   // Decrypt an encrypted number
//   function decryptNumber(encrypt) {
//     const decrypted = encrypt.split('$')[0] ;
//     const decryptVal=decrypted/ secretNum
//     return decryptVal;
//   }






// module.exports={
// encryptNumber,
// decryptNumber
// }


console.log(encrypt("567893445"),"num")