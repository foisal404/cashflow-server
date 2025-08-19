"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getProfile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const User_model_1 = __importDefault(require("../models/User.model"));
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_model_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already registered" });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new User_model_1.default({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User_model_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        // Generate jwt token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwtSecret, {
            expiresIn: "1d",
        });
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure: false,
        //   sameSite: "lax",
        //   maxAge: 24 * 60 * 60 * 1000,
        // });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            domain: "cashflow-newclient.vercel.app",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        const user = await User_model_1.default.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getProfile = getProfile;
const logout = async (req, res) => {
    try {
        // res.clearCookie("token", {
        //   httpOnly: true,
        //   secure: false,
        //   sameSite: "lax",
        //   path: "/",
        // });
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            domain: "cashflow-newclient.vercel.app",
            path: "/",
        });
        res.json({ message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.logout = logout;
