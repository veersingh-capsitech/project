import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret_key = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    req.decoded = decoded;
    next();
  });
};
