import { NextFunction, Request, Response } from "express"
import { ForbiddenError, InternalServerError, UnauthorizedError } from "../utils/Errors"
import ash from "express-async-handler"
import pool from "../db/config"
export const enableAuthenticate = ash(async(req:any,res:Response,next:NextFunction)=>{
  // check cookie and session store
  if (!req.cookies){
    throw new UnauthorizedError("No cookies sent with request")
  }
  let cookies = req.cookies
  
  let sessionCookie = ""
  if (process.env.SESSION_NAME){
     sessionCookie = cookies['sessionToken']
     if (!sessionCookie){
      // todo change to ok response to hide mechanism of protect route
      throw new UnauthorizedError("No cookie with session name")
     }
     //get sessionid from cookie 
     
     //let idFromCookie = sessionCookie.split(":")[1].split(".")[0]
     let idFromCookie = sessionCookie
     //console.log(idFromCookie,cookies)
     const [result]=await pool.query(`
     select distinct * from sessions
     where session_id = ?
     `,[idFromCookie])
     
     if (result.length===0){
      throw new UnauthorizedError("Invalid cookie")
     }
     let row = result[0]
     
     //console.log(row)
     if (row?.session_id===idFromCookie){
      //console.log(row.session_id)
      return next()
     }else {
      throw new UnauthorizedError("Invalid cookie")
     }
     

  }
  throw new InternalServerError("Session name error")
  


})