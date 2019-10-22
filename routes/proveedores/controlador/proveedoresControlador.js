var express = require('express');
var router = express.Router();
var proveedoresModelo = require('../modelo/proveedoresModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');


//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR PROVEEDORES - EXPORTANDO RUTA
router.get('/listarProveedores',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				proveedoresModelo.listarProveedores(req).then(
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

// AGREGAR PROVEEDORES - EXPORTANDO RUTA
router.post('/agregarProveedor',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				proveedoresModelo.agregarProveedor(req).then(
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


// ACTUALIZAR PROVEEDORES - EXPORTANDO RUTA
router.put('/actualizarProveedor/:idProveedor',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				proveedoresModelo.actualizarProveedor(req).then(
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

// ELIMINAR PROVEEDORES - EXPORTANDO RUTA
router.delete('/eliminarProveedor/:idProveedor',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				proveedoresModelo.eliminarProveedor(req).then(
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
