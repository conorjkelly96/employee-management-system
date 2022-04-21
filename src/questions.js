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
      "Quit Session",
      "Update Employee Manager",
      "View Employee by Manager",
      "Delete Record",
    ],
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

const deleteRecord = [
  {
    type: "list",
    message: "Which record type would you like to delete?",
    name: "recordSelection",
    choices: ["Delete Department", "Delete role", "Delete employee"],
  },
];

module.exports = {
  userOptions,
  departmentInfo,
  employeeInfo,
  deleteRecord,
};
