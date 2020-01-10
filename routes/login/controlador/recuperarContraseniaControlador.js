var express = require('express');
var router = express.Router();
var jwt = require('../../../public/servicios/jwt');
var recuperarContrasenia = require('../modelo/recuperarContraseniaModelo');
var jsonWebToken = require('jsonwebtoken');


//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// ENVIANDO EMAIL- EXPORTANDO RUTA
router.post('/enviarEmail', function(req, res, next) {
  try {
    //web service
    recuperarContrasenia.enviarCorreo(req).then(
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

// VALIDAR TOKEN - EXPORTANDO RUTA
router.post('/validarToken', function(req, res, next) {
  try {
    //web service
		console.log("entro a la ruta");
    recuperarContrasenia.verificarJWT(req).then(
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

// EDITAR CONTRASEÑA - EXPORTANDO RUTA
router.post('/nuevaContrasenia',jwt.verificarExistenciaToken, function(req, res, next) {
  try {
		jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				recuperarContrasenia.cambiarContrasenia(req).then(
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
