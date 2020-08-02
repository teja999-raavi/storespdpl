var mysql = require('mysql');

var db_config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "designer"
}

var connection;

function handleDisconnect() {
    console.log("Connected to [MySQL]\n");
    connection = mysql.createPool(db_config);
    return connection;
}

handleDisconnect();

 
module.exports = connection;