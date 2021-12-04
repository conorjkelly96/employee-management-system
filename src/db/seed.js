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

  console.log("Successfully entered DEPARTMENTS into department_db");
  db.end();
});
