var express = require('express');
var router = express.Router();
var categoriasModelo = require('../modelo/categoriasModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');


//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// LISTAR CATEGORIAS - EXPORTANDO RUTA
router.get('/listarCategorias', jwt.verificarExistenciaToken, function(req,res,next) {
  try {
    jsonWebToken.verify(req.token, jwt.claveSecreta, function(error,decoded) {
			if (decoded) {
				categoriasModelo.listarCategorias(req).then(
					(success) => {
						res.json(success);
					},
					(error) => {
						res.json(error);
					}
				);
			}else if(error) {
				res.json({
					estatus: -1,
					respuesta: "lo siento, token incorrecto"
				})
			}

    });
  }catch (error) {
    return next(error);
  }
});

// AGREGAR CATEGORIA - EXPORTANDO RUTA
router.post('/agregarCategoria', function(req, res, next) {
  try {
    //web service
    categoriasModelo.agregarCategoria(req).then(
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


// ACTUALIZAR CATEGORIA - EXPORTANDO RUTA
router.put('/actualizarCategoria/:idCategoria', function(req, res, next) {
  try {
    //web service
    categoriasModelo.actualizarCategoria(req).then(
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

// ELIMINAR CATEGORIA - EXPORTANDO RUTA
router.delete('/eliminarCategoria/:idCategoria', function(req, res, next) {
  try {
    //web service
    categoriasModelo.eliminarCategoria(req).then(
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

module.exports = router;
