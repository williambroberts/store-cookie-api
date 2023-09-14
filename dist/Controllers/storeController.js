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
exports.suggestProductController = exports.subscribeController = void 0;
const Errors_1 = require("../utils/Errors");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const config_1 = __importDefault(require("../db/config"));
const origins = ["http://localhost:3000", "https://ninjafront.vercel.app", "https://store-five-xi.vercel.app"];
exports.subscribeController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //query db add email to the store_emails table
    let { email } = req.matchedData;
    console.log("email sub controller", email);
    const result = yield config_1.default.query(`
    insert ignore into store_emails (email)
    VALUES (?);
    `, [email]);
    if (result) {
        //todo check origins and other headers
        const reqOrigin = req.get('origin');
        if (origins.includes(reqOrigin)) {
            res.header('Access-Control-Allow-Origin');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.status(200);
            res.json({
                success: true,
                email: email
            });
        }
        else {
            throw new Errors_1.BadRequestError("origin not allowed");
        }
    }
    else {
        throw new Errors_1.InternalServerError("Subscription failed");
    }
}));
const suggestProductController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, suggestion } = req.matchedData;
    if (!name || !email || !suggestion) {
        throw new Errors_1.BadRequestError("Invalid Request");
    }
    const result = yield config_1.default.query(`
    insert into store_suggestion (name,email,suggestion)
    values (?,?,?)
    `, [name, email, suggestion]);
    if (result) {
        res.status(200);
        res.json({
            success: true,
            result: result
        });
    }
    else {
        throw new Errors_1.InternalServerError("error inserting product suggesstion");
    }
}));
exports.suggestProductController = suggestProductController;
