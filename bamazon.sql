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

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Monkey D. Luffy Figure", "Figurines", 30, 500),
("Giorno Giovanna Figure", "Figurines", 25, 999),
("Keyblade Accessory", "Accessories", 4.99, 1500),
("Demon Slayer Manga Vol 1", "Manga", 9.99, 2000),
("Tanjiro's Earrings", "Accessories", 8.25, 400),
("Fire Force Company 8 Costume", "Cosplay Costumes", 100, 10),
("A Silent Voice", "Videos", 14.99, 30),
("Howl's Moving Castle", "Videos", 19.75, 40),
("Dr. Stone Manga Vol 1", "Manga", 9.99, 350),
("Demon Slayer Demon Slaying Corps Costume", "Cosplay Costumes", 100, 15)