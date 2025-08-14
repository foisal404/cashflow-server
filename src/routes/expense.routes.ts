import { Router } from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controller/expense.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", isAuthenticated, addExpense);
router.get("/", isAuthenticated, getExpenses);
router.patch("/:id", isAuthenticated, updateExpense);
router.delete("/:id", isAuthenticated, deleteExpense);

export default router;
