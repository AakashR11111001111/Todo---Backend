const chalk = require('chalk');
const readline = require('readline');
const fs = require("fs");

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let tasks = [];

// Task add karne ka function
const addnewTask = async () => {
    r1.question("Enter your Task name: ", (ans) => {
        tasks.push(ans);
        
        fs.appendFile("tasks.txt", ans + "\n", (err) => { 
            if (err) {
                console.log(chalk.redBright("Error adding task:", err));
            } else {
                console.log(chalk.bgYellowBright.black("Task Added Successfully\n--------------------------------------------------------"));
            }
            main();
        });
    });
};

async function main() {
    console.log(chalk.greenBright("1. Add a New Task"));
    console.log(chalk.greenBright("2. View a list of tasks"));
    console.log(chalk.greenBright("3. Mark a task as complete"));
    console.log(chalk.greenBright("4. Remove a task"));
    console.log(chalk.greenBright("5. Exit"));

    const userInput = await new Promise((res) => {
        r1.question("Enter your Choice: ", (e) => res(parseInt(e)));
    });

    switch (userInput) {
        case 1:
            await addnewTask();
            break;
        case 2:
            console.log("You choose 2: View a list of tasks");
            break;
        case 3:
            console.log("You choose 3: Mark a task as complete");
            break;
        case 4:
            console.log("You choose 4: Remove a task");
            break;
        case 5:
            console.log("You choose 5: Exit");
            r1.close();
            return;
        default:
            console.log(chalk.redBright("Invalid choice! Enter a number between 1 and 5.\n-------------------------------------------------"));
            main();
    }
}
main();
