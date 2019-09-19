var express = require('express');
var router = express.Router();
var rendimientoVendedoresModelo = require('../modelo/rendimientoVendedoresModelo');


// LISTAR RENDIMIENTO VENDEDORES - EXPORTANDO RUTA
router.get('/listarRendimientoVendedores', function(req, res, next) {
  try {
    //web service
    rendimientoVendedoresModelo.listarRendimientoVendedores(req).then(
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

// AGREGAR RENDIMIENTO VENDEDORES - EXPORTANDO RUTA
router.post('/agregarRendimientoVendedor', function(req, res, next) {
  try {
    //web service
    rendimientoVendedoresModelo.agregarRendimientoVendedor(req).then(
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


// ACTUALIZAR RENDIMIENTO VENDEDORES - EXPORTANDO RUTA
router.put('/actualizarRendimientoVendedor/:idRendimientoVendedor', function(req, res, next) {
  try {
    //web service
    rendimientoVendedoresModelo.actualizarRendimientoVendedor(req).then(
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

// ELIMINAR RENDIMIENTO VENDEDORES - EXPORTANDO RUTA
router.delete('/eliminarRendimientoVendedor/:idRendimientoVendedor', function(req, res, next) {
  try {
    //web service
    rendimientoVendedoresModelo.eliminarRendimientoVendedor(req).then(
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
