var express = require('express');
var router = express.Router();
var tiposProblemasModelo = require('../modelo/tiposProblemasModelo');


// LISTAR TIPOS DE PROBLEMAS - EXPORTANDO RUTA
router.get('/listarTiposProblemas', function(req, res, next) {
  try {
    //web service
    tiposProblemasModelo.listarTiposProblemas(req).then(
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

// AGREGAR TIPOS DE PROBLEMAS - EXPORTANDO RUTA
router.post('/agregarTipoProblema', function(req, res, next) {
  try {
    //web service
    tiposProblemasModelo.agregarTipoProblema(req).then(
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


// ACTUALIZAR TIPOS DE PROBLEMAS - EXPORTANDO RUTA
router.put('/actualizarTipoProblema/:idTipoProblema', function(req, res, next) {
  try {
    //web service
    tiposProblemasModelo.actualizarTipoProblema(req).then(
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

// ELIMINAR TIPOS DE PROBLEMAS - EXPORTANDO RUTA
router.delete('/eliminarTipoProblema/:idTipoProblema', function(req, res, next) {
  try {
    //web service
    tiposProblemasModelo.eliminarTipoProblema(req).then(
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
