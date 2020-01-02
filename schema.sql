DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

DROP TABLE IF EXISTS auctions;

CREATE TABLE products (
item_id INT(30),
product_name VARCHAR(50),
department_name VARCHAR(50),
price INT (65),
stock_quantity INT(65)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 'shoe', 'clothes', 59, 50);
INSERT INTO products
VALUES (2, 'jacket', 'clothes', 20, 50);
INSERT INTO products
VALUES (3, 'sock', 'clothes', 5, 40);
INSERT INTO products
VALUES (4, 'hat', 'clothes', 10, 40);
INSERT INTO products
VALUES (5, 'ipod', 'electronics', 50, 50);
INSERT INTO products
VALUES (6, 'headphone', 'electronics', 25, 50);
INSERT INTO products
VALUES (7, 'speaker', 'electronics', 60, 60);
INSERT INTO products
VALUES (8, 'dog', 'animals', 3, 10);
INSERT INTO products
VALUES (9, 'bird', 'animals', 4, 40);
INSERT INTO products
VALUES (10, 'cat', 'animals', 1, 50);
