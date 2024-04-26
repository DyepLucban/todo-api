import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Define the SQL statement to create the users table
const createTableQuery = `
  CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Function to run the migration
const createTasksTable = async () => {
  const client = await pool.connect();
  try {
    // Execute the SQL query to create the users table
    await client.query(createTableQuery);
    console.log('Tasks table created successfully');
  } catch (error) {
    console.error('Error creating Tasks table:', error);
  } finally {
    client.release();
  }
};

// Run the migration function
createTasksTable();