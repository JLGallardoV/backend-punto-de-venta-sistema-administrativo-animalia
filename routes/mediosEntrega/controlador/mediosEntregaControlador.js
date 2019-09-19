var express = require('express');
var router = express.Router();
var mediosEntregaModelo = require('../modelo/mediosEntregaModelo');


// LISTAR CMEDIOS DE ENTREGA - EXPORTANDO RUTA
router.get('/listarMediosEntrega', function(req, res, next) {
  try {
    //web service
    mediosEntregaModelo.listarMediosEntrega(req).then(
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

// AGREGAR MEDIOS DE ENTREGA - EXPORTANDO RUTA
router.post('/agregarMedioEntrega', function(req, res, next) {
  try {
    //web service
    mediosEntregaModelo.agregarMedioEntrega(req).then(
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


// ACTUALIZAR MEDIOS DE ENTREGA - EXPORTANDO RUTA
router.put('/actualizarMedioEntrega/:idMedioEntrega', function(req, res, next) {
  try {
    //web service
    mediosEntregaModelo.actualizarMedioEntrega(req).then(
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

// ELIMINAR MEDIOS DE ENTREGA - EXPORTANDO RUTA
router.delete('/eliminarMedioEntrega/:idMedioEntrega', function(req, res, next) {
  try {
    //web service
    mediosEntregaModelo.eliminarMedioEntrega(req).then(
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
