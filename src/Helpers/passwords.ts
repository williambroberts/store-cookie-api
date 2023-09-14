import bcrypt from "bcryptjs"

import { passwordTypes } from "../types";
const hashPassword = (raw:string)=>{
    const salt =  bcrypt.genSaltSync(12);
    const hash =  bcrypt.hashSync(raw,salt)
    return hash
}



const comparePassword = (passwords:passwordTypes)=>{
    return bcrypt.compareSync(passwords.raw,passwords.hash)
}

export {comparePassword,hashPassword}