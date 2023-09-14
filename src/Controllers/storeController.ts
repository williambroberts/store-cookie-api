import { Response } from "express"
import { BadRequestError, InternalServerError } from "../utils/Errors"
import ash from "express-async-handler"
import pool from "../db/config"

const origins =["http://localhost:3000","https://ninjafront.vercel.app","https://store-five-xi.vercel.app"]
export const subscribeController = ash(async(req:any,res:Response)=>{
    //query db add email to the store_emails table
    let {email} = req.matchedData
    console.log("email sub controller",email)
    const result = await pool.query(`
    insert ignore into store_emails (email)
    VALUES (?);
    `,[email])
    if (result){
        //todo check origins and other headers
        const reqOrigin = req.get('origin')
        if (origins.includes(reqOrigin)){
            res.header('Access-Control-Allow-Origin',)
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.status(200)
            res.json({
                success:true,
                email:email
            })
        }else {
            throw new BadRequestError("origin not allowed")
        }
        
    }else {
        throw new InternalServerError("Subscription failed")
    }

})

const suggestProductController =ash(async(req:any,res:Response)=>{
    const {name,email,suggestion}=req.matchedData
    if (!name || ! email || !suggestion){
        throw new BadRequestError("Invalid Request")
    }
    
    const result = await pool.query(`
    insert into store_suggestion (name,email,suggestion)
    values (?,?,?)
    `,[name,email,suggestion])
    if (result){
        

        res.status(200)
        res.json({
            success:true,
            result:result
        })
    }else {
        throw new InternalServerError("error inserting product suggesstion")
    }
    

})

export {suggestProductController}