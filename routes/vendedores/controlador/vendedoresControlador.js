var express = require('express');
var router = express.Router();
var vendedoresModelo = require('../modelo/vendedoresModelo');


// LISTAR VENDEDORES - EXPORTANDO RUTA
router.get('/listarVendedores', function(req, res, next) {
  try {
    //web service
    vendedoresModelo.listarVendedores(req).then(
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

// AGREGAR VENDEDORES - EXPORTANDO RUTA
router.post('/agregarVendedor', function(req, res, next) {
  try {
    //web service
    vendedoresModelo.agregarVendedor(req).then(
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


// ACTUALIZAR VENDEDORES - EXPORTANDO RUTA
router.put('/actualizarVendedor/:idVendedor', function(req, res, next) {
  try {
    //web service
    vendedoresModelo.actualizarVendedor(req).then(
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

// ELIMINAR VENDEDORES - EXPORTANDO RUTA
router.delete('/eliminarVendedor/:idVendedor', function(req, res, next) {
  try {
    //web service
    vendedoresModelo.eliminarVendedor(req).then(
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
