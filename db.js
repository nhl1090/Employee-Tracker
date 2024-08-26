const { Pool } = require('pg');
const queries = require('./queries');

// Load environment variables from .env
require('dotenv').config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres', // Default PostgreSQL user
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'company_db',
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  connectionTimeoutMillis: 5000, // 5 seconds timeout for connecting to the database
  idleTimeoutMillis: 10000, // 10 seconds timeout for idle clients
  max: 20, // Maximum number of clients in the pool
  min: 4,  // Minimum number of clients in the pool
});

// Function to execute queries
const executeQuery = async (query, params = []) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Function to handle transactions
const executeTransaction = async (queriesWithParams) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const { query, params } of queriesWithParams) {
      await client.query(query, params);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Example functions to interact with the database
const getAllDepartments = async () => {
  return await executeQuery(queries.viewAllDepartments);
};

const getAllRoles = async () => {
  return await executeQuery(queries.viewAllRoles);
};

const getAllEmployees = async () => {
  return await executeQuery(queries.viewAllEmployees);
};

const addDepartment = async (departmentName) => {
  return await executeQuery(queries.addDepartment, [departmentName]);
};

const addRole = async (title, salary, departmentId) => {
  return await executeQuery(queries.addRole, [title, salary, departmentId]);
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  return await executeQuery(queries.addEmployee, [firstName, lastName, roleId, managerId]);
};

const updateEmployeeRole = async (roleId, employeeId) => {
  return await executeQuery(queries.updateEmployeeRole, [roleId, employeeId]);
};

// Graceful shutdown
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Pool has ended');
  });
});

// Export functions to be used in other parts of the application
module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  pool, // Exporting pool for connection management in other parts of the app
  executeTransaction, // Exporting transaction function for complex operations
};
