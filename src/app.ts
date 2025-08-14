import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expense.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("CashFlow API is running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
