import express from "express"
import { loginVS, valitatorVS } from "../utils/Validators"
import { loginController, logoutController } from "../Controllers/authControllers"

const authRouter = express.Router()


authRouter.post("/login",loginVS,valitatorVS,loginController)
authRouter.post("/logout",logoutController)

export default authRouter