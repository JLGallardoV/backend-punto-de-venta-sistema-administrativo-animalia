var express = require('express');
var router = express.Router();
var filtrarComprasModelo = require('../modelo/filtrarxFechaComprasModelo');

/*AÑADIENDO CABECERAS:*/
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	return next();
});


//FILTRAR COMPRAS ENTRE DOS FECHAS - EXPORTANDO RUTA
router.get('/filtrarxFechaCompras/:deFecha/:aFecha', function(req, res, next) {
  try {
    filtrarComprasModelo.filtrarCompras(req).then(
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
