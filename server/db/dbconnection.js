const mysql = require('mysql');

//DB connection
const dbConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'developers_api',
	multipleStatements: true
})

//DB Connection handler
dbConnection.connect((error)=>{
	if (!error) {
		console.log('connected')
	} 
	else {
		console.log('Connection error');
	}
})

module.exports = dbConnection;