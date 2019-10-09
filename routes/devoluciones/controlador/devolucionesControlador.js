var express = require('express');
var router = express.Router();
var devolucionesModelo = require('../modelo/devolucionesModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// LISTAR TIPOS DE DEVOLUCIONES - EXPORTANDO RUTA
router.get('/listarDevoluciones', function(req, res, next) {
  try {
    //web service
    devolucionesModelo.listarDevoluciones(req).then(
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

// AGREGAR TIPOS DE DEVOLUCIONES - EXPORTANDO RUTA
router.post('/agregarDevolucion', function(req, res, next) {
  try {
    //web service
    devolucionesModelo.agregarDevolucion(req).then(
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


// ACTUALIZAR TIPOS DE DEVOLUCIONES - EXPORTANDO RUTA
router.put('/actualizarDevolucion/:idDevolucion', function(req, res, next) {
  try {
    //web service
    devolucionesModelo.actualizarDevolucion(req).then(
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

// ELIMINAR TIPOS DE DEVOLUCIONES - EXPORTANDO RUTA
router.delete('/eliminarDevolucion/:idDevolucion', function(req, res, next) {
  try {
    //web service
    devolucionesModelo.eliminarDevolucion(req).then(
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
