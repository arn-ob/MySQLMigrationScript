const mysql      = require('mysql');

// Edit string at env
const env           = require('./env.config');
const debug         = require('./debug.config');

// SQL Script
const sql           = require('./sql.script');         

// Connection String
const connection = mysql.createConnection(env.connection_string)

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    debug.debug && console.log('connected as id ' + connection.threadId);
});


// Auto invok function
(function(sql, isRun){

    if(isRun){
        connection.query(sql, function (error, results) {
            if (error) {
                console.error("Error at SQL 1", a)
            } else {
                let get_sql = `SELECT * FROM invoice where billing_title="Tuition Fee(College) - INC(SICS)" 
                                    and billing_head_id="1560410202573"`
    
                connection.query(get_sql, function (error, resultss) {
                    
                    results.map(item => {
                        
                        resultss.map(item2 => {
    
                            // console.log(item.invoice_history_id, item2.invoice_history_id)
    
                            if(item.billing_title === item2.billing_title){
                                // console.log("invoice Amount", item.billing_amount)
    
                                let newAmount = Number(item.billing_amount) + Number(item2.billing_amount);
    
                                console.log("newAmount", newAmount)
    
                                let sql_update = `
                                    Update invoice SET billing_amount = ${newAmount} where billing_title="Tuition Fee(College) - INC(SICS)" 
                                    AND billing_head_id="1560157791964"
                                `
                                connection.query(sql_update, function (error, resultss) {
                                    console.log(resultss)
                                    console.log("Update Script")
                                })
                            }    
                        })
                    })
                })
            }
        }); 
    }  
})(sql.replace_sql_script, false)                        //  < ------ Give the SQL


