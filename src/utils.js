// importing dependencies - DO NOT REMOVE
const mysql = require("mysql2");
const { dbOptions } = require("./db/databaseConfiguration");
const db = mysql.createConnection(dbOptions);

// take the employee name from updateEmployeeInfo query, search database and retrieve id
const getEmployeeList = () => {
  const employeeList = `SELECT name FROM employee;`;
  // get the department name
  db.query(employeeList, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const employeeValues = [];
    result.forEach((employeeName) =>
      console.log(employeeValues.push(employeeName.name))
    );
  });
};

const getDepartmentList = () => {
  const departmentList = `SELECT name FROM department;`;
  // get the department name
  db.query(departmentList, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const departmentValues = [];
    result.forEach((departmentName) =>
      departmentValues.join(",").push(departmentName.name)
    );
  });
};

module.exports = {
  getEmployeeList,
  getDepartmentList,
};
