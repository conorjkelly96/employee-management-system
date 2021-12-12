const { departmentInfo } = require("../../questions");
const { dbOptions } = require("../databaseConfiguration");

const employeeQuery =
  "SELECT CONCAT(E.FIRST_NAME,' ', E.LAST_NAME) AS 'EMPLOYEE',E.ID, R.SALARY, R.TITLE, D.NAME AS 'DEPT NAME', CONCAT( M.FIRST_NAME,' ', M.LAST_NAME) AS MANAGER FROM EMPLOYEE AS E JOIN EMPLOYEE AS M  ON E.MANAGER_ID = M.ID INNER JOIN ROLE R ON E.ROLE_ID = R.ID LEFT JOIN DEPARTMENT D ON R.DEPARTMENT_ID = D.ID ;";

const roleQuery = "SELECT * FROM role";

const employeeList = "SELECT * FROM employee";

const departmentQuery = "SELECT * FROM department";

const employeeByManager = `SELECT CONCAT(E.FIRST_NAME,' ', E.LAST_NAME) AS 'USER', CONCAT( M.FIRST_NAME,' ', M.LAST_NAME) AS MANAGER FROM EMPLOYEE AS E JOIN EMPLOYEE AS M ON E.MANAGER_ID = M.ID ;`;

module.exports = {
  employeeQuery,
  roleQuery,
  departmentQuery,
  employeeByManager,
  employeeList,
};
