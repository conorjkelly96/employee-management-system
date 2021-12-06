// importing dependencies - DO NOT REMOVE
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { userOptions, continueProcess } = require("./questions.js");
const { dbOptions } = require("./db/databaseConfiguration");
const db = mysql.createConnection(dbOptions);
const table = require("table");
const department = require("./db/data/department.js");
const config = {
  // Predefined styles of table
  border: table.getBorderCharacters("ramac"),
};
// const businessQuery = `"SELECT * FROM ${}`;

// initialize user interaction
const init = async () => {
  // Whilst the session is true, prompt the questions to the user
  let inProgress = true;

  const userChoice = await inquirer.prompt(userOptions);

  while (inProgress) {
    //   prompt userOptions
    console.log(userChoice);
    // if VIEW ALL DEPARTMENTS, then retrieve from database and display table
    if (userChoice.userAction === "View all departments") {
      db.query("SELECT * FROM department", (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        const rawData = JSON.stringify(result);
        const departmentTable = table.table(rawData, config);
        console.log(departmentTable);
        //   db.end();
      });
    }

    // if VIEW ALL ROLES, then retrieve from database and display table
    else if (userChoice.userAction === "View all roles") {
      db.query("SELECT * FROM role", (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(result);
        //   db.end();
      });
    }

    // if VIEW ALL EMPLOYEES, then retrieve from database and display table
    else if (userChoice.userAction === "View all employees") {
      db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(result);
        //   db.end();
      });
    }

    // if ADD A DEPARTMENT, then give the user the choice to add a department name
    else if (userChoice.userAction === "Add a department") {
      console.log("Add a department");
    }

    // if ADD A ROLE, then give the user the choice to add a role name
    else if (userChoice.userAction === "Add a role") {
      console.log("Add a role");
    }

    // if ADD AN EMPLOYEE, then give the user the choice to add an employee
    else if (userChoice.userAction === "Add an employee") {
      console.log("Add an employee");
    }

    // if ADD AN EMPLOYEE, then give the user the choice to add an employee
    else if (userChoice.userAction === "Update Employee role") {
      console.log("Update Employee role");
    }

    const wouldYouLikeToContinue = await inquirer.prompt(continueProcess);
    console.log(wouldYouLikeToContinue);

    if (!wouldYouLikeToContinue.wouldYouLikeToContinue) {
      inProgress = false;
      console.log("Session closed.");
    } else {
      const userChoice = await inquirer.prompt(userOptions);
      console.log(userChoice);
    }

    // prompt main questions again
  }
};

init();
