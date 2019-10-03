DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;
​
USE bamazonDB;
​
CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR (100) NOT NULL,
  department_name VARCHAR (100) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quanity INT (10) NOT NULL,
  PRIMARY KEY (item_id)
);