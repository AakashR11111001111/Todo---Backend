const chalk = require('chalk');
const readline = require('readline');
const fs = require("node:fs");
const { fileURLToPath } = require('node:url');
const { log } = require('node:console');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let tasks = [];

const addnewTask = async () => {
    r1.question("Enter your Task name: ", (ans)=>{
        tasks.push(ans);
        fs.appendFile("tasks.txt",ans+"\n", (err)=>{
            if(err){
                console.log(err);
                r1.close();
            }else{
            console.log(chalk.bgYellowBright.black("Task Added Successfully\n--------------------------------------------------------"));
            main();
        }
       })
    })  
}


const readFile = async () => {
    fs.readFile("tasks.txt", "utf-8", (err, data)=>{
        if(err) console.log(err);
        else if(data.trim() === ""){
            console.log(chalk.bgRed.white("No Task Found\n------------------"));
            main();
        }
        else{
            console.log(chalk.yellowBright(`All Tasks are:\n${data}`));
            main();
        }
    })
} 


const markComplete = async () => {
    let task = [];
    fs.readFile("tasks.txt","utf-8",(err, data)=>{
        if(err) console.log(err);
        else if(data.trim() === ""){
            console.log(chalk.bgRed.white("No Task Found\n------------------"));
            main();
        }
        else{
            r1.question("Enter the name of task you want to Mark Completed: ",(ans)=>{
                task = data.split("\n");
                // console.log("You Choosed : ", ans);
                let idx = ans - 1;
                fs.readFile("tasks.txt","utf-8",(err, data)=>{
                    if(err) console.log(err);
                    else if(data.trim() === ""){
                        console.log(chalk.redBright("No Such Task Found"));
                    }
                    else{
                        let dataArr = data.split("\n");
                        // console.log("Uour Target => ", dataArr[idx]);      
                    }
                }) 
            });   
        }        
    })
}


async function main() {
    console.log(chalk.greenBright("SELECT AN OPTION"));

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
            await readFile();
            break;
        case 3:
            await markComplete();
            break;
        case 4:
            console.log("You choose 4: Remove a task");
            break;
        case 5:
            console.log("Bye Byee🥲");
            r1.close();
            return;
        default:
            console.log(chalk.redBright("Invalid choice! Enter a number between 1 and 5.\n-------------------------------------------------"));
    }
}
main();
