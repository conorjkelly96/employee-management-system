// install dependencies
const inquirer = require("inquirer");
const { userOptions, continueProcess } = require("./questions.js");

// initialize user interaction
const init = async () => {
  // Whilst the session is true, prompt the questions to the user
  let inProgress = true;

  const userChoice = await inquirer.prompt(userOptions);

  while (inProgress) {
    //   prompt userOptions
    console.log(userChoice);
    // if VIEW ALL DEPARTMENTS, then retrieve from database and display table
    // if VIEW ALL ROLES, then retrieve from database and display table
    const wouldYouLikeToContinue = await inquirer.prompt(continueProcess);
    console.log(wouldYouLikeToContinue);

    if (!wouldYouLikeToContinue.wouldYouLikeToContinue) {
      inProgress = false;
      console.log("Session closed.");
    }

    // if VIEW ALL EMPLOYEES, then retrieve from database and display table
  }
};

init();
