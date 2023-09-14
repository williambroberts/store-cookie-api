import { NextFunction, Request, Response } from "express"
import { ForbiddenError, InternalServerError, UnauthorizedError } from "../utils/Errors"
import ash from "express-async-handler"
import pool from "../db/config"

// validate session-id db-id cookie-id (session has final say > db > cookie)
export const enableAuthenticate = ash(async(req:any,res:Response,next:NextFunction)=>{
  // check cookie and session store
  if (!req.cookies){
    throw new UnauthorizedError("No cookies sent with request")
  }
  let cookies = req.cookies
  
  
  if (process.env.AUTH_COOKIE){
      let authCookie = process.env.AUTH_COOKIE
     authCookie = cookies[authCookie]
     if (!authCookie){
      // todo change to ok response to hide mechanism of protect route
      throw new UnauthorizedError("No auth cookie")
     }
     //get sessionid from cookie 
     
     //let idFromCookie = sessionCookie.split(":")[1].split(".")[0]
     let idFromCookie = authCookie
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
      console.log(row.session_id,req.sessionID,"🕊️")
      if (row?.session_id===req.sessionID){
        return next()
      }else {
        // MYSQL id !== cookie !== session
        throw new UnauthorizedError("Invalid db")
      }
      
     }else {
      throw new UnauthorizedError("Invalid cookie")
     }
     

  }
  throw new InternalServerError("Session name error")
  


})