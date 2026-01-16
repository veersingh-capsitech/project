import express from "express";
import { login, signup } from "../controllers/userControllers.js";
// import jwtController from "../controllers/jwtController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
// router.get("/profile", jwtController, getUserProfile);

export default router;
