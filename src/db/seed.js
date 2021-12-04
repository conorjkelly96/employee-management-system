// importing dependencies - DO NOT REMOVE
const mysql = require("mysql2");
const department = require("./data/department");
const employee = require("./data/employee");
const role = require("./data/role");

// database configuration
const dbOptions = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Password123!!",
  database: process.env.DB_NAME || "company_db",
};

// creating connection to database
const db = mysql.createConnection(dbOptions);

// creating values for department
const departmentValues = department
  .map((department) => `("${department.name}")`)
  .join(",");

// template string query for department table
const departmentQuery = `INSERT INTO department(name) VALUE${departmentValues}`;

db.query(departmentQuery, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Successfully entered DEPARTMENTS into department table.");
  //   db.end();
});

// creating values for employee
const employeeValues = employee
  .map(
    (employee) =>
      `('${employee.first_name}', '${employee.last_name}', '${employee.role_id}', ${employee.manager_id})`
  )
  .join(",");

// template string query for employee table
const employeeQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE${employeeValues}`;

db.query(employeeQuery, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Successfully entered EMPLOYEES into employee table.");
  //   db.end();
});

// creating values for role
const roleValues = role
  .map((role) => `('${role.title}', '${role.salary}', '${role.department_id}')`)
  .join(",");

// template string query for role table
const roleQuery = `INSERT INTO role(title, salary, department_id) VALUE${roleValues}`;

db.query(roleQuery, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Successfully entered ROLES into role table.");
  //   db.end();
});
