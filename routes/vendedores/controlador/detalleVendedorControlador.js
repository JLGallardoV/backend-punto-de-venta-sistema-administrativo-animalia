var express = require('express');
var router = express.Router();
var detalleVendedorModelo = require('../modelo/detalleVendedorModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// LISTAR VENDEDOR - EXPORTANDO RUTA
router.get('/listarDetalleVendedor/:idVendedor', function(req, res, next) {
  try {
    //web service
    detalleVendedorModelo.listarDetalleVendedor(req).then(
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
