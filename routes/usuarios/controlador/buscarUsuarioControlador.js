var express = require('express');
var router = express.Router();
var buscarUsuarioModelo = require('../modelo/buscarUsuarioModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// BUSCAR USUARIO X NOMBRE - EXPORTANDO RUTA
router.get('/buscarUsuarioPorNombre/:nombreUsuario',function(req, res, next) {
  try {
				buscarUsuarioModelo.buscarUsuario(req).then(
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
