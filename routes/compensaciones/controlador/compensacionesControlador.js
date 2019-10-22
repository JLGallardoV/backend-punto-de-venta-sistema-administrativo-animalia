var express = require('express');
var router = express.Router();
var compensacionesModelo = require('../modelo/compensacionesModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR COMPENSACIONES - EXPORTANDO RUTA
router.get('/listarCompensaciones',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				compensacionesModelo.listarCompensaciones(req).then(
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

// AGREGAR COMPENSACIONES - EXPORTANDO RUTA
router.post('/agregarCompensacion',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				compensacionesModelo.agregarCompensacion(req).then(
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


// ACTUALIZAR COMPENSACIONES - EXPORTANDO RUTA
router.put('/actualizarCompensacion/:idCompensacion',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				compensacionesModelo.actualizarCompensacion(req).then(
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

// ELIMINAR COMPENSACIONES - EXPORTANDO RUTA
router.delete('/eliminarCompensacion/:idCompensacion',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				compensacionesModelo.eliminarCompensacion(req).then(
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
