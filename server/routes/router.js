const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');
const dbConnection = require('../db/dbconnection.js');
const router = express.Router();

//List all entrys
router.get('/developers', (req, res) => {
	let page = parseInt(req.query.page, 10),
		limit = parseInt(req.query.limit, 10);
	if (isNaN(page) && isNaN(limit)) {
		dbConnection.query(
			'SELECT * FROM developers', 
			(error, rows) => {
			if (!error) {
				// console.log(rows[0].totalCount)
				res.send(rows)
			}
			else {
				console.log(error);
			}
		})
	} else {
		if (page < 1 || isNaN(page)) {
		  page = 1;
		}
		if (isNaN(limit)) {
		  limit = 2;
		}
		else if (limit > 50) {
		  limit = 50;
		}
		else if (limit < 1) {
		  limit = 1;
		}

		let query = "Select count(*) as TotalCount from ??"; 
		let table = ["developers"]; 
		query = mysql.format(query, table);
		dbConnection.query(query, function(err, rows) {
			if(err){
				return err;
			}
			else{
				let totalCount = rows[0].TotalCount;
				let maxPage = Math.ceil(totalCount/limit);
				if (maxPage < page) page = maxPage;
				let offset = (page - 1 ) * limit ;
				let query = "Select * from ?? limit ? OFFSET ?";
				let table = ["developers",limit,offset];

				query = mysql.format(query, table);
				dbConnection.query(query, function(err, rows) {
					if(err){
						res.send(err);
					}
					else{
						res.send({"developers": totalCount , "pages": maxPage, "currentPage": page, "data":rows})
					}
				})
			}
		})
	}

})

//List all entrys
router.get('/developers?', (req, res) => {
	
})

// //Querystrings
// router.get('/developers?:page', (req, res) => {

// 	dbConnection.query(
// 		'SELECT count(1) from developers',
// 		(error, rows) => {
// 		if (!error) {
// 			console.log(rows.length);
// 			// res.send(rows);
// 		}
// 		else {
// 			console.log(error);
// 		}
// 	})
// })

//List specific entry
router.get('/developers/:id', (req, res) => {
	let dev = req.params;

	dbConnection.query(
		'SELECT * FROM developers WHERE id = ?', 
		[dev.id], 
		(error, rows) => {
			if (rows.length) res.send(rows);
			else return res.status(404).send(`Não existe registro com o ID ${req.params.id}.`);
	});
});

//Create entry
router.post('/developers', (req, res) => {
	let dev = req.body;
	const { error } = validateData(dev);
	if (!error) {
		dbConnection.query(
			"INSERT INTO developers (nome, sexo, idade, hobby, datanascimento) VALUES (?, ?, ?, ?, ?)", 
			[dev.nome, dev.sexo, dev.idade, dev.hobby, dev.datanascimento], 
			(error, rows) => {
				return res.status(201).send(`O desenvolvedor ID ${rows.insertId} foi criado.`);
		})
	}
	else return res.status(400).send(error.details[0].message);
});

//Update entry
router.put('/developers/:id', (req, res) => {
	let dev = req.body;
	const { error } = validateData(dev);
	if (!error) {
		dbConnection.query(
			"UPDATE developers SET nome = ?, sexo = ?, idade = ?, hobby = ?, datanascimento = ? WHERE id = ?", 
			[dev.nome, dev.sexo, dev.idade, dev.hobby, dev.datanascimento, req.params.id],
			(error, rows) => {
				if (rows.affectedRows == 0) res.status(400).send(`Não existe registro com o ID ${req.params.id}.`)
				else res.send(`O desenvolvedor ID ${req.params.id} foi atualizado.`);
		})
	}
	else res.status(400).send(error.details[0].message);
});

//Delete entry
router.delete('/developers/:id', (req, res) => {
	let dev = req.params;
	dbConnection.query(
		"DELETE FROM developers WHERE id = ?",
		[dev.id],
		(error, rows) => {
			if (rows.affectedRows == 0) res.status(400).send(`Não existe registro com o ID ${dev.id}.`)
			else res.status(204);
	})
});


//Validate data to put or create
const validateData = (data) => {
	const schema = Joi.object({
		"nome" : Joi.string().pattern(/^[a-z A-Z]{3,100}$/).required(),
		"sexo" : Joi.string().pattern(/^[M F]{1}$/).min(1).max(1).required(),
		"idade" : Joi.number().min(1).max(100).required(),
		"hobby" : Joi.string().pattern(/^[a-z A-Z]{3,100}$/).min(3).max(100).required(),
		"datanascimento" : Joi.date().max('now').required()
	});
	return schema.validate(data);
};

module.exports = router;
