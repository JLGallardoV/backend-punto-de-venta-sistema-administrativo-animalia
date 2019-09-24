var express = require('express');
var router = express.Router();
var transaccionesModelo = require('../modelo/transaccionesModelo');

exports.acumulando = router.get('/montoTransacciones', function(req, res, next) {
  try {
    var acumularTransacciones = 0;
    transaccionesModelo.listarTransacciones(req).then(
      (success) => {
        //res.json(success);
        //acumulando el recurso economico:
        for (var i = 0; i < success.respuesta.length; i++) {
          acumularTransacciones += success.respuesta[i].montoConIvaTransaccion
        }
        //console.log("acumulado de router: ", acumularCompras);
        res.json({
          estatus: 1,
          respuesta: acumularTransacciones
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
