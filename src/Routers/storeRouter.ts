import express from "express"
import { subsribeVS, suggestProductVS, valitatorVS } from "../utils/Validators"
import { subscribeController, suggestProductController } from "../Controllers/storeController"

const storeRouter = express.Router()

storeRouter.post("/email",subsribeVS,valitatorVS,subscribeController)
storeRouter.post("/suggest",suggestProductVS,valitatorVS,suggestProductController)


export default storeRouter