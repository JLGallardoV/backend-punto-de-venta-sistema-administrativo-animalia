var express = require('express');
var router = express.Router();
var enviosModelo = require('../modelo/enviosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// LISTAR ENVIOS - EXPORTANDO RUTA
router.get('/listarEnvios', function(req, res, next) {
  try {
    //web service
    enviosModelo.listarEnvios(req).then(
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

// AGREGAR ENVIOS - EXPORTANDO RUTA
router.post('/agregarEnvio', function(req, res, next) {
  try {
    //web service
    enviosModelo.agregarEnvio(req).then(
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


// ACTUALIZAR ENVIOS - EXPORTANDO RUTA
router.put('/actualizarEnvio/:idEnvio', function(req, res, next) {
  try {
    //web service
    enviosModelo.actualizarEnvio(req).then(
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

// ELIMINAR ENVIOS - EXPORTANDO RUTA
router.delete('/eliminarEnvio/:idEnvio', function(req, res, next) {
  try {
    //web service
    enviosModelo.eliminarEnvio(req).then(
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
