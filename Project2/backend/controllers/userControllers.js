import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await db.collection("user").findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already exists" });
    }
    const existingUsername = await db.collection("user").findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("user").insertOne({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.collection("user").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const tokenData = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    const token = JWT.sign(tokenData, JWT_SECRET, {
      expiresIn: "1m",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await db.collection("user").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get User Profile Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};