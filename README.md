# mySQL - Employee Management System

## About the project

A CLI application using node.js and sql to Create, Read, Update, and Delete Employees from a database using mySQL.

## Technologies

- JavaScript
  - node.js
  - inquirer.js
- SQL
  - mySQL

## Walkthrough

[Click here!](https://drive.google.com/drive/u/0/folders/1Dlh3jA-6rxhYMqZo5jrGcHYMlGadNJ1P)

## Getting Started

If you wish to run the application locally, run the following commands once the repository is cloned onto your machine:

- `npm run seed` - Seeds Database with initial datasets
- `npm run start`- Initiates inquirer functions
- `npm run dev` - Development use only

## Inquirer

Inquirer was installed to allow database administrators create, read, update & delete elements of the database:

```javascript
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
```

The answers ultimately decided what actions the administrators could take in the system, for example, when `Add a Role` was selected, the user was required to input the relevant data to the table:

```javascript
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

  const { departmentId, title, salary } = await inquirer.prompt(roleQuestions);

  await db.query(
    `INSERT INTO role(title, salary, department_id) VALUES('${title}', '${salary}', '${departmentId}')`
  );
}
```

## Schema Setup

The schema setup consists of the following:

- DATABASE: `company_db`
  - Employee Table: `employee`
  - Role Table: `role`
  - Department Table: `department`

Tables were related leveraging the use of `foreign keys`. This is critical to ensure `department`, `role` & `employees` can all be linked to run dynamic reporting. An example of the `role` table is below:

```sql
CREATE TABLE `role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL(12,2) NOT NULL,
  `department_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  FOREIGN KEY (department_id) REFERENCES department(id)
  );
```
