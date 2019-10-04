# Bamazon

This program utilizes node and MySQL to create our very own store. Initially we start we 10 static items you can purchase as long as there is enough in stock. This is done through the customer option using node bamazonCustomer.js. We then have a bamazonManager.js which will allow us to view the current store, see low inventory, add more inventory to specific items of your choice, and add an entirely new product to the store. The app is entirely ran through the console and installation as well as demos will be displayed below.

# Demo

# Customer
![Demo Customer](images/customer.gif)

# Manager
![Demo Manager](images/manager.gif)

# Manager - Add Product
![Demo Add Product](images/add.gif)

# How to Install and Use LIRI-Bot

1. Access my github and clone down my Bamazon repository to your computer.

2. Once you have made a clone on your computer navigate to it inside your terminal.

3. Install all npm packages by typing in "npm install" and hitting enter. This will install all the dependencies required to run Bamazon.

4. Next you will need to create the database in MySQL. You can do this by simply copying all the code within bamazon.sql, pasting it inside your MySQL Workbench, and hitting the lightning bolt. This will create our database in which we use.

5. Now inside your terminal at the Bamazon location you can run either
    ```
    node bamazonCustomer.js

    -----OR-----

    node bamazonManager.js
    ```

6. Now simply follow the instructions within the customer option or select your option within manager then follow the instructions given within the terminal.

# Interesting Code Snippet

In order to be able to display a store with the console I had to utilize a npm package called cli-table. With this package I was able to neatly display items within my store so the user can easily see what products are available and all their related information such as item id, department, price, and stock.

The following is the code to create this table within my app:

```Javascript
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
```

This is given in the cli-table documentation and is the table I decided to utilize because I liked how it looked personally. This particular snippet is from bamazonCustomer.js and displays the stores items. 

# Technologies Used

- Javascript
- Node
- NPM
- MySQL

# NPM Packages

- Inquirer
- MySQL
- CLI-Table


### Links
- [LinkedIn](https://www.linkedin.com/in/jsdudum/)