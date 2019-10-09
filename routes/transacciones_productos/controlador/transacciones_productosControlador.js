var express = require('express');
var router = express.Router();
var transacciones_productosModelo = require('../modelo/transacciones_productosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR RELACION TRANSACCIONES - PRODUCTOS - EXPORTANDO RUTA
router.get('/listarTransacciones_productos', function(req, res, next) {
  try {
    //web service
    transacciones_productosModelo.listarTransacciones_productos(req).then(
      (success) => {
        res.json(success);
      },
      (error) => {
        res.json(error);
      }
    );
  } catch (error) {
    return next(error);
  }
});

// AGREGAR RELACION TRANSACCIONES - PRODUCTOS - EXPORTANDO RUTA
router.post('/agregarTransaccion_producto', function(req, res, next) {
  try {
    //web service
    transacciones_productosModelo.agregarTransaccion_producto(req).then(
      (success) => {
        res.json(success);
      },
      (error) => {
        res.json(error);
      }
    );
  } catch (error) {
    return next(error);
  }
});


// ACTUALIZAR RELACION TRANSACCIONES - PRODUCTOS - EXPORTANDO RUTA
router.put('/actualizarTransaccion_producto/:idTransaccion/:idProducto', function(req, res, next) {
  try {
    //web service
    transacciones_productosModelo.actualizarTransaccion_producto(req).then(
      (success) => {
        res.json(success);
      },
      (error) => {
        res.json(error);
      }
    );
  } catch (error) {
    return next(error);
  }
});

// ELIMINAR RELACION TRANSACCIONES - PRODUCTOS - EXPORTANDO RUTA
router.delete('/eliminarTransaccion_producto/:idTransaccion/:idProducto', function(req, res, next) {
  try {
    //web service
    transacciones_productosModelo.eliminarTransaccion_producto(req).then(
      (success) => {
        res.json(success);
      },
      (error) => {
        res.json(error);
      }
    );
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
