import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expense.routes";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "https://cashflow-newclient.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("CashFlow API is running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
