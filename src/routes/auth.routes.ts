import { Router } from "express";
import { register, login, getProfile } from "../controller/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, getProfile);

export default router;
