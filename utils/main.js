
const crypto = require('crypto');
 
const algorithm = 'aes-256-cbc';
 
const key = crypto.randomBytes(32);
 
const iv = crypto.randomBytes(16);
 
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex') ;
}
 
 
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
 
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
 
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
 
    return decrypted.toString();
}
 




// const secretNum=process.env.SECRET_NUMBER

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






module.exports={
encrypt,
decrypt
}