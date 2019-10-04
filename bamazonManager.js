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

function addInventory() {

    var products = [];

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
            products.push(res[i].product_name);
        }

        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which product would you like to add inventory to?",
                    choices: products,
                    name: "product"
                },
                {
                    type: "input",
                    message: "How many of this product would you like to add?",
                    name: "amount",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                connection.query("UPDATE products SET stock_quanity = ? WHERE product_name = ?",
                    [res[products.indexOf(answer.product)].stock_quanity + parseInt(answer.amount), answer.product],
                    function (err, res) {
                        if (err) throw err;
                    });
                console.log("You added " + answer.amount + " of " + answer.product + ".");
                managerOptions();
            })

    });
}

function addProduct() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the product you wish to add?",
                name: "name",
            },
            {
                type: "input",
                message: "What is the department of this product?",
                name: "department",
            },
            {
                type: "input",
                message: "What is the price of this product?",
                name: "price",
            },
            {
                type: "input",
                message: "How much of this product are you adding?",
                name: "stock",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer.name,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quanity: answer.stock
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("You successfully added " + answer.name + " to the shop.");
                    managerOptions();
                }
            )
        })

}