"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// app.use(
//   cors({
//     origin: "https://cashflow-newclient.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
app.use((0, cors_1.default)({
    origin: "https://cashflow-newclient.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Set-Cookie"],
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Authorization"],
}));
app.use(express_1.default.json());
// Routes
app.get("/", (req, res) => {
    res.send("CashFlow API is running!");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/expenses", expense_routes_1.default);
// Global error handler (should be after routes)
app.use(errorHandler_1.errorHandler);
exports.default = app;
