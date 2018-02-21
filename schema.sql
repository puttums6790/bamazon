DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(8,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
('Stand Mixer', 'Kitchen', 220.00, 50),
('Porch Swing', 'Home & Garden', 1500.00, 8),
('Dumbell Set', 'Fitness', 125.00, 35),
('Wireless Charger', 'Electronics', 45.00, 100),
('Pasta Roller', 'Kitchen', 25.00, 30),
('LiAngelo 4s', 'Big Baller Lifestyle', 65.00, 78),
('Kirk Hinrich Jersey', 'Fan Apparel', 75.00, 6),
('Galaxy Tablet', 'Electronics', 850.00, 35),
('Resistance Bands', 'Fitness', 25.00, 130),
('Pancake Spatula', 'Kitchen', 15.00,80);