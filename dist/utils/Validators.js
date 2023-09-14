"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subsribeVS = exports.suggestProductVS = exports.valitatorVS = exports.registerVS = exports.loginVS = void 0;
const express_validator_1 = require("express-validator");
const passwordVS = (0, express_validator_1.body)('password').escape().exists({ checkFalsy: true }).withMessage("Password required").isString().withMessage('Password must be string').isLength({ min: 3 })
    .withMessage('Password must be at least 3 char long');
const usernameVS = (0, express_validator_1.body)('username').escape().exists({ checkFalsy: true }).withMessage('Username is required').isString().withMessage("Username must be a string");
const emailVs = (0, express_validator_1.body)('email').escape().exists({ checkFalsy: true }).withMessage("Email is required")
    .trim().isEmail().withMessage("Provide valid email format").isLength({ min: 3 }).withMessage("Email length must be at least 3 characters");
//register 
const nameVS = (0, express_validator_1.body)('name').escape().exists({ checkFalsy: true }).withMessage('Name is required').isString().withMessage("Name must be a string");
const suggestionVS = (0, express_validator_1.body)('suggestion').escape().exists({ checkFalsy: true }).withMessage('Suggestion is required').isString().withMessage("Suggestion must be of type string");
const subsribeVS = [emailVs];
exports.subsribeVS = subsribeVS;
const registerVS = [passwordVS, emailVs];
exports.registerVS = registerVS;
const suggestProductVS = [emailVs, nameVS, suggestionVS];
exports.suggestProductVS = suggestProductVS;
const valitatorVS = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        //todo chheck for valid incase passport uses req.body.email req.body.password
        console.log((0, express_validator_1.matchedData)(req));
        //console.trace()
        req.matchedData = (0, express_validator_1.matchedData)(req);
        return next();
    }
    else if (!errors.isEmpty()) {
        res.statusCode = 400; //bad request
        res.json({ errors: errors.array() });
    }
};
exports.valitatorVS = valitatorVS;
//login
const loginVS = [emailVs, passwordVS];
exports.loginVS = loginVS;
