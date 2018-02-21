//required modules
var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
//sql connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});



//prompt asks for id and quantity
inquirer.prompt([{
    name: 'productID',
    message: 'what is the product ID?',
    type: 'input'
}, {
    name: 'quantity',
    message: 'how many would you like?',
    type: 'input'
}]).then(function (resp) {
    var prodID = resp.productID;
    var qty = parseInt(resp.quantity);
    showproduct(prodID);
    checkQty(prodID, qty);
});

// show selected product and quantity
function showproduct(prodID) {
    connection.query('SELECT * FROM products WHERE ?', {
        item_ID: prodID
    }, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}

// check database for stock quantity for specific product
function checkQty(prodID, qty) {
    connection.query('SELECT stock_quantity FROM products WHERE ?', {
        item_ID: prodID
    }, function (err, res) {
        if (err) throw err;
        var qtyLeft = res[0].stock_quantity;
        checkStock(prodID, qtyLeft, qty);
    });
}

// check if there is enough stock quantity
function checkStock(prodID, qtyLeft, qty) {
    if (qtyLeft > qty) {
        console.log('Stock available!');

        dbUpdate(prodID, qty, qtyLeft);
    } else {
        console.log('Insufficient quantity!');
    }
}

// update database with new stock quantity after purchase
function dbUpdate(prodID, qty, qtyLeft) {
    var newqtyLeft = qtyLeft - qty;
    connection.query('UPDATE products SET ? WHERE ?', [{
        stock_quantity: newqtyLeft
    }, {
        item_ID: prodID
    }], function (err, res) {
        if (err) throw err;
        totalCost(prodID, qty);
    });
}

// calculate and display purchase price
function totalCost(prodID, qty) {
    connection.query('SELECT price FROM products WHERE ?', {
        item_ID: prodID
    }, function (err, res) {
        if (err) throw err;
        var price = res[0].price;
        var total = price * qty;
        console.log('Your total is $' + total + '!');
        showproduct(prodID);
    });
}