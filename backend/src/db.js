// backend/src/db.js
import knex from "knex";
import config from "../knexfile.js";

// initialize knex using the "development" environment
const db = knex(config.development);

// test the PostgreSQL connection immediately on startup
db.raw("SELECT 1")
  .then(() => {
    console.log("✅ PostgreSQL connected successfully!");
  })
  .catch((err) => {
    console.error("❌ PostgreSQL connection failed!");
    console.error("Error details:", err.message);
    console.error("Check your DATABASE_URL in .env or knexfile.js credentials.");
    process.exit(1); // exit app if connection fails
  });

export default db;
