var express = require('express');
var router = express.Router();
var popularidadVendedoresModelo = require('../modelo/popularidadVendedoresModelo');


// LISTAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.get('/listarPopularidadVendedores/:inicioFechaTransacciones/:finalFechaTransacciones', function(req, res, next) {
  try {
    //web service
    popularidadVendedoresModelo.listarPopularidadVendedores(req).then(
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
