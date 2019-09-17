//dependencias:
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//rutas:
var indexRouter = require('./routes/index');
var premiosRouter = require('./routes/premios');

//importar dependencias para poder usar mysql
var mysqlConnection = require('express-myconnection');
var mysql = require('mysql');

//importar body parser
var bodyParser = require('body-parser');

var app = express();
//conectando db
app.use(mysqlConnection(mysql, {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tiendaMascotas'
}, 'request'));

//usar body parser en mi aplicación express en formato json
app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//creando rutas de acceso a web service
app.use('/', indexRouter);
app.use('/premiosWS', premiosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
