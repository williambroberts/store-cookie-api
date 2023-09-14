"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.loginController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Errors_1 = require("../utils/Errors");
const config_1 = __importDefault(require("../db/config"));
const passwords_1 = require("../Helpers/passwords");
exports.loginController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.matchedData;
    console.log(email, password);
    if (!email) {
        throw new Errors_1.BadRequestError("Email required");
    }
    if (!password) {
        throw new Errors_1.BadRequestError("Password required");
    }
    const [result] = yield config_1.default.query(`
    SELECT DISTINCT * FROM store_users
    WHERE email = ?
    LIMIT 1;
    `, [email]);
    if (result.length === 0) {
        throw new Errors_1.BadRequestError("Email invalid");
    }
    let [user] = result;
    if (!user.password || !user.email) {
        throw new Errors_1.InternalServerError("Invalid user object");
    }
    //validate password
    const passwords = { raw: password, hash: user === null || user === void 0 ? void 0 : user.password };
    const match = (0, passwords_1.comparePassword)(passwords);
    if (!match) {
        throw new Errors_1.BadRequestError("Invalid password");
    }
    //const sessionToken = req.sessionID
    //generateAuthCookie(res,sessionToken)
    // req.session.sessionToken = sessionToken
    res.status(200);
    res.json({
        success: true, isAuth: true
    });
}));
exports.logoutController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if cookie and correct in del session/destroy
    // check cookie
    // validate cookie vs sessionstore
    // destory cookie + session
    if (process.env.SESSION_NAME) {
        let sessionName = process.env.SESSION_NAME;
        res.clearCookie(sessionName);
        req.session.destroy(function (err) {
            if (err) {
                throw new Errors_1.InternalServerError("Error destroying session");
            }
            res.status(200);
            res.json({ success: true });
        });
    }
}));
