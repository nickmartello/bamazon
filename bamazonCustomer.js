let inquirer = require('inquirer');
let mysql = require('mysql');


let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazonDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to my Bamazon store");
    // run the start function after the connection is made to prompt the user
    start();
});
function start() {
    connection.query(`SELECT * FROM bamazonDB.products`, function (err, res) {
        if (err) throw err;
        console.table(res)
        for (let i = 0; i < res.length; i++) {
            function display(string, value) {
                
            };
            display('ID: ', res[i].item_id);
            display('Product: ', res[i].product_name);
            display('Department: ', res[i].department_name);
            display('Price: $', (res[i].price).toFixed(2));
            display('Quantity: ', res[i].stock_quantity);
            display('\n', '');
        };


        //function addS(value)

            // fat arrrow function

        const addS = value => {

            // ternary function, the question mark is the if and the colon is the else

             return value > 1 ? 's' : '';
        };
        inquirer
            .prompt([
                {
                    type: `input`,
                    message: `What product would you like to purchase? (enter id #)`,
                    name: `product`
                },
                {
                    type: `input`,
                    message: `How many would you like to purchase?`,
                    name: `quantity`
                }
            ])
            .then(function (reply) {
                connection.query(`SELECT * FROM bamazonDB.products WHERE ?`, { item_id: reply.product }, function (err, res) {
                    if (err) throw err;
                    if (parseInt(reply.quantity) <= parseInt(res[0].stock_quantity)) {
                        let newQuantity = parseInt(res[0].stock_quantity) - parseInt(reply.quantity);
                        connection.query(`UPDATE bamazonDB.products SET ? WHERE ?`, [{ stock_quantity: newQuantity }, { item_id: reply.product }], function (err, res) {
                            if (err) throw err;
                        });
                        connection.query(`SELECT * FROM bamazonDB.products WHERE ?`, { item_id: reply.product }, function (err, res) {
                            if (err) throw err;
                            console.log(`\n${res[0].stock_quantity} ${res[0].product_name}${addS(res[0].stock_quantity)} left in stock...\n`)

                            console.log(`You paid $${(parseInt(reply.quantity) * parseFloat(res[0].price)).toFixed(2)} for ${parseInt(reply.quantity)} ${res[0].product_name}${addS(parseInt(reply.quantity))}\n`);
                            connection.end();
                        })
                        return;
                    } else {
                        console.log(`Insufficent quantity!`);
                        connection.end();
                    };
                });
            });
    });

};

