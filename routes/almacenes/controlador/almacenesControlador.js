var express = require('express');
var router = express.Router();
var almacenesModelo = require('../modelo/almacenesModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.get('/listarAlmacenes', function(req, res, next) {
  try {
    //web service
    almacenesModelo.listarAlmacenes(req).then(
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

// AGREGAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.post('/agregarAlmacen', function(req, res, next) {
  try {
    //web service
    almacenesModelo.agregarAlmacen(req).then(
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


// ACTUALIZAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.put('/actualizarAlmacen/:idAlmacen', function(req, res, next) {
  try {
    //web service
    almacenesModelo.actualizarAlmacen(req).then(
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

// ELIMINAR ALMACENES - EXPORTANDO RUTA
router.delete('/eliminarAlmacen/:idAlmacen', function(req, res, next) {
  try {
    //web service
    almacenesModelo.eliminarAlmacen(req).then(
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
