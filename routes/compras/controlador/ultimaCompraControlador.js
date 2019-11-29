var express = require('express');
var router = express.Router();
var ultimaCompraModelo = require('../modelo/ultimaCompraModelo');

//CABECERAS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  next();
});


// LISTAR ULTIMA VENTA - EXPORTANDO RUTA
router.get('/listarUltimaCompra', function(req, res, next) {
  try {
    //web service
    ultimaCompraModelo.listarUltimaCompra(req).then(
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
