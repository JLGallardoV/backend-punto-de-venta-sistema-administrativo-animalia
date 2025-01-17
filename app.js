//dependencias:
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//definiendo rutas:
/*var indexRouter = require('./routes/index');*/
var accesosRouter = require('./routes/accesos/controlador/accesosControlador');
var almacenesRouter = require('./routes/almacenes/controlador/almacenesControlador');
var carritosRouter = require('./routes/carritos/controlador/carritosControlador');
var categoriasRouter = require('./routes/categorias/controlador/categoriasControlador');
var clientesRouter = require('./routes/clientes/controlador/clientesControlador');
var clientesDetallesRouter = require('./routes/clientes/controlador/detalleClienteControlador');
var compensacionesRouter = require('./routes/compensaciones/controlador/compensacionesControlador');
var comprasRouter = require('./routes/compras/controlador/comprasControlador');
var comprasUltimaRouter = require('./routes/compras/controlador/ultimaCompraControlador');
var comprasDetallesRouter = require('./routes/compras/controlador/detalleCompraControlador');
var enviosRouter = require('./routes/envios/controlador/enviosControlador');
var devolucionesRouter = require('./routes/devoluciones/controlador/devolucionesControlador');
var devolucionesDetallesRouter = require('./routes/devoluciones/controlador/detalleDevolucionControlador');
var loginRouter = require('./routes/login/controlador/loginControlador');
var loginRecuperarContraseniaRouter = require('./routes/login/controlador/recuperarContraseniaControlador');
var mediosEntregaRouter = require('./routes/mediosEntrega/controlador/mediosEntregaControlador');
var popularidadProductosRouter = require('./routes/popularidadProductos/controlador/popularidadProductosControlador');
var popularidadVendedoresRouter = require('./routes/popularidadVendedores/controlador/popularidadVendedoresControlador');
var premiosRouter = require('./routes/premios/controlador/premiosControlador');
var productosRouter = require('./routes/productos/controlador/productosControlador');
var productosDetallesRouter = require('./routes/productos/controlador/detalleProductoControlador');
var proveedoresRouter = require('./routes/proveedores/controlador/proveedoresControlador');
var proveedoresDetallesRouter = require('./routes/proveedores/controlador/detalleProveedorControlador');
var reportesEconomicosRouter = require('./routes/reportesEconomicos/controlador/reportesEconomicosControlador');
var tiposClientesRouter = require('./routes/tiposClientes/controlador/tiposClientesControlador');
var tiposPagosRouter = require('./routes/tiposPagos/controlador/tiposPagosControlador');
var tiposPagosBuscarRouter = require('./routes/tiposPagos/controlador/buscarTiposPagosControlador');
var tiposProblemasRouter = require('./routes/tiposProblemas/controlador/tiposProblemasControlador');
var tiposUsuariosRouter = require('./routes/tiposUsuarios/controlador/tiposUsuariosControlador');
var transacciones_clientesRouter = require('./routes/transacciones_clientes/controlador/transacciones_clientesControlador');
var transacciones_productosRouter = require('./routes/transacciones_productos/controlador/transacciones_productosControlador');
var transaccionesRouter = require('./routes/transacciones/controlador/transaccionesControlador');
var transaccionesUltimaRouter = require('./routes/transacciones/controlador/ultimaTransaccionControlador');
var transaccionesDetallesRouter = require('./routes/transacciones/controlador/detalleTransaccionControlador');
var usuariosRouter = require('./routes/usuarios/controlador/usuariosControlador');
var usuariosDetallesRouter = require('./routes/usuarios/controlador/detalleUsuarioControlador');
var usuariosBuscarRouter = require('./routes/usuarios/controlador/buscarUsuarioControlador');
var vendedoresRouter = require('./routes/vendedores/controlador/vendedoresControlador');
var vendedoresDetallesRouter = require('./routes/vendedores/controlador/detalleVendedorControlador');
var vendedoresBuscarRouter = require('./routes/vendedores/controlador/buscarVendedorControlador');
var ventasVendedoresRouter = require('./routes/rendimientoVendedores/controlador/ventasVendedoresControlador');


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
	database: 'tiendaMascotas_JLGallardoV'
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
/*app.use('/', indexRouter);*/
app.use('/accesosWS', accesosRouter);
app.use('/almacenesWS', almacenesRouter);
app.use('/carritosWS', carritosRouter);
app.use('/categoriasWS', categoriasRouter);
app.use('/clientesWS', clientesRouter);
app.use('/clientesWS', clientesDetallesRouter);
app.use('/compensacionesWS', compensacionesRouter);
app.use('/comprasWS', comprasRouter);
app.use('/comprasWS', comprasUltimaRouter);
app.use('/comprasWS', comprasDetallesRouter);
app.use('/enviosWS', enviosRouter);
app.use('/devolucionesWS', devolucionesRouter);
app.use('/devolucionesWS', devolucionesDetallesRouter);
app.use('/loginWS', loginRouter);
app.use('/loginWS', loginRecuperarContraseniaRouter);
app.use('/mediosEntregaWS', mediosEntregaRouter);
app.use('/popularidadProductosWS', popularidadProductosRouter);
app.use('/popularidadVendedoresWS', popularidadVendedoresRouter);
app.use('/premiosWS', premiosRouter);
app.use('/productosWS', productosRouter);
app.use('/productosWS', productosDetallesRouter);
app.use('/proveedoresWS', proveedoresRouter);
app.use('/proveedoresWS', proveedoresDetallesRouter);
app.use('/rendimientoVendedoresWS', ventasVendedoresRouter);
app.use('/reportesEconomicosWS', reportesEconomicosRouter);
app.use('/tiposClientesWS', tiposClientesRouter);
app.use('/tiposPagosWS', tiposPagosRouter);
app.use('/tiposPagosWS', tiposPagosBuscarRouter);
app.use('/tiposProblemasWS', tiposProblemasRouter);
app.use('/tiposUsuariosWS', tiposUsuariosRouter);
app.use('/transaccionesWS', transaccionesRouter);
app.use('/transaccionesWS', transaccionesUltimaRouter);
app.use('/transaccionesWS', transaccionesDetallesRouter);
app.use('/transaccionesWS', transacciones_clientesRouter);
app.use('/transaccionesWS', transacciones_productosRouter);
app.use('/usuariosWS', usuariosRouter);
app.use('/usuariosWS', usuariosDetallesRouter);
app.use('/usuariosWS', usuariosBuscarRouter);
app.use('/vendedoresWS', vendedoresRouter);
app.use('/vendedoresWS', vendedoresDetallesRouter);
app.use('/vendedoresWS', vendedoresBuscarRouter);



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
