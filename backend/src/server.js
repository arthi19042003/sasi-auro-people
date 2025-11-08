// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db.js"; // this tests PostgreSQL connection
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import timeRoutes from "./routes/timeRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "✅ AURO People API is running and connected to PostgreSQL",
  });
});

// main API routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/time", timeRoutes);

// handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ AURO People backend running on port ${PORT}`);
});
