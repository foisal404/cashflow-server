import { Response } from "express";
import Expense, { IExpense } from "../models/Expense.model";
import { AuthRequest } from "../middlewares/auth.middleware";

// Create new expense
export const addExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { title, amount, category, date } = req.body;

    // validation
    if (!title || title.length < 3)
      return res.status(400).json({ message: "Title min length 3" });
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Amount must be > 0" });
    if (!date || isNaN(Date.parse(date)))
      return res.status(400).json({ message: "Invalid date" });

    const expense = new Expense({
      title,
      amount,
      category,
      date,
      user: req.user!.id,
    });
    await expense.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all
export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await Expense.find({ user: req.user!.id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update
export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user!.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    const { title, amount, category, date } = req.body;

    if (title && title.length >= 3) expense.title = title;
    if (amount && amount > 0) expense.amount = amount;
    if (category) expense.category = category;
    if (date && !isNaN(Date.parse(date))) expense.date = date;

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an expense
export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user!.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
