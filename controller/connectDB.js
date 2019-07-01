//Connect Database for LocalHost
var mysql = require('mysql');

//account Win
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "smartcity"
// });

//Account ubuntu
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "johnbaptist6697",
//     database: "smartcity"
// });

//Connect DataBase fro Heroku
var connection = mysql.createConnection(process.env.JAWSDB_URL);


connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;