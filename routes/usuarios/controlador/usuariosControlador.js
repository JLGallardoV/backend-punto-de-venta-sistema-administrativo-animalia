var express = require('express');
var router = express.Router();
var usuariosModelo = require('../modelo/usuariosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR USUARIOS - EXPORTANDO RUTA
router.get('/listarUsuarios', function(req, res, next) {
  try {
    //web service
    usuariosModelo.listarUsuarios(req).then(
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

// AGREGAR USUARIOS - EXPORTANDO RUTA
router.post('/agregarUsuario', function(req, res, next) {
  try {
    //web service
    usuariosModelo.agregarUsuario(req).then(
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


// ACTUALIZAR USUARIOS - EXPORTANDO RUTA
router.put('/actualizarUsuario/:idUsuario', function(req, res, next) {
  try {
    //web service
    usuariosModelo.actualizarUsuario(req).then(
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

// ELIMINAR USUARIOS - EXPORTANDO RUTA
router.delete('/eliminarUsuario/:idUsuario', function(req, res, next) {
  try {
    //web service
    usuariosModelo.eliminarUsuario(req).then(
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
