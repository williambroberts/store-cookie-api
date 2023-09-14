import { passwordTypes } from "../types";
import { InternalServerError } from "./Errors";

const bcrypt = require("bcryptjs")
export const hashPasswordSync = (raw:string)=>{
    const salt =  bcrypt.genSaltSync(12);
    const hash =  bcrypt.hashSync(raw,salt)
    return hash
}



// export const comparePasswordSync = (passwords:passwordTypes)=>{
//     return bcrypt.compareSync(passwords.raw,passwords.hash)
// }

// export const comparePasswordAsync = (passwords:passwordTypes)=>{
//     bcrypt.compare("not_bacon", hash, function(err, res) {
//         if (err){
//             throw new InternalServerError(err.message,"bcrypt compare password function failed")
//         }
//         return  res
//     });
// }

// export const hashPasswordAsync = (raw:string)=>{
//     bcrypt.genSalt(12, function(err, salt) {
//         if (err){
//             throw new InternalServerError(err.message,"bcrypt gensalt function failed")
//         }
//         bcrypt.hash(raw, salt, function(err, hash) {
//             if (err){
//                 throw new InternalServerError("","")
//             }
//             return hash
//         });
//     });
// }




