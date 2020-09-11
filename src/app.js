const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const customerRoutes = require('./routes/customer');

const app = express();

const port = process.env.PORT;
const localhost = process.env.HOST_HOME;
const redhost = process.env.HOST_RED;

app.set('port', port);
app.set('hostname', localhost || redhost);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const _db_options = {
	host:'localhost',
	user:'root',
	password:'contraseña',
	port: 3306,
	database: 'crudnodejsmysql'
}

app.use(morgan('dev'));
app.use(myConnection(mysql,_db_options, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});

module.exports = app;
