"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middleware/error_middleware"));
const dotenv_1 = __importDefault(require("dotenv"));
const cyberwares_store_1 = __importDefault(require("./handlers/cyberwares-store"));
const orders_1 = __importDefault(require("./handlers/orders"));
const users_1 = __importDefault(require("./handlers/users"));
dotenv_1.default.config();
const { PORT } = process.env;
const port = PORT || 3030;
//server instance
const app = (0, express_1.default)();
//middleware to parse the requests
app.use(express_1.default.json());
//main endpoint route
app.get('/', (_req, res) => {
    res.send('Welcome to the second project');
});
app.use(error_middleware_1.default);
(0, cyberwares_store_1.default)(app);
(0, orders_1.default)(app);
(0, users_1.default)(app);
//express server start
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
exports.default = app;
