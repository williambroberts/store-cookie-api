"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Validators_1 = require("../utils/Validators");
const storeController_1 = require("../Controllers/storeController");
const storeRouter = express_1.default.Router();
storeRouter.post("/email", Validators_1.subsribeVS, Validators_1.valitatorVS, storeController_1.subscribeController);
storeRouter.post("/suggest", Validators_1.suggestProductVS, Validators_1.valitatorVS, storeController_1.suggestProductController);
exports.default = storeRouter;
