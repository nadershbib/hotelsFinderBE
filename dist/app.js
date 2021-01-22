"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const HotelRouter_1 = __importDefault(require("./routes/HotelRouter"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
// GLOBAL MIDDLEWARES
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(morgan_1.default('tiny'));
// Routes
app.use('/api/v1/hotels', HotelRouter_1.default);
exports.default = app;
