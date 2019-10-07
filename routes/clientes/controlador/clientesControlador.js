var express = require('express');
var router = express.Router();
var clientesModelo = require('../modelo/clientesModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR CLIENTES - EXPORTANDO RUTA
router.get('/listarClientes', function(req, res, next) {
  try {
    //web service
    clientesModelo.listarClientes(req).then(
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

// AGREGAR CLIENTES - EXPORTANDO RUTA
router.post('/agregarCliente', function(req, res, next) {
  try {
    //web service
    clientesModelo.agregarCliente(req).then(
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


// ACTUALIZAR CLIENTES - EXPORTANDO RUTA
router.put('/actualizarCliente/:idCliente', function(req, res, next) {
  try {
    //web service
    clientesModelo.actualizarCliente(req).then(
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

// ELIMINAR CLIENTES - EXPORTANDO RUTA
router.delete('/eliminarCliente/:idCliente', function(req, res, next) {
  try {
    //web service
    clientesModelo.eliminarCliente(req).then(
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
