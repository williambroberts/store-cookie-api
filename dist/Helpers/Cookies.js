"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthCookie = void 0;
const Errors_1 = require("../utils/Errors");
const generateAuthCookie = (res, sessionToken) => {
    if (!sessionToken) {
        throw new Errors_1.InternalServerError("Missing session id");
    }
    const now = new Date();
    const expiresAt = new Date(+now + 60 * 60 * 1000); //1 hour
    console.log(expiresAt, now);
    res.cookie('sessionToken', sessionToken, {
        sameSite: "lax",
        secure: false,
        expires: expiresAt
    });
};
exports.generateAuthCookie = generateAuthCookie;
