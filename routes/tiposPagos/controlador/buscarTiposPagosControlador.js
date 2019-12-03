var express = require('express');
var router = express.Router();
var buscarTipoPagoModelo = require('../modelo/buscarTiposPagosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// BUSCAR USUARIO X NOMBRE - EXPORTANDO RUTA
router.get('/buscarTipoPagoPorID/:idTipoPago',function(req, res, next) {
  try {
				buscarTipoPagoModelo.buscarTipoPago(req).then(
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
