"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const config_1 = __importDefault(require("./db/config"));
const authRouter_1 = __importDefault(require("./Routers/authRouter"));
let SESSION = express_session_1.default;
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleware_1 = require("./Middleware/errorMiddleware");
const body_parser_1 = __importDefault(require("body-parser"));
const authMiddleware_1 = require("./Middleware/authMiddleware");
function createApp() {
    const app = (0, express_1.default)();
    const MySQLStore = (0, express_mysql_session_1.default)(SESSION);
    let options = {};
    if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PORT && process.env.DB_PASSWORD && process.env.DB_DATABASE) {
        options = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        };
    }
    const sessionStore = new MySQLStore(options, config_1.default);
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    let sessionName = "";
    if (process.env.SESSION_NAME) {
        sessionName = process.env.SESSION_NAME;
    }
    app.use(SESSION({
        name: sessionName,
        saveUninitialized: false,
        resave: false,
        secret: "3824398",
        store: sessionStore,
        cookie: {
            secure: true,
            sameSite: 'none',
        }
    }));
    sessionStore.onReady().then(() => {
        // MySQL session store ready for use.
        console.log('MySQLStore ready');
    }).catch(error => {
        // Something went wrong.
        console === null || console === void 0 ? void 0 : console.error(error);
    });
    sessionStore.close().then(() => {
        // Successfuly closed the MySQL session store.
        console.log('MySQLStore closed');
    }).catch(error => {
        // Something went wrong.
        console.error(error);
    });
    app.use((0, compression_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000", "https://ninjafront.vercel.app", "https://store-five-xi.vercel.app"],
        credentials: true
    }));
    app.use("/auth", authRouter_1.default);
    //
    app.use((req, res, next) => {
        let session = req.session;
        let sessionID = req.sessionID;
        console.log(sessionID, req.session.viewCount);
        if (!req.session.viewCount) {
            req.session.viewCount = 1;
            console.log(req.session.viewCount);
        }
        else {
            req.session.viewCount++;
        }
        next();
    });
    app.get("/", (req, res) => {
        res.status(200);
        res.json({ success: "true 🕊️", session: req.session, sessionId: req.sessionID });
    });
    app.get("/profile", authMiddleware_1.enableAuthenticate, (req, res) => {
        res.status(200);
        res.json({ success: "ok through" });
    });
    app.use('*', (req, res) => {
        console.log(req.originalUrl, "*");
        res.status(404);
        res.json({
            success: false,
            error: "not found"
        });
    });
    app.use(errorMiddleware_1.errorHandler);
    return app;
}
exports.default = createApp;
