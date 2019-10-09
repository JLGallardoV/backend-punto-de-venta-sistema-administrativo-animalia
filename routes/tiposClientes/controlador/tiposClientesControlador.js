var express = require('express');
var router = express.Router();
var tiposClientesModelo = require('../modelo/tiposClientesModelo');


//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// LISTAR TIPOS DE CLIENTES - EXPORTANDO RUTA
router.get('/listarTiposClientes', function(req, res, next) {
  try {
    //web service
    tiposClientesModelo.listarTiposClientes(req).then(
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

// AGREGAR TIPOS DE CLIENTES - EXPORTANDO RUTA
router.post('/agregarTipoCliente', function(req, res, next) {
  try {
    //web service
    tiposClientesModelo.agregarTipoCliente(req).then(
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


// ACTUALIZAR TIPOS DE CLIENTES - EXPORTANDO RUTA
router.put('/actualizarTipoCliente/:idTipoCliente', function(req, res, next) {
  try {
    //web service
    tiposClientesModelo.actualizarTipoCliente(req).then(
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

// ELIMINAR TIPOS DE CLIENTES - EXPORTANDO RUTA
router.delete('/eliminarTipoCliente/:idTipoCliente', function(req, res, next) {
  try {
    //web service
    tiposClientesModelo.eliminarTipoCliente(req).then(
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
