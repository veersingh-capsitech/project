import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.Db_Name;

export const client = new MongoClient(MONGO_URI);

export const connectDB = async () => {
  await client.connect();
};

export const db = client.db(DB_NAME);
