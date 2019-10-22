var express = require('express');
var router = express.Router();
var mediosEntregaModelo = require('../modelo/mediosEntregaModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR CMEDIOS DE ENTREGA - EXPORTANDO RUTA
router.get('/listarMediosEntrega',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				mediosEntregaModelo.listarMediosEntrega(req).then(
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

// AGREGAR MEDIOS DE ENTREGA - EXPORTANDO RUTA
router.post('/agregarMedioEntrega',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				mediosEntregaModelo.agregarMedioEntrega(req).then(
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


// ACTUALIZAR MEDIOS DE ENTREGA - EXPORTANDO RUTA
router.put('/actualizarMedioEntrega/:idMedioEntrega',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				mediosEntregaModelo.actualizarMedioEntrega(req).then(
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

// ELIMINAR MEDIOS DE ENTREGA - EXPORTANDO RUTA
router.delete('/eliminarMedioEntrega/:idMedioEntrega',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				mediosEntregaModelo.eliminarMedioEntrega(req).then(
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
