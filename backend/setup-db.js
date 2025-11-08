// backend/setup-db.js
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const MIGRATIONS_PATH = path.join(process.cwd(), "migrations");

// 1️⃣ Create migrations folder if it does not exist
if (!fs.existsSync(MIGRATIONS_PATH)) {
  fs.mkdirSync(MIGRATIONS_PATH, { recursive: true });
  console.log("✅ Created migrations folder");
}

// 2️⃣ Create migration files
const migrations = [
  {
    filename: "20251106130000_create_roles_table.js",
    content: `export async function up(knex) {
  await knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
  });
}
export async function down(knex) {
  await knex.schema.dropTableIfExists('roles');
};`,
  },
  {
    filename: "20251106130500_create_employees_table.js",
    content: `export async function up(knex) {
  await knex.schema.createTable('employees', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL');
    table.timestamps(true, true);
  });
}
export async function down(knex) {
  await knex.schema.dropTableIfExists('employees');
};`,
  },
  {
    filename: "20251106131000_create_attendance_table.js",
    content: `export async function up(knex) {
  await knex.schema.createTable('attendance', (table) => {
    table.increments('id').primary();
    table.integer('employee_id').unsigned().notNullable().references('id').inTable('employees').onDelete('CASCADE');
    table.date('date').notNullable();
    table.time('check_in');
    table.time('check_out');
    table.timestamps(true, true);
  });
}
export async function down(knex) {
  await knex.schema.dropTableIfExists('attendance');
};`,
  },
];

// Write migration files
migrations.forEach((mig) => {
  const filePath = path.join(MIGRATIONS_PATH, mig.filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, mig.content, "utf8");
    console.log(`✅ Created migration file: ${mig.filename}`);
  }
});

// 3️⃣ Create database (if not exists)
const dbName = process.env.DB_NAME || "auro_people";
const dbUser = process.env.DB_USER || "postgres";

// On Windows, using PowerShell to create database if not exists
const createDbCommand = `
psql -U ${dbUser} -tc "SELECT 1 FROM pg_database WHERE datname='${dbName}'" | findstr 1 || psql -U ${dbUser} -c "CREATE DATABASE ${dbName};"
`;

exec(createDbCommand, { shell: "powershell.exe" }, (err, stdout, stderr) => {
  if (err) {
    console.log("❌ Error creating database (make sure PostgreSQL is running):", stderr);
    return;
  }
  console.log(`✅ Database '${dbName}' is ready`);

  // 4️⃣ Run knex migrations
  exec("npx knex migrate:latest", (err2, stdout2, stderr2) => {
    if (err2) {
      console.log("❌ Error running migrations:", stderr2);
      return;
    }
    console.log("✅ Migrations completed successfully");
    console.log(stdout2);
  });
});
