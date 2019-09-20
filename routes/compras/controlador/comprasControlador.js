var express = require('express');
var router = express.Router();
var comprasModelo = require('../modelo/comprasModelo');


// LISTAR COMPRAS - EXPORTANDO RUTA
router.get('/listarCompras', function(req, res, next) {
  try {
    //web service
    comprasModelo.listarCompras(req).then(
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

// AGREGAR COMPRAS - EXPORTANDO RUTA
router.post('/agregarCompra', function(req, res, next) {
  try {
    //web service
    comprasModelo.agregarCompra(req).then(
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


// ACTUALIZAR COMPRAS - EXPORTANDO RUTA
router.put('/actualizarCompra/:idCompra', function(req, res, next) {
  try {
    //web service
    comprasModelo.actualizarCompra(req).then(
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

// ELIMINAR COMPRAS - EXPORTANDO RUTA
router.delete('/eliminarCompra/:idCompra', function(req, res, next) {
  try {
    //web service
    comprasModelo.eliminarCompra(req).then(
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
