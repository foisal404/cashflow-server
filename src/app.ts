import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("CashFlow API is running!");
});
app.use("/api/auth", authRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
