import { Response,Request } from "express"
import ash from "express-async-handler"
import { BadRequestError, InternalServerError } from "../utils/Errors"
import pool from "../db/config"
import { comparePassword } from "../Helpers/passwords"
import { generateAuthCookie } from "../Helpers/Cookies"

export const loginController = ash(async(req:any,res:Response)=>{
    const {email,password}=req.matchedData
    console.log(email,password)
    if (!email){
        throw new BadRequestError("Email required")
    }
    if (!password){
        throw new BadRequestError("Password required")
    }
    const [result] = await pool.query(`
    SELECT DISTINCT * FROM store_users
    WHERE email = ?
    LIMIT 1;
    `,[email])
    if (result.length===0){
        throw new BadRequestError("Email invalid")
    }
   
    let [user]=result
    if (!user.password || !user.email){
        throw new InternalServerError("Invalid user object")
    }
    
    //validate password
    const passwords = {raw:password,hash:user?.password}
    const match =  comparePassword(passwords)
    if (!match){
        throw new BadRequestError("Invalid password")
    }
    //const sessionToken = req.sessionID
    //generateAuthCookie(res,sessionToken)

   // req.session.sessionToken = sessionToken
    res.status(200)
    res.json({
        success:true,isAuth:true
    })
})

export const logoutController = ash(async(req:any,res:Response)=>{
    // if cookie and correct in del session/destroy
    // check cookie
    // validate cookie vs sessionstore
    // destory cookie + session
    if (process.env.SESSION_NAME){
        let sessionName = process.env.SESSION_NAME
        res.clearCookie(sessionName)
        req.session.destroy(function(err:Error){
            if(err){
                throw new InternalServerError("Error destroying session")
            }
            res.status(200)
            res.json({success:true})
        })
        
    }
    
})