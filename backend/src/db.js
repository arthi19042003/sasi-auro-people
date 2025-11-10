import knex from "knex";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Check if DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in .env file");
  process.exit(1);
}

// Initialize Knex with PostgreSQL connection
const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 7 },
});

// Test connection
db.raw("SELECT 1")
  .then(() => {
    console.log("✅ PostgreSQL connected successfully!");
  })
  .catch((err) => {
    console.error("❌ PostgreSQL connection failed!");
    console.error("Error details:", err.message);
  });

export default db;
