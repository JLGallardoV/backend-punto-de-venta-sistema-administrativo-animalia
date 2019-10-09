var express = require('express');
var router = express.Router();
var premiosModelo = require('../modelo/premiosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR PREMIOS - EXPORTANDO RUTA
router.get('/listarPremios', function(req, res, next) {
  try {
    //web service
    premiosModelo.listarPremios(req).then(
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

// AGREGAR PREMIO - EXPORTANDO RUTA
router.post('/agregarPremio', function(req, res, next) {
  try {
    //web service
    premiosModelo.agregarPremio(req).then(
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


// ACTUALIZAR PREMIO - EXPORTANDO RUTA
router.put('/actualizarPremio/:idPremio', function(req, res, next) {
  try {
    //web service
    premiosModelo.actualizarPremio(req).then(
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

// ELIMINAR PREMIO - EXPORTANDO RUTA
router.delete('/eliminarPremio/:idPremio', function(req, res, next) {
  try {
    //web service
    premiosModelo.eliminarPremio(req).then(
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
