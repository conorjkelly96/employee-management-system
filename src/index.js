// importing dependencies - DO NOT REMOVE
const mysql = require("mysql2");
const inquirer = require("inquirer");
const {
  userOptions,
  continueProcess,
  departmentInfo,
  roleInfo,
  employeeInfo,
  updateEmployeeInfo,
} = require("./questions.js");
const Db = require("./lib/Db");
// const { dbOptions } = require("./db/databaseConfiguration");
// const db = mysql.createConnection(dbOptions);
const table = require("table");
const config = {
  // Predefined styles of table
  border: table.getBorderCharacters("ramac"),
};

// initialize user interaction
const init = async () => {
  const db = new Db({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Password123!!",
    database: process.env.DB_NAME || "company_db",
  });

  await db.start();

  // Whilst the session is true, prompt the questions to the user
  let inProgress = true;

  let userChoice = await inquirer.prompt(userOptions);

  while (inProgress) {
    // if VIEW ALL DEPARTMENTS, then retrieve from database and display table
    if (userChoice.userAction === "View all departments") {
      const departments = await db.query("SELECT * FROM department");
      console.table(departments);
    }

    // if VIEW ALL ROLES, then retrieve from database and display table
    if (userChoice.userAction === "View all roles") {
      const roles = await db.query("SELECT * FROM role");
      console.table(roles);
    }

    // if VIEW ALL EMPLOYEES, then retrieve from database and display table
    if (userChoice.userAction === "View all employees") {
      const employees = await db.query("SELECT * FROM employee");
      console.table(employees);
    }

    // if ADD A DEPARTMENT, then give the user the choice to add a department name
    if (userChoice.userAction === "Add a department") {
      // prompt questions to user
      const insertIntoDepartment = await inquirer.prompt(departmentInfo);
      const departmentValues = `("${insertIntoDepartment.departmentName}")`;

      // template string query for department table
      const departmentQuery = `INSERT INTO department(name) VALUE(${departmentValues})`;

      db.query(departmentQuery, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(
          `Successfully added ${insertIntoDepartment.departmentName} to department table.`
        );
      });
    }

    // if ADD A ROLE, then give the user the choice to add a role name
    if (userChoice.userAction === "Add a role") {
      // prompt questions to user
      const insertIntoRole = await inquirer.prompt(roleInfo);
      const roleValues = `('${insertIntoRole.roleName}', '${insertIntoRole.roleSalary}', '${insertIntoRole.roleDepartment}')`;

      // template string query for role table
      const roleQuery = `INSERT INTO role(title, salary, department_id) VALUE(${roleValues})`;

      db.query(roleQuery, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(
          `Successfully added '${insertIntoRole.roleName}' to role table.`
        );
      });
    }

    // if ADD AN EMPLOYEE, then give the user the choice to add an employee
    if (userChoice.userAction === "Add an employee") {
      // prompt questions to user
      const insertIntoEmployee = await inquirer.prompt(employeeInfo);
      const employeeValues = `('${insertIntoEmployee.first_name}', '${insertIntoEmployee.last_name}', '${insertIntoEmployee.role_id}','${insertIntoEmployee.manager_id}', )`;

      // template string query for department table
      const employeeQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE(${employeeValues})`;

      db.query(employeeQuery, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(
          `Successfully added  '${insertIntoEmployee.first_name}' '${insertIntoEmployee.last_name}'to employee table.`
        );
      });
    }

    // if ADD AN EMPLOYEE, then give the user the choice to add an employee
    if (userChoice.userAction === "Update Employee role") {
      console.log("Update Employee role");
      //prompt questions to user
      const updatesToEmployeeRecord = await inquirer.prompt(updateEmployeeInfo);
      const employeeUpdateValues = `('${updatesToEmployeeRecord.first_name}', '${insertIntoEmployee.last_name}', '${insertIntoEmployee.role_id}','${insertIntoEmployee.manager_id}', )`;

      // template string query for department table
      const employeeQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE(${employeeUpdateValues})`;

      db.query(employeeQuery, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(
          `Successfully added  '${insertIntoEmployee.first_name}' '${insertIntoEmployee.last_name}'to employee table.`
        );
      });
    }

    // confirm if user would still like to interact with the database
    const wouldYouLikeToContinue = await inquirer.prompt(continueProcess);

    if (!wouldYouLikeToContinue.wouldYouLikeToContinue) {
      inProgress = false;
      db.stop();
      console.log("Session closed.");
    } else {
      const userChoice = await inquirer.prompt(userOptions);
      console.log(userChoice);
    }

    // prompt main questions again
  }
};

init();
