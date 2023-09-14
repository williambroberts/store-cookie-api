"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Validators_1 = require("../utils/Validators");
const authControllers_1 = require("../Controllers/authControllers");
const authRouter = express_1.default.Router();
authRouter.post("/login", Validators_1.loginVS, Validators_1.valitatorVS, authControllers_1.loginController);
authRouter.post("/logout", authControllers_1.logoutController);
exports.default = authRouter;
