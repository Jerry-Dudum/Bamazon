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
        switch (answer.options) {

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

function displayStore() {

    var table = new Table({
        head: ["Item_ID", "Product", "Department", "Price", "Stock"],
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
            , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
            , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
            , 'right': '║', 'right-mid': '╢', 'middle': '│'
        }
    });

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity]);
        }

        console.log("\n" + table.toString());
        managerOptions();
    });
}

function displayLowInventory() {

    var table = new Table({
        head: ["Item_ID", "Product", "Department", "Price", "Stock"],
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
            , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
            , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
            , 'right': '║', 'right-mid': '╢', 'middle': '│'
        }
    });

    connection.query("SELECT * FROM products WHERE stock_quanity <= 5", function (err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity]);
        }

        console.log("\n" + table.toString());
        managerOptions();
    });    
}