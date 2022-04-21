// importing dependencies - DO NOT REMOVE
const mysql = require("mysql2");
const { dbOptions } = require("./db/databaseConfiguration");
const db = mysql.createConnection(dbOptions);

// take the employee name from updateEmployeeInfo query, search database and retrieve id
const generateRoleChoices = (rolesFromDB) => {
  return rolesFromDB.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
};

const generateEmployeeChoices = (employeeFromDB) => {
  return employeeFromDB.map((employee) => {
    return {
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    };
  });
};

const generateDepartmentChoices = (departmentFromDB) => {
  return departmentFromDB.map((department) => {
    return {
      name: department.name,
      value: department.id,
    };
  });
};

module.exports = {
  generateRoleChoices,
  generateEmployeeChoices,
  generateDepartmentChoices,
};
