var express = require('express');
var router = express.Router();
var puntosClientesModelo = require('../modelo/puntosClientesModelo');

// LISTAR PUNTOS CLIENTES - EXPORTANDO RUTA
router.get('/listarPuntosClientes', function(req, res, next) {
  try {
    //web service
    puntosClientesModelo.listarPuntosClientes(req).then(
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
