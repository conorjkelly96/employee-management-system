// importing dependencies - DO NOT REMOVE
const mysql = require("mysql2");
const inquirer = require("inquirer");
const {
  userOptions,
  departmentInfo,
  updateEmployeeInfo,
} = require("./questions.js");
const Db = require("./lib/Db");
const table = require("table");
const { generateRoleChoices, generateEmployeeChoices } = require("./utils.js");
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

  let results;

  while (inProgress) {
    let userChoice = await inquirer.prompt(userOptions);

    // if VIEW ALL DEPARTMENTS, then retrieve from database and display table
    if (userChoice.userAction === "View all departments") {
      const departments = await db.query("SELECT * FROM department");
      results = departments;
      console.table(departments);
    }

    // if VIEW ALL ROLES, then retrieve from database and display table
    if (userChoice.userAction === "View all roles") {
      const roles = await db.query("SELECT * FROM role");
      results = roles;
      console.table(roles);
    }

    // if VIEW ALL EMPLOYEES, then retrieve from database and display table
    if (userChoice.userAction === "View all employees") {
      const employees = await db.query("SELECT * FROM employee");
      results = employees;
      console.table(employees);
    }

    // if ADD A DEPARTMENT, then give the user the choice to add a department name
    if (userChoice.userAction === "Add a department") {
      const { name } = await inquirer.prompt(departmentInfo);

      await db.query(`INSERT INTO department(name) VALUES('${name}')`);
    }

    // if ADD A ROLE, then give the user the choice to add a role name
    if (userChoice.userAction === "Add a role") {
      const generateDepartmentChoices = (departmentsFromDB) => {
        return departmentsFromDB.map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        });
      };

      const departments = await db.query("SELECT * FROM department");

      const roleQuestions = [
        {
          type: "list",
          message: "Please select a department:",
          name: "departmentId",
          choices: generateDepartmentChoices(departments),
        },
        {
          type: "input",
          message: "Please enter role title:",
          name: "title",
        },
        {
          type: "input",
          message: "Please enter role salary:",
          name: "salary",
        },
      ];

      const { departmentId, title, salary } = await inquirer.prompt(
        roleQuestions
      );

      await db.query(
        `INSERT INTO role (title, salary, department_id) VALUES("${title}", ${salary}, ${departmentId})`
      );
    }

    // if ADD AN EMPLOYEE, then give the user the choice to add an employee
    if (userChoice.userAction === "Add an employee") {
      const roles = await db.query("SELECT * FROM role");
      const employees = await db.query("SELECT * FROM  employee");

      const employeeInfo = [
        {
          type: "input",
          message: "Enter First Name",
          name: "firstName",
        },
        {
          type: "input",
          message: "Enter Last Name",
          name: "lastName",
        },
        {
          type: "list",
          message: "Please select a role",
          name: "employeeRole",
          choices: generateRoleChoices(roles),
        },
        {
          type: "confirm",
          name: "managerQuery",
          message: "Does the employee have a manager?",
          default: null,
        },
        {
          type: "list",
          name: "employeeManager",
          message: "Enter Manager Name:",
          choices: generateEmployeeChoices(employees),
          default: null,
          when: (employeeInfo) => employeeInfo.managerQuery === true,
        },
      ];
      // prompt questions to user
      const {
        firstName,
        lastName,
        employeeRole,
        employeeManager = null,
      } = await inquirer.prompt(employeeInfo);

      // template string query for department table
      await db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE('${firstName}', '${lastName}', '${employeeRole}','${employeeManager}')`
      );
    }

    // if ADD AN EMPLOYEE, then give the user the choice to add an employee
    if (userChoice.userAction === "Update Employee role") {
      //prompt questions to user
      const updatesToEmployeeRecord = await inquirer.prompt(updateEmployeeInfo);
      const employeeUpdateValues = `('${updatesToEmployeeRecord.first_name}', '${insertIntoEmployee.last_name}', '${insertIntoEmployee.role_id}','${insertIntoEmployee.manager_id}', )`;

      await db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE(${employeeUpdateValues})`
      );
    }

    // confirm if user would still like to interact with the database
    if (userChoice.userAction === "Quit Session") {
      inProgress = false;
      db.stop();
      console.log("Session closed.");
    }

    // prompt main questions again
  }
};

init();
