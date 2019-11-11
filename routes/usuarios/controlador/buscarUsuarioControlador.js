var express = require('express');
var router = express.Router();
var buscarUsuarioModelo = require('../modelo/buscarUsuarioModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');


//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// BUSCAR USUARIO X NOMBRE - EXPORTANDO RUTA
router.get('/buscarUsuarioPorNombre/:nombreUsuario',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				buscarUsuarioModelo.buscarUsuario(req).then(
					(success) => {
						res.json(success);
					},
					(error) => {
						res.json(error);
					}
				);

			}else if (error) {
				res.json({
					estatus: -1,
					respuesta: "lo siento, token incorrecto"
				})
			}


		});
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
