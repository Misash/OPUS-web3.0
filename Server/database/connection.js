const mysql = require("mysql2");
const { connect } = require("../routes/index.js");
const dbconfig = require("./config.js")


const connection = mysql.createConnection({
    host:   dbconfig.host,
    user:   dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.DB
})

connection.connect(error =>{
    if(error) throw error;
    console.log("DB-Successfully connection!!!")
})


module.exports = connection;