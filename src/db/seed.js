// use the class here to refactor

// importing dependencies - DO NOT REMOVE
const mysql = require("mysql2");
const department = require("./data/department");
const employee = require("./data/employee");
const role = require("./data/role");
const { dbOptions } = require("../db/databaseConfiguration.js");

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

// TESTING FOR DATABASE CONNECTION USE ONLY
// const getDepartmentList = () => {
//   const departmentList = `SELECT name FROM department;`;
//   // get the department name
//   db.query(departmentList, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const departmentValues = [];
//     result.forEach((departmentName) =>
//       console.log(departmentValues.push(departmentName.name))
//     );
//   });
// };

// getDepartmentList();
