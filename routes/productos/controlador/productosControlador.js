var express = require('express');
var router = express.Router();
var productosModelo = require('../modelo/productosModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');


//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR PRODUCTOS - EXPORTANDO RUTA
router.get('/listarProductos',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				productosModelo.listarProductos(req).then(
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

// AGREGAR PRODUCTOS - EXPORTANDO RUTA
router.post('/agregarProducto',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				productosModelo.agregarProducto(req).then(
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


// ACTUALIZAR PRODUCTOS - EXPORTANDO RUTA
router.put('/actualizarProducto/:idProducto',jwt.verificarExistenciaToken,function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				productosModelo.actualizarProducto(req).then(
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

// ELIMINAR PRODUCTOS - EXPORTANDO RUTA
router.delete('/eliminarProducto/:idProducto',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				productosModelo.eliminarProducto(req).then(
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
