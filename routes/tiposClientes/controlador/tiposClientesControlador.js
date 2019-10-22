var express = require('express');
var router = express.Router();
var tiposClientesModelo = require('../modelo/tiposClientesModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');


//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// LISTAR TIPOS DE CLIENTES - EXPORTANDO RUTA
router.get('/listarTiposClientes',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposClientesModelo.listarTiposClientes(req).then(
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

// AGREGAR TIPOS DE CLIENTES - EXPORTANDO RUTA
router.post('/agregarTipoCliente',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposClientesModelo.agregarTipoCliente(req).then(
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


// ACTUALIZAR TIPOS DE CLIENTES - EXPORTANDO RUTA
router.put('/actualizarTipoCliente/:idTipoCliente',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposClientesModelo.actualizarTipoCliente(req).then(
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

// ELIMINAR TIPOS DE CLIENTES - EXPORTANDO RUTA
router.delete('/eliminarTipoCliente/:idTipoCliente',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposClientesModelo.eliminarTipoCliente(req).then(
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
