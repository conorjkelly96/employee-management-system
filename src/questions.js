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

module.exports = {
  userOptions,
  continueProcess,
};
