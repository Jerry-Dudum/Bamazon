var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Manager Options");
    managerOptions();
});

function managerOptions() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add a New Product"],
            name: "options"
        }
    ])
    .then(function (answer) {
        switch (answer) {

            case "View Products for Sale":
                displayStore();
                break;

            case "View Low Inventory":
                displayLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add a New Product":
                addProduct();
                break;
        }
    })
}