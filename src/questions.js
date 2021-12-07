const { getEmployeeList, getDepartmentList } = require("./utils");

// question set to prompt options to the user
const userOptions = [
  {
    type: "list",
    message: "What action would you like to take?",
    name: "userAction",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update Employee role",
    ],
  },
];

// question to determine if the loop should stop
const continueProcess = [
  {
    type: "confirm",
    message: "Would you like to continue?",
    name: "wouldYouLikeToContinue",
  },
];

// question to determine if the loop should stop
const departmentInfo = [
  {
    type: "input",
    message: "Enter Department Name",
    name: "departmentName",
  },
];

const roleInfo = [
  {
    type: "input",
    message: "Enter Role Name",
    name: "roleName",
  },
  {
    type: "number",
    message: "Enter Role Salary",
    name: "roleSalary",
  },
  {
    type: "list",
    message: "Enter Role Department",
    name: "roleDepartment",
    choices: getDepartmentList(),
  },
];

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
    type: "input",
    message: "Enter Role Name",
    name: "employeeRole",
  },
  {
    type: "input",
    message: "Enter Manager Name",
    name: "employeeManager",
  },
];

const updateEmployeeInfo = [
  {
    type: "input",
    message: "Which Employee would you like to update?",
    name: "employeeToUpdate",
  },

  {
    type: "list",
    message: "What action would you like to take?",
    name: "userAction",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update Employee role",
    ],
  },
];

module.exports = {
  userOptions,
  continueProcess,
  departmentInfo,
  roleInfo,
  employeeInfo,
  updateEmployeeInfo,
};
