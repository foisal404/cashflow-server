import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expense.routes";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "https://cashflow-newclient.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "https://cashflow-newclient.vercel.app",
    credentials: true,
  })
);

// set headers for you to be able to set cookies on the browser
app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://cashflow-newclient.vercel.app"
  );
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
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
