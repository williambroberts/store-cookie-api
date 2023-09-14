import { Response,Request, NextFunction } from "express"
import {body, validationResult, matchedData} from "express-validator" 
const passwordVS = body('password').escape().exists({checkFalsy:true}).withMessage("Password required").isString().withMessage('Password must be string').isLength({min:3})
.withMessage('Password must be at least 3 char long')


const usernameVS = body('username').escape().exists({checkFalsy:true}).withMessage('Username is required').isString().withMessage("Username must be a string")
const emailVs = body('email').escape().exists({checkFalsy:true}).withMessage("Email is required")
.trim().isEmail().withMessage("Provide valid email format").isLength({ min: 3 }).withMessage("Email length must be at least 3 characters")
//register 

const nameVS = body('name').escape().exists({checkFalsy:true}).withMessage('Name is required').isString().withMessage("Name must be a string")
const suggestionVS = body('suggestion').escape().exists({checkFalsy:true}).withMessage('Suggestion is required').isString().withMessage("Suggestion must be of type string")


const subsribeVS = [emailVs]
const registerVS = [passwordVS,emailVs]
const suggestProductVS = [emailVs,nameVS,suggestionVS]
const valitatorVS = (req:any,res:Response,next:NextFunction)=>{
    const errors = validationResult(req)
    if (errors.isEmpty()){
        //todo chheck for valid incase passport uses req.body.email req.body.password
        console.log(matchedData(req))
        //console.trace()
        req.matchedData = matchedData(req)
        return next()
    }else if (!errors.isEmpty()){
        res.statusCode = 400 //bad request
        res.json({errors:errors.array()})
    }
}



//login
const loginVS = [emailVs,passwordVS]

export {loginVS,registerVS,valitatorVS,suggestProductVS,subsribeVS}