"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpenses = exports.addExpense = void 0;
const Expense_model_1 = __importDefault(require("../models/Expense.model"));
// Create new expense
const addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        // validation
        if (!title || title.length < 3)
            return res.status(400).json({ message: "Title min length 3" });
        if (!amount || amount <= 0)
            return res.status(400).json({ message: "Amount must be > 0" });
        if (!date || isNaN(Date.parse(date)))
            return res.status(400).json({ message: "Invalid date" });
        const expense = new Expense_model_1.default({
            title,
            amount,
            category,
            date,
            user: req.user.id,
        });
        await expense.save();
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.addExpense = addExpense;
// Get all
const getExpenses = async (req, res) => {
    try {
        const filter = { user: req.user.id };
        // Filter
        if (req.query.category) {
            filter.category = req.query.category;
        }
        // ?from=2025-08-01&to=2025-08-14
        const from = req.query.from ? new Date(req.query.from) : null;
        const to = req.query.to ? new Date(req.query.to) : null;
        if (from && to) {
            filter.date = { $gte: from, $lte: to };
        }
        else if (from) {
            filter.date = { $gte: from };
        }
        else if (to) {
            filter.date = { $lte: to };
        }
        const expenses = await Expense_model_1.default.find(filter).sort({ date: -1 });
        res.json(expenses);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getExpenses = getExpenses;
// Update
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense_model_1.default.findOne({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!expense)
            return res.status(404).json({ message: "Expense not found" });
        const { title, amount, category, date } = req.body;
        if (title && title.length >= 3)
            expense.title = title;
        if (amount && amount > 0)
            expense.amount = amount;
        if (category)
            expense.category = category;
        if (date && !isNaN(Date.parse(date)))
            expense.date = date;
        await expense.save();
        res.json(expense);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateExpense = updateExpense;
// Delete an expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense_model_1.default.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!expense)
            return res.status(404).json({ message: "Expense not found" });
        res.json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteExpense = deleteExpense;
