var express = require('express');
var router = express.Router();
var tiposPagosModelo = require('../modelo/tiposPagosModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');


//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.get('/listarTiposPagos',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposPagosModelo.listarTiposPagos(req).then(
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

// AGREGAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.post('/agregarTipoPago',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposPagosModelo.agregarTipoPago(req).then(
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


// ACTUALIZAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.put('/actualizarTipoPago/:idTipoPago',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposPagosModelo.actualizarTipoPago(req).then(
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

// ELIMINAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.delete('/eliminarTipoPago/:idTipoPago',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposPagosModelo.eliminarTipoPago(req).then(
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
