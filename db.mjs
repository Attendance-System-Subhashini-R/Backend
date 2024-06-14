import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

let connection;

try {
  // Create a new connection to the MySQL database using environment variables
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("Connected to the database.");
} catch (error) {
  console.error("Error connecting to the database:", error.message);
}

export default connection;
