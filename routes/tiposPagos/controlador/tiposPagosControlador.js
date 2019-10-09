var express = require('express');
var router = express.Router();
var tiposPagosModelo = require('../modelo/tiposPagosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.get('/listarTiposPagos', function(req, res, next) {
  try {
    //web service
    tiposPagosModelo.listarTiposPagos(req).then(
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

// AGREGAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.post('/agregarTipoPago', function(req, res, next) {
  try {
    //web service
    tiposPagosModelo.agregarTipoPago(req).then(
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


// ACTUALIZAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.put('/actualizarTipoPago/:idTipoPago', function(req, res, next) {
  try {
    //web service
    tiposPagosModelo.actualizarTipoPago(req).then(
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

// ELIMINAR TIPOS DE PAGOS - EXPORTANDO RUTA
router.delete('/eliminarTipoPago/:idTipoPago', function(req, res, next) {
  try {
    //web service
    tiposPagosModelo.eliminarTipoPago(req).then(
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
