var express = require('express');
var router = express.Router();
var accesosModelo = require('../modelo/accesosModelo');


// LISTAR ACCESOS- EXPORTANDO RUTA
router.get('/listarAccesos', function(req, res, next) {
  try {
    //web service
    accesosModelo.listarAccesos(req).then(
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

// AGREGAR ACCESOS- EXPORTANDO RUTA
router.post('/agregarAcceso', function(req, res, next) {
  try {
    //web service
    accesosModelo.agregarAcceso(req).then(
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


// ACTUALIZAR ACCESOS- EXPORTANDO RUTA
router.put('/actualizarAcceso/:idAcceso', function(req, res, next) {
  try {
    //web service
    accesosModelo.actualizarAcceso(req).then(
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

// ELIMINAR ACCESOS- EXPORTANDO RUTA
router.delete('/eliminarAcceso/:idAcceso', function(req, res, next) {
  try {
    //web service
    accesosModelo.eliminarAcceso(req).then(
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
