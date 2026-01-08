import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import JWT from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());
const url = "mongodb://localhost:27017/";
const dbName = "add";
const client = new MongoClient(url);
const connectDB = async () => {
  await client.connect();
  const db = client.db(dbName);
  app.post("/login", async (req, res) => {
    try {
      const collection = db.collection("user");
      const { username, password } = req.body;

      const user = await collection.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({
        message: "Login successful",
        token: JWT.sign({ username: user.username }, "secret_key", {
          expiresIn: "1h",
        }),
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
  app.post("/signup", async (req, res) => {
    try {
      const collection = db.collection("user");
      const { username, password, email } = req.body;
      const newUser = await collection.insertOne({
        username,
        password,
        email,
      });

      res.json({
        message: "User registered successfully",

    
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
  app.listen(3001);
};

connectDB()