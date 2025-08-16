import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb"; 
import cors from "cors";

dotenv.config();

// MongoDB Client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // App & Database
    const dbName = process.env.DB_NAME;
    const db = client.db(dbName);
    const app = express();
    const port = 3000;

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Get all the passwords
    app.get("/", async (req, res) => {
      try {
        const collection = db.collection("passwords");
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Save a password
    app.post("/", async (req, res) => {
      try {
        const password = req.body;
        const collection = db.collection("passwords");
        const result = await collection.insertOne(password);
        res.send({ success: true, result });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Delete a password by id
    app.delete("/", async (req, res) => {
      try {
        const { id } = req.body;
        const password = req.body; // expects { _id: ObjectId(...) }
        const collection = db.collection("passwords");
        const result = await collection.deleteOne(password);
        res.send({ success: true, result });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Could not connect to MongoDB:", err.message);
  }
}

startServer();
