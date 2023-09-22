import express from "express"
import { loginVS, registerVS, valitatorVS } from "../utils/Validators"
import { loginController, logoutController, registerController, statusController } from "../Controllers/authControllers"
import { enableAuthenticate } from "../Middleware/authMiddleware"

const authRouter = express.Router()


authRouter.post("/login",loginVS,valitatorVS,loginController)
authRouter.post("/logout",logoutController)
authRouter.post("/regitser",registerVS,valitatorVS,registerController)

// protected test if really auth validate cookie
authRouter.get("/status",enableAuthenticate,statusController)
export default authRouter