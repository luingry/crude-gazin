
const express = require('express');
const cors = require('cors');
const routes = require('./routes/router');
const dbConnection = require('./db/dbconnection.js');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use('/', routes);

//Connection listenner
app.listen(process.env.PORT || '3000', () => {
	console.log('Server running');
})