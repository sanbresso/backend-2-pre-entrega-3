import { Router } from "express";
import { getSessionsInfo, registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/sessions.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getSessionsInfo);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", authMiddleware, getCurrentUser);
router.post("/logout", logoutUser);

export default router;