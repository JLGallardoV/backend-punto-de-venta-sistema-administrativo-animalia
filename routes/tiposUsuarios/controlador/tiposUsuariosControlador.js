var express = require('express');
var router = express.Router();
var tiposUsuariosModelo = require('../modelo/tiposUsuariosModelo');


// LISTAR TIPOS DE USUARIOS - EXPORTANDO RUTA
router.get('/listarTiposUsuarios', function(req, res, next) {
  try {
    //web service
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
router.post('/agregarTipoUsuario', function(req, res, next) {
  try {
    //web service
    tiposUsuariosModelo.agregarTipoUsuario(req).then(
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


// ACTUALIZAR TIPOS DE USUARIOS - EXPORTANDO RUTA
router.put('/actualizarTipoUsuario/:idTipoUsuario', function(req, res, next) {
  try {
    //web service
    tiposUsuariosModelo.actualizarTipoUsuario(req).then(
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

// ELIMINAR TIPOS DE USUARIOS - EXPORTANDO RUTA
router.delete('/eliminarTipoUsuario/:idTipoUsuario', function(req, res, next) {
  try {
    //web service
    tiposUsuariosModelo.eliminarTipoUsuario(req).then(
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
