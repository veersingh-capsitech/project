import express from "express";
import { login, signup,getUserProfile } from "../controllers/userControllers.js";
import { verifyToken } from "../Middleware/verifyToken.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/profile/:id", verifyToken, getUserProfile);

export default router;
