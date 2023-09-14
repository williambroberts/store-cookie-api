import { NextFunction, Request, Response } from "express"
import { NotFoundError } from "../utils/Errors"

export const errorHandler  =(err:any,req:Request,res:Response,next:NextFunction)=>{
    //console.log(err.statusCode,err.cause)
    const statusCode = err.statusCode?  err.statusCode :500
    res.status(statusCode).json({
        message:err.message,
        stack:err.stack,
        status:statusCode
    })
}


export const notFound = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    const error = new NotFoundError(`Not Found ${req.originalUrl}`)
    next(error)
}

