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
const { dbOptions } = require("./db/databaseConfiguration");
const db = mysql.createConnection(dbOptions);
const table = require("table");
const config = {
  // Predefined styles of table
  border: table.getBorderCharacters("ramac"),
};

// initialize user interaction
const init = async () => {
  // Whilst the session is true, prompt the questions to the user
  let inProgress = true;

  let userChoice = await inquirer.prompt(userOptions);

  while (inProgress) {
    // if VIEW ALL DEPARTMENTS, then retrieve from database and display table
    if (userChoice.userAction === "View all departments") {
      db.query("SELECT * FROM department", (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.table(result);
      });
    }

    // if VIEW ALL ROLES, then retrieve from database and display table
    else if (userChoice.userAction === "View all roles") {
      db.query("SELECT * FROM role", (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.table(result);
      });
    }

    // if VIEW ALL EMPLOYEES, then retrieve from database and display table
    else if (userChoice.userAction === "View all employees") {
      db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.table(result);
      });
    }

    // if ADD A DEPARTMENT, then give the user the choice to add a department name
    else if (userChoice.userAction === "Add a department") {
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
    else if (userChoice.userAction === "Add a role") {
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
    else if (userChoice.userAction === "Add an employee") {
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
    else if (userChoice.userAction === "Update Employee role") {
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
      db.end();
      console.log("Session closed.");
    } else {
      const userChoice = await inquirer.prompt(userOptions);
      console.log(userChoice);
    }

    // prompt main questions again
  }
};

init();
