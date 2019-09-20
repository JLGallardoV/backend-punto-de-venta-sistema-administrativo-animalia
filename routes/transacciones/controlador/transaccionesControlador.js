var express = require('express');
var router = express.Router();
var transaccionesModelo = require('../modelo/transaccionesModelo');


// LISTAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.get('/listarTransacciones', function(req, res, next) {
  try {
    //web service
    transaccionesModelo.listarTransacciones(req).then(
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

// AGREGAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.post('/agregarTransaccion', function(req, res, next) {
  try {
    //web service
    transaccionesModelo.agregarTransaccion(req).then(
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


// ACTUALIZAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.put('/actualizarTransaccion/:idTransaccion', function(req, res, next) {
  try {
    //web service
    transaccionesModelo.actualizarTransaccion(req).then(
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

// ELIMINAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.delete('/eliminarTransaccion/:idTransaccion', function(req, res, next) {
  try {
    //web service
    transaccionesModelo.eliminarTransaccion(req).then(
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
