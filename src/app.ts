import express, { Response } from "express"
import session from "express-session"
import MySQLSessionStore  from "express-mysql-session" 
import pool from "./db/config"
import authRouter from "./Routers/authRouter"
let SESSION:any = session
import cors from "cors"
import compression from "compression"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import { errorHandler } from "./Middleware/errorMiddleware"
import bodyParser from "body-parser"
import { enableAuthenticate } from "./Middleware/authMiddleware"
function createApp(){
    const app = express()
    const MySQLStore = MySQLSessionStore(SESSION)
    let options = {}
    if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PORT && process.env.DB_PASSWORD && process.env.DB_DATABASE){
        options = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port:process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        };	
    }
    
    
    const sessionStore = new MySQLStore(options,pool);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
let sessionName = ""
if (process.env.SESSION_NAME){
    sessionName=process.env.SESSION_NAME
}
app.use(SESSION({
    name:sessionName,
    saveUninitialized:false,
    resave:false,
    secret:"3824398",
     store:sessionStore,
	cookie:{
        
        secure:false,
        sameSite:'none'
        
    }
}))
sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console?.error(error);
});
sessionStore.close().then(() => {
	// Successfuly closed the MySQL session store.
	console.log('MySQLStore closed');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});

app.use(compression())
app.use(helmet())
app.use(cors({
    origin:["http://localhost:3000","https://ninjafront.vercel.app","https://store-five-xi.vercel.app"],
    credentials:true
}))



//
app.use((req:any,res:Response,next)=>{
    
    let session = req.session
    let sessionID = req.sessionID
    console.log(sessionID,req.session.viewCount)
    if (!req.session.viewCount){
        req.session.viewCount =1
        console.log(req.session.viewCount)
    }else {
        req.session.viewCount++
    }
    next()
})

app.get("/",(req:any,res)=>{
    res.status(200)
    res.json({success:"true 🕊️",session:req.session,sessionId:req.sessionID})
})

app.use("/auth",authRouter)


app.use('*',(req,res)=>{
    console.log(req.originalUrl,"*")
    res.status(404)
    res.json({
        success:false,
        error:"not found"
    })
})

app.use(errorHandler)






return app

}


export default createApp
