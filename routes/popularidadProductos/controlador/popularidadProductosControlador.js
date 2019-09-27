var express = require('express');
var router = express.Router();
var popularidadProductosModelo = require('../modelo/popularidadProductosModelo');


// LISTAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.get('/listarPopularidadProductos/:inicioFechaTransacciones/:finalFechaTransacciones', function(req, res, next) {
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

module.exports = router;
