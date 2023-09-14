"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPasswordSync = void 0;
const bcrypt = require("bcryptjs");
const hashPasswordSync = (raw) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(raw, salt);
    return hash;
};
exports.hashPasswordSync = hashPasswordSync;
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
