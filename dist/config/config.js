"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    mongoURI: process.env.MONGO_URI || "",
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || "production",
    jwtSecret: process.env.JWT_SECRET || "secret",
};
exports.default = config;
