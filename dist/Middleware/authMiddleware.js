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
exports.enableAuthenticate = void 0;
const Errors_1 = require("../utils/Errors");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const config_1 = __importDefault(require("../db/config"));
exports.enableAuthenticate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check cookie and session store
    if (!req.cookies) {
        throw new Errors_1.UnauthorizedError("No cookies sent with request");
    }
    let cookies = req.cookies;
    let sessionCookie = "";
    if (process.env.SESSION_NAME) {
        sessionCookie = cookies[process.env.SESSION_NAME];
        if (!sessionCookie) {
            // todo change to ok response to hide mechanism of protect route
            throw new Errors_1.UnauthorizedError("No cookie with session name");
        }
        //get sessionid from cookie 
        let idFromCookie = sessionCookie.split(":")[1].split(".")[0];
        console.log(idFromCookie);
        const [result] = yield config_1.default.query(`
     select distinct * from sessions
     where session_id = ?
     `, [idFromCookie]);
        let row = result[0];
        console.log(row);
        if (row.session_id === idFromCookie) {
            console.log(row.session_id);
            return next();
        }
        else {
            throw new Errors_1.UnauthorizedError("Invalid cookie");
        }
    }
    throw new Errors_1.InternalServerError("Session name error");
}));
