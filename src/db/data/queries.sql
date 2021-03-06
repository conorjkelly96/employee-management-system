As the image illustrates, your schema should contain the following three tables:

* `department`

    * `id`: `INT PRIMARY KEY`

    * `name`: `VARCHAR(30)` to hold department name

* `role`

    * `id`: `INT PRIMARY KEY`

    * `title`: `VARCHAR(30)` to hold role title

    * `salary`: `DECIMAL` to hold role salary

    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`

    * `id`: `INT PRIMARY KEY`

    * `first_name`: `VARCHAR(30)` to hold employee first name

    * `last_name`: `VARCHAR(30)` to hold employee last name

    * `role_id`: `INT` to hold reference to employee role

    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)


USE company_db;

-- view all departments
SELECT * FROM department;

-- view all roles
SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.departmentId = department.id ORDER BY department.name;

-- view all employees
SELECT employee_role.firstName, employee_role.lastName, title, salary, name
FROM employee employee_role 
LEFT JOIN role 
ON employee_role.roleId=role.id 
LEFT JOIN department
ON role.departmentId=department.id;

SELECT CONCAT(E.FIRST_NAME,' ',
       E.LAST_NAME) AS 'USER',
       R.SALARY, R.TITLE,
       D.DEPT_NAME,
      CONCAT( M.FIRST_NAME,' ',
       M.LAST_NAME) AS MANAGER
FROM EMPLOYEE AS E
  JOIN EMPLOYEE AS M 
  ON E.MANAGER_ID = M.ID INNER JOIN ROLE R ON E.ROLE_ID = R.ID LEFT JOIN DEPARTMENT D ON R.DEPARTMENT_ID = D.ID ;

SELECT CONCAT(E.FIRST_NAME,' ',
       E.LAST_NAME) AS 'USER',
      CONCAT( M.FIRST_NAME,' ',
       M.LAST_NAME) AS MANAGER
FROM EMPLOYEE AS E
  JOIN EMPLOYEE AS M 
  ON E.MANAGER_ID = M.ID ;