import chalk from "chalk";
import inquirer from "inquirer";

console.log(chalk.green(`        Welcome to The Shop!`));

interface items {
  name: string;
  price: number;
}

let items3V: items[] = [];
let itemsquaV: number[] = [];
let billSumV: number[] = [];

let items2F: items[] = [];
let itemsquaF: number[] = [];
let billSumF: number[] = [];

var items: items[] = [
  { name: "Apple", price: 5 },
  { name: "Banana", price: 10 },
  { name: "Grape", price: 15 },
  { name: "Orange", price: 20 },
  { name: "Pear", price: 25 },
  { name: "Pineapple", price: 30 },
  { name: "Strawberry", price: 35 },
  { name: "Watermelon", price: 40 },
];

var items2: items[] = [
  { name: "Potato", price: 5 },
  { name: "Onion", price: 10 },
  { name: "Tomato", price: 15 },
  { name: "Carrot", price: 20 },
  { name: "Cucumber", price: 25 },
  { name: "Broccoli", price: 30 },
  { name: "Cabbage", price: 35 },
  { name: "Spinach", price: 40 },
];

// Main function to start shopping
async function startShopping() {
  let firstInput = await inquirer.prompt([
    {
      name: "userChoice",
      type: "list",
      message: "Select which category you want to shop from:",
      choices: ["Fruits", "Vegetables", "Groceries"],
    },
  ]);

  if (firstInput.userChoice === "Fruits") {
    await Fruits();
  } else if (firstInput.userChoice === "Vegetables") {
    await vegetables();
  }

  let shopCont = await askit();
  if (shopCont === "Yes") {
    await startShopping(); // Recursive call to continue shopping
  } else {
    bill();
  }
}

// vegetables function
async function vegetables() {
  console.table(items2);

  let itemnumber = await inquirer.prompt([
    {
      name: "userChoice",
      type: "list",
      message: "How many items do you want from the menu:",
      choices: [0, 1, 2, 3, 4, 5, 6, 7],
    },
  ]);

  for (let i = 0; i < itemnumber.userChoice; i++) {
    var secondInput = await inquirer.prompt([
      {
        name: "userChoice",
        type: "list",
        message: "Select which of these you want:",
        choices: [0, 1, 2, 3, 4, 5, 6, 7],
      },
    ]);
    let thirdInput = await inquirer.prompt([
      {
        name: "userChoice",
        type: "input",
        message: "How many do you want?",
      },
    ]);
    items3V.push(items2[secondInput.userChoice]);
    itemsquaV.push(Number(thirdInput.userChoice));
    let bill: number =
      Number(thirdInput.userChoice) * items2[secondInput.userChoice].price;
    billSumV.push(bill);
  }
}

// Fruits function
async function Fruits() {
  console.table(items);

  let itemnumber = await inquirer.prompt([
    {
      name: "userChoice",
      type: "list",
      message: "How many items do you want from the menu:",
      choices: [0, 1, 2, 3, 4, 5, 6, 7],
    },
  ]);

  for (let i = 0; i < itemnumber.userChoice; i++) {
    var secondInput = await inquirer.prompt([
      {
        name: "userChoice",
        type: "list",
        message: "Select which of these you want:",
        choices: [0, 1, 2, 3, 4, 5, 6, 7],
      },
    ]);
    let thirdInput = await inquirer.prompt([
      {
        name: "userChoice",
        type: "input",
        message: "How many do you want?",
      },
    ]);
    items2F.push(items[secondInput.userChoice]);
    itemsquaF.push(Number(thirdInput.userChoice));
    let bill: number =
      Number(thirdInput.userChoice) * items[secondInput.userChoice].price;
    billSumF.push(bill);
  }
}

// Asks the user whether they want to continue shopping or not
async function askit() {
  let ask = await inquirer.prompt([
    {
      name: "userChoice",
      type: "list",
      message: chalk.red("Do you want to buy something else?"),
      choices: ["Yes", "No"],
    },
  ]);
  return ask.userChoice;
}

// Calculates and displays the bill
function bill() {
  let sumf = billSumF.reduce((acc, curr) => acc + curr, 0);
  let sumv = billSumV.reduce((acc, curr) => acc + curr, 0);
  console.log(
    chalk.rgb(
      222,
      173,
      237
    )(`
  Thank you for shopping with us!
   your bill for fruits is ${sumf}
  your bill for vegetables is ${sumv}
  Your Total bill is ${sumf + sumv}`)
  );
}

// Start shopping when the script runs
startShopping();
