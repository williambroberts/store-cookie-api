import express from "express"
import { loginVS, valitatorVS } from "../utils/Validators"
import { loginController, logoutController, statusController } from "../Controllers/authControllers"
import { enableAuthenticate } from "../Middleware/authMiddleware"

const authRouter = express.Router()


authRouter.post("/login",loginVS,valitatorVS,loginController)
authRouter.post("/logout",logoutController)


// protected test if really auth validate cookie
authRouter.get("/status",enableAuthenticate,statusController)
export default authRouter