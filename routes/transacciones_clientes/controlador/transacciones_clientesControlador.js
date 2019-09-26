var express = require('express');
var router = express.Router();
var transacciones_clientesModelo = require('../modelo/transacciones_clientesModelo');


// LISTAR RELACION TRANSACCIONES - CLIENTES - EXPORTANDO RUTA
router.get('/listarTransacciones_clientes', function(req, res, next) {
  try {
    //web service
    transacciones_clientesModelo.listarTransacciones_clientes(req).then(
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

// AGREGAR RELACION TRANSACCIONES - CLIENTES - EXPORTANDO RUTA
router.post('/agregarTransaccion_cliente', function(req, res, next) {
  try {
    //web service
    transacciones_clientesModelo.agregarTransaccion_cliente(req).then(
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


// ACTUALIZAR RELACION TRANSACCIONES - CLIENTES - EXPORTANDO RUTA
router.put('/actualizarTransaccion_cliente/:idTransaccion/:idCliente', function(req, res, next) {
  try {
    //web service
    transacciones_clientesModelo.actualizarTransaccion_cliente(req).then(
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

// ELIMINAR RELACION TRANSACCIONES - CLIENTES - EXPORTANDO RUTA
router.delete('/eliminarTransaccion_cliente/:idTransaccion/:idCliente', function(req, res, next) {
  try {
    //web service
    transacciones_clientesModelo.eliminarTransaccion_cliente(req).then(
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
