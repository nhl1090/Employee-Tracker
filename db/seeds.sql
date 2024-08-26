-- Insert data into department table with explicit columns
INSERT INTO department (name)
VALUES 
    ('Human Resources'),
    ('Engineering'),
    ('Marketing'),
    ('Finance');

-- Insert data into role table with explicit columns
INSERT INTO role (title, salary, department_id)
VALUES 
    ('HR Manager', 60000.00, 1),
    ('Software Engineer', 80000.00, 2),
    ('Marketing Specialist', 55000.00, 3),
    ('Financial Analyst', 65000.00, 4);

-- Insert data into employee table with explicit columns
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Alice', 'Johnson', 1, NULL),  -- HR Manager
    ('Bob', 'Smith', 2, NULL),      -- Software Engineer
    ('Charlie', 'Brown', 3, 1),     -- Marketing Specialist (reports to Alice)
    ('David', 'White', 4, 2);       -- Financial Analyst (reports to Bob)
