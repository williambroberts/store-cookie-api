import { Response } from "express";
import { InternalServerError } from "../utils/Errors";


export const generateAuthCookie = (res:Response,sessionToken:any)=>{
    if (!sessionToken){
        throw new InternalServerError("Missing session id")
    }
    const now = new Date()
    const expiresAt = new Date(+now + 60 * 60 * 1000) //1 hour
    console.log(expiresAt,now)
    res.cookie('sessionToken',sessionToken,{
        sameSite:"lax",//"none" for production,
        secure:false,
        expires:expiresAt
    })

}