import { Router } from "express";
import {
  register,
  login,
  getProfile,
  logout,
} from "../controller/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/profile", isAuthenticated, getProfile);

export default router;
