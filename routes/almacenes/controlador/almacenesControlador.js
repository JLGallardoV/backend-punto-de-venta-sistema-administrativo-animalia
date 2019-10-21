var express = require('express');
var router = express.Router();
var almacenesModelo = require('../modelo/almacenesModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.get('/listarAlmacenes',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				almacenesModelo.listarAlmacenes(req).then(
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

// AGREGAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.post('/agregarAlmacen',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				almacenesModelo.agregarAlmacen(req).then(
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


// ACTUALIZAR POPULARIDAD PRODUCTOS - EXPORTANDO RUTA
router.put('/actualizarAlmacen/:idAlmacen',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				almacenesModelo.actualizarAlmacen(req).then(
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

// ELIMINAR ALMACENES - EXPORTANDO RUTA
router.delete('/eliminarAlmacen/:idAlmacen',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				almacenesModelo.eliminarAlmacen(req).then(
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
