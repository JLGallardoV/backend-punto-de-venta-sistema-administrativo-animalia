var express = require('express');
var router = express.Router();
var detallesTransaccionesModelo = require('../modelo/detallesTransaccionesModelo');


// LISTAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.get('/listarDetallesTransacciones', function(req, res, next) {
  try {
    //web service
    detallesTransaccionesModelo.listarDetallesTransacciones(req).then(
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
router.post('/agregarDetalleTransaccion', function(req, res, next) {
  try {
    //web service
    detallesTransaccionesModelo.agregarDetalleTransaccion(req).then(
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
router.put('/actualizarDetalleTransaccion/:idDetalleTransaccion', function(req, res, next) {
  try {
    //web service
    detallesTransaccionesModelo.actualizarDetalleTransaccion(req).then(
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
router.delete('/eliminarDetalleTransaccion/:idDetalleTransaccion', function(req, res, next) {
  try {
    //web service
    detallesTransaccionesModelo.eliminarDetalleTransaccion(req).then(
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
