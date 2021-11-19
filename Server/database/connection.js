const mysql = require("mysql");
const dbconfig = require("./config.js")

const connection = mysql.createConnection({
    host:   dbconfig.host,
    user:   dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
})

connection.connect(erro =>{
    if(error) throw error;
    console.log("Successfully connection!!!")
})

module.exports = connection;