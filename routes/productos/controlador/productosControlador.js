var express = require('express');
var router = express.Router();
var productosModelo = require('../modelo/productosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR PRODUCTOS - EXPORTANDO RUTA
router.get('/listarProductos', function(req, res, next) {
  try {
    //web service
    productosModelo.listarProductos(req).then(
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

// AGREGAR PRODUCTOS - EXPORTANDO RUTA
router.post('/agregarProducto', function(req, res, next) {
  try {
    //web service
    productosModelo.agregarProducto(req).then(
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


// ACTUALIZAR PRODUCTOS - EXPORTANDO RUTA
router.put('/actualizarProducto/:idProducto', function(req, res, next) {
  try {
    //web service
    productosModelo.actualizarProducto(req).then(
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

// ELIMINAR PRODUCTOS - EXPORTANDO RUTA
router.delete('/eliminarProducto/:idProducto', function(req, res, next) {
  try {
    //web service
    productosModelo.eliminarProducto(req).then(
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
