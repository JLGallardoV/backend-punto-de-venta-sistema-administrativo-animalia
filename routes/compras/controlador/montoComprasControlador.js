var express = require('express');
var router = express.Router();
var comprasModelo = require('../modelo/comprasModelo');

exports.acumulando = router.get('/montoCompras', function(req, res, next) {
  try {
    var acumularCompras = 0;
    comprasModelo.listarCompras(req).then(
      (success) => {
        //res.json(success);
        //acumulando el recurso economico:
        for (var i = 0; i < success.respuesta.length; i++) {
          acumularCompras += success.respuesta[i].montoCompra
        }
        //console.log("acumulado de router: ", acumularCompras);
        res.json({
          estatus: 1,
          respuesta: acumularCompras
        });
      },
      (error) => {
        res.json({
          estatus: -1,
          respuesta: error
        });
      }
    );
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
