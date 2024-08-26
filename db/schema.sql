-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- Create the department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create the role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10, 2) NOT NULL CHECK (salary > 0),  -- Defined precision and scale for salary, added CHECK constraint
    department_id INTEGER REFERENCES department(id) ON DELETE SET NULL  -- If department is deleted, set to NULL
);

-- Create the employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER REFERENCES role(id) ON DELETE SET NULL,  -- If role is deleted, set to NULL
    manager_id INTEGER REFERENCES employee(id) ON DELETE SET NULL  -- If manager is deleted, set to NULL
);

-- Indexes for performance
CREATE INDEX idx_role_department_id ON role(department_id);
CREATE INDEX idx_employee_role_id ON employee(role_id);
CREATE INDEX idx_employee_manager_id ON employee(manager_id);
