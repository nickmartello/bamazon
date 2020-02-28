* to see example
https://drive.google.com/file/d/1bgt0SkM-aqmIMQ_joQvTeWdYzRqYaG4O/view?usp=sharing

# Bamazon

Bamazon was made in node and MYSQL.


## What it does

Inventory is stored in the MYSQL database and you as the customer can choose which item you would like to purchase and the quantity and you will be shown the price and also see the stock quantity lower as you purchase the items.

sample code below
```javascript
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


        
     
 

