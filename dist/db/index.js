"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.CONNECTION_URL);
const connectionString = process.env.CONNECTION_URL;
const pool = new pg_1.Pool({
    connectionString,
});
let obj = {
    query: (text, params) => pool.query(text, params)
};
exports.default = obj;
