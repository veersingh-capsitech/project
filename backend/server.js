import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

connectDB();
app.listen(PORT)


