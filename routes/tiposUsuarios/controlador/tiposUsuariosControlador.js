var express = require('express');
var router = express.Router();
var tiposUsuariosModelo = require('../modelo/tiposUsuariosModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});
// LISTAR TIPOS DE USUARIOS - EXPORTANDO RUTA
router.get('/listarTiposUsuarios', function(req, res, next) {
  try {
    tiposUsuariosModelo.listarTiposUsuarios(req).then(
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
// AGREGAR TIPOS DE USUARIOS - EXPORTANDO RUTA
router.post('/agregarTipoUsuario',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposUsuariosModelo.agregarTipoUsuario(req).then(
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


// ACTUALIZAR TIPOS DE USUARIOS - EXPORTANDO RUTA
router.put('/actualizarTipoUsuario/:idTipoUsuario',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposUsuariosModelo.actualizarTipoUsuario(req).then(
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

// ELIMINAR TIPOS DE USUARIOS - EXPORTANDO RUTA
router.delete('/eliminarTipoUsuario/:idTipoUsuario',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				tiposUsuariosModelo.eliminarTipoUsuario(req).then(
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
