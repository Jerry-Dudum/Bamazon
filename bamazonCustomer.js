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
    console.log("Welcome to Jerry's Anime Store!");
    displayStore();
});

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
        buyProducts()
    });
}

function buyProducts() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which product would you like to purchase?",
                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                name: "id"
            },
            {
                type: "input",
                message: "How many would you like to purchase?",
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
            console.log(answer.id);
            connection.query("SELECT * FROM products WHERE item_id = ?", [answer.id],
            function(err, res) {
                if (err) throw (err);
                console.log(res);
                if (res[0].stock_quanity > answer.amount) {
                    connection.query("UPDATE products SET stock_quanity = ? WHERE item_id = ?", 
                    [(res[0].stock_quanity - answer.amount), answer.id],
                    function (err, res) {
                        if (err) throw err;
                    });

                    console.log("You purchase " + answer.amount + " of " + res[0].product_name + ".");
                    console.log("Your total comes out to be $" + (res[0].price * answer.amount));

                    displayStore();
                }
                else {
                    console.log("Insufficient quantity!");
                    displayStore();
                }
            })
        })
}