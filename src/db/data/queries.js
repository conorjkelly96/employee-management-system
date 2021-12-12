const employeeQuery =
  "SELECT CONCAT(E.FIRST_NAME,' ', E.LAST_NAME) AS 'EMPLOYEE',E.ID, R.SALARY, R.TITLE, D.NAME AS 'DEPT NAME', CONCAT( M.FIRST_NAME,' ', M.LAST_NAME) AS MANAGER FROM EMPLOYEE AS E JOIN EMPLOYEE AS M  ON E.MANAGER_ID = M.ID INNER JOIN ROLE R ON E.ROLE_ID = R.ID LEFT JOIN DEPARTMENT D ON R.DEPARTMENT_ID = D.ID ;";

const roleQuery = "SELECT * FROM role";

const departmentQuery = "SELECT * FROM department";

const addDepartment = ``;

module.exports = {
  employeeQuery,
  roleQuery,
  departmentQuery,
  addDepartment,
};
