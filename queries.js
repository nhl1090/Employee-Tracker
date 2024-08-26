const queries = {
  // View all departments
  viewAllDepartments: `
    SELECT 
      department.id AS "Department ID", 
      department.name AS "Department Name"
    FROM 
      department;
  `,

  // View all roles
  viewAllRoles: `
    SELECT 
      role.id AS "Role ID", 
      role.title AS "Job Title", 
      department.name AS "Department", 
      role.salary AS "Salary"
    FROM 
      role
    JOIN 
      department ON role.department_id = department.id;
  `,

  // View all employees
  viewAllEmployees: `
    SELECT 
      employee.id AS "Employee ID", 
      employee.first_name AS "First Name", 
      employee.last_name AS "Last Name", 
      role.title AS "Job Title", 
      department.name AS "Department", 
      role.salary AS "Salary", 
      CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
    FROM 
      employee
    JOIN 
      role ON employee.role_id = role.id
    JOIN 
      department ON role.department_id = department.id
    LEFT JOIN 
      employee manager ON employee.manager_id = manager.id;
  `,

  // Add a new department
  addDepartment: `
    INSERT INTO department (name)
    VALUES ($1);
  `,

  // Add a new role
  addRole: `
    INSERT INTO role (title, salary, department_id)
    VALUES ($1, $2, $3);
  `,

  // Add a new employee
  addEmployee: `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4);
  `,

  // Update an employee's role
  updateEmployeeRole: `
    UPDATE employee
    SET role_id = $1
    WHERE id = $2;
  `,
};

module.exports = queries;
