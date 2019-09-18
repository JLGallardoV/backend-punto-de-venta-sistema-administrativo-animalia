var express = require('express');
var router = express.Router();
var popularidadProductosModelo = require('../modelo/popularidadProductosModelo');


// LISTAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.get('/listarPopularidadProductos', function(req, res, next) {
  try {
    //web service
    popularidadProductosModelo.listarPopularidadProductos(req).then(
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

// AGREGAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.post('/agregarPopularidadProducto', function(req, res, next) {
  try {
    //web service
    popularidadProductosModelo.agregarPopularidadProducto(req).then(
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


// ACTUALIZAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.put('/actualizarPopularidadProducto/:idPopularidadProducto', function(req, res, next) {
  try {
    //web service
    popularidadProductosModelo.actualizarPopularidadProducto(req).then(
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

// ELIMINAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.delete('/eliminarPopularidadProducto/:idPopularidadProducto', function(req, res, next) {
  try {
    //web service
    popularidadProductosModelo.eliminarPopularidadProducto(req).then(
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
