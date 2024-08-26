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

// Example functions to interact with the database

// View all departments
const getAllDepartments = async () => {
  return await executeQuery(queries.viewAllDepartments);
};

// View all roles
const getAllRoles = async () => {
  return await executeQuery(queries.viewAllRoles);
};

// View all employees
const getAllEmployees = async () => {
  return await executeQuery(queries.viewAllEmployees);
};

// Add a department
const addDepartment = async (departmentName) => {
  return await executeQuery(queries.addDepartment, [departmentName]);
};

// Add a role
const addRole = async (title, salary, departmentId) => {
  return await executeQuery(queries.addRole, [title, salary, departmentId]);
};

// Add an employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
  return await executeQuery(queries.addEmployee, [firstName, lastName, roleId, managerId]);
};

// Update an employee's role
const updateEmployeeRole = async (roleId, employeeId) => {
  return await executeQuery(queries.updateEmployeeRole, [roleId, employeeId]);
};

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
};
