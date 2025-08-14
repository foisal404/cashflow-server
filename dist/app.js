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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// Routes
app.get("/", (req, res) => {
    res.send("CashFlow API is running!");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/expenses", expense_routes_1.default);
// Global error handler (should be after routes)
app.use(errorHandler_1.errorHandler);
exports.default = app;
