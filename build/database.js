"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let client = new pg_1.Pool({});
const { ENV, POSTGRES_HOST, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, } = process.env;
console.log('environment is ' + ENV);
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = client;
