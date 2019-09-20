//dependencias:
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//definiendo rutas:
/*var indexRouter = require('./routes/index');
var compensacionesRouter = require('./routes/compensaciones/controlador/compensacionesControlador');
var comprasRouter = require('./routes/compras/controlador/comprasControlador');
var detallesTransaccionesRouter = require('./routes/detallesTransacciones/controlador/detallesTransaccionesControlador');
var devolucionesRouter = require('./routes/devoluciones/controlador/devolucionesControlador');
var productosRouter = require('./routes/productos/controlador/productosControlador');*/
var accesosRouter = require('./routes/accesos/controlador/accesosControlador');
var almacenesRouter = require('./routes/almacenes/controlador/almacenesControlador');
var carritosRouter = require('./routes/carritos/controlador/carritosControlador');
var categoriasRouter = require('./routes/categorias/controlador/categoriasControlador');
var clientesRouter = require('./routes/clientes/controlador/clientesControlador');
var mediosEntregaRouter = require('./routes/mediosEntrega/controlador/mediosEntregaControlador');
var popularidadProductosRouter = require('./routes/popularidadProductos/controlador/popularidadProductosControlador');
var premiosRouter = require('./routes/premios/controlador/premiosControlador');
var rendimientoVendedoresRouter = require('./routes/rendimientoVendedores/controlador/rendimientoVendedoresControlador');
var reportesEconomicosRouter = require('./routes/reportesEconomicos/controlador/reportesEconomicosControlador');
var tiposClientesRouter = require('./routes/tiposClientes/controlador/tiposClientesControlador');
var tiposUsuariosRouter = require('./routes/tiposUsuarios/controlador/tiposUsuariosControlador');
var usuariosRouter = require('./routes/usuarios/controlador/usuariosControlador');
var vendedoresRouter = require('./routes/vendedores/controlador/vendedoresControlador');


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


//creando - invocando rutas de acceso a web service
/*app.use('/', indexRouter);
app.use('/compensacionesWS', compensacionesRouter);
app.use('/detallesTransaccionesWS', detallesTransaccionesRouter);
app.use('/devolucionesWS', devolucionesRouter);
app.use('/productosWS', productosRouter);*/
app.use('/accesosWS', accesosRouter);
app.use('/almacenesWS', almacenesRouter);
app.use('/carritosWS', carritosRouter);
app.use('/categoriasWS', categoriasRouter);
app.use('/clientesWS', clientesRouter);
app.use('/mediosEntregaWS', mediosEntregaRouter);
app.use('/popularidadProductosWS', popularidadProductosRouter);
app.use('/premiosWS', premiosRouter);
app.use('/rendimientoVendedoresWS', rendimientoVendedoresRouter);
app.use('/reportesEconomicosWS', reportesEconomicosRouter);
app.use('/tiposClientesWS', tiposClientesRouter);
app.use('/tiposUsuariosWS', tiposUsuariosRouter);
app.use('/usuariosWS', usuariosRouter);
app.use('/vendedoresWS', vendedoresRouter);



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
