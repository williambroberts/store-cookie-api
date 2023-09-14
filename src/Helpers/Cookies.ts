import { Response } from "express";
import { InternalServerError } from "../utils/Errors";


export const generateAuthCookie = (res:Response,sessionToken:any)=>{
    if (!sessionToken){
        throw new InternalServerError("Missing session id")
    }
    const now = new Date().getTime()
    let extra = now + (60*60*1000)
    const expiresAt = new Date(extra) //1 hour
    console.log(expiresAt,now)
    res.cookie('sessionToken',sessionToken,{
        sameSite:"none",//"none" for production,
        secure:true,
        httpOnly:true,
        
    })

}