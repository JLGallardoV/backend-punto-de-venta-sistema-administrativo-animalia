var express = require('express');
var router = express.Router();
var ventasVendedoresModelo = require('../modelo/ventasVendedoresModelo');


// LISTAR RENDIMIENTO VENDEDORES - EXPORTANDO RUTA
router.get('/listarVentasVendedores', function(req, res, next) {
  try {
    //web service
    ventasVendedoresModelo.listarVentasVendedores(req).then(
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
