// importing dependencies - DO NOT REMOVE
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { userOptions, departmentInfo, deleteRecord } = require("./questions.js");
const Db = require("./lib/Db");
const table = require("table");
const {
  generateRoleChoices,
  generateEmployeeChoices,
  generateDepartmentChoices,
} = require("./utils.js");
const config = {
  // Predefined styles of table
  border: table.getBorderCharacters("ramac"),
};
const {
  employeeQuery,
  roleQuery,
  departmentQuery,
  employeeByManager,
} = require("./db/data/queries");

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

  while (inProgress) {
    let { userAction } = await inquirer.prompt(userOptions);

    // if VIEW ALL DEPARTMENTS, then retrieve from database and display table
    if (userAction === "View all departments") {
      const departments = await db.query(departmentQuery);
      console.table(departments);
    }

    // if VIEW ALL ROLES, then retrieve from database and display table
    if (userAction === "View all roles") {
      const roles = await db.query(roleQuery);
      console.table(roles);
    }

    // if VIEW ALL EMPLOYEES, then retrieve from database and display table
    if (userAction === "View all employees") {
      const employees = await db.query(employeeQuery);
      console.table(employees);
    }

    // if ADD A DEPARTMENT, then give the user the choice to add a department name
    if (userAction === "Add a department") {
      const { departmentName } = await inquirer.prompt(departmentInfo);

      await db.query(
        `INSERT INTO department (name) VALUES ('${departmentName}');`
      );
    }

    // if ADD A ROLE, then give the user the choice to add a role name
    if (userAction === "Add a role") {
      const departments = await db.query(departmentQuery);

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
    if (userAction === "Add an employee") {
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

      if (!employeeManager) {
        await db.query(
          `INSERT INTO employee(first_name, last_name, role_id) VALUE('${firstName}', '${lastName}', '${employeeRole}')`
        );
      } else {
        await db.query(
          `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE('${firstName}', '${lastName}', '${employeeRole}','${employeeManager}')`
        );
      }

      // template string query for department table
    }

    if (userAction === "Update Employee Manager") {
      const employees = await db.query("SELECT * FROM  employee");
      const updateManager = [
        {
          type: "list",
          message: "Select Employee",
          name: "employeeChoice",
          choices: generateEmployeeChoices(employees),
        },
        {
          type: "list",
          message: "Select New Manager",
          name: "newManager",
          choices: generateEmployeeChoices(employees),
        },
      ];

      const { employeeChoice, newManager } = await inquirer.prompt(
        updateManager
      );

      await db.query(
        `UPDATE company_db.employee SET manager_id = '${newManager}' WHERE (id = '${employeeChoice}');`
      );
    }
    // if UPDATE EMPLOYEE ROLE, then give the user the choice to update the role of an employee
    if (userAction === "Update Employee role") {
      //prompt questions to user
      const roles = await db.query("SELECT * FROM role");
      const employees = await db.query("SELECT * FROM  employee");
      const updateEmployeeInfo = [
        {
          type: "list",
          message: "Select an employee to update their role",
          name: "employeeToUpdate",
          choices: generateEmployeeChoices(employees),
        },
        {
          type: "list",
          message: "Please select a role",
          name: "employeeRole",
          choices: generateRoleChoices(roles),
        },
      ];

      const { employeeToUpdate, employeeRole } = await inquirer.prompt(
        updateEmployeeInfo
      );

      await db.query(
        `UPDATE company_db.employee SET role_id = '${employeeRole}' WHERE (id = '${employeeToUpdate}');`
      );
    }

    // if View Employee by Manager, then give the user the choice to View Employee by Manager
    if (userAction === "View Employee by Manager") {
      //prompt questions to user
      const viewEmployeeByManager = await db.query(employeeByManager);
      console.table(viewEmployeeByManager);
    }

    // if Delete Record, then give the user the choice to Delete Record
    if (userAction === "Delete Record") {
      const roles = await db.query("SELECT * FROM role");
      const employees = await db.query("SELECT * FROM  employee");
      const department = await db.query("SELECT * FROM department");
      //prompt questions to user
      const { recordSelection } = await inquirer.prompt(deleteRecord);

      if (recordSelection === "Delete employee") {
        const employeeList = [
          {
            type: "list",
            message: "Select an employee to delete:",
            name: "employeeToDelete",
            choices: generateEmployeeChoices(employees),
          },
        ];
        const { employeeToDelete } = await inquirer.prompt(employeeList);

        await db.query(
          `DELETE FROM company_db.employee WHERE (id = '${employeeToDelete}');`
        );
        console.log(`Employee successfully deleted`);
      }

      if (recordSelection === "Delete role") {
        const roleList = [
          {
            type: "list",
            message: "Select a role to delete:",
            name: "roleToDelete",
            choices: generateRoleChoices(roles),
          },
        ];
        const { roleToDelete } = await inquirer.prompt(roleList);

        await db.query(
          `DELETE FROM company_db.role WHERE (id = '${roleToDelete}');`
        );
        console.log(`Role successfully deleted`);
      }

      if (recordSelection === "Delete Department") {
        const departmentList = [
          {
            type: "list",
            message: "Select a role to delete:",
            name: "departmentToDelete",
            choices: generateDepartmentChoices(department),
          },
        ];
        const { departmentToDelete } = await inquirer.prompt(departmentList);
        await db.query(
          `DELETE FROM company_db.department WHERE (id = '${departmentToDelete}');`
        );
        console.log(`Department successfully deleted`);
      }
    }

    // confirm if user would still like to interact with the database
    if (userAction === "Quit Session") {
      inProgress = false;
      db.stop();
      console.log("Session closed.");
    }
  }
};

init();
