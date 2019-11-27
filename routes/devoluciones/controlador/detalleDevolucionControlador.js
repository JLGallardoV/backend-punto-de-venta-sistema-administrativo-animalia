var express = require('express');
var router = express.Router();
var detalleDevolucionModelo = require('../modelo/detalleDevolucionModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// LISTAR DEVOLUCION - EXPORTANDO RUTA
router.get('/listarDetalleDevolucion/:idDevolucion', function(req, res, next) {
  try {
    //web service
    detalleDevolucionModelo.listarDetalleDevolucion(req).then(
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
