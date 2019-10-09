var express = require('express');
var router = express.Router();
var proveedoresModelo = require('../modelo/proveedoresModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR PROVEEDORES - EXPORTANDO RUTA
router.get('/listarProveedores', function(req, res, next) {
  try {
    //web service
    proveedoresModelo.listarProveedores(req).then(
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

// AGREGAR PROVEEDORES - EXPORTANDO RUTA
router.post('/agregarProveedor', function(req, res, next) {
  try {
    //web service
    proveedoresModelo.agregarProveedor(req).then(
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


// ACTUALIZAR PROVEEDORES - EXPORTANDO RUTA
router.put('/actualizarProveedor/:idProveedor', function(req, res, next) {
  try {
    //web service
    proveedoresModelo.actualizarProveedor(req).then(
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

// ELIMINAR PROVEEDORES - EXPORTANDO RUTA
router.delete('/eliminarProveedor/:idProveedor', function(req, res, next) {
  try {
    //web service
    proveedoresModelo.eliminarProveedor(req).then(
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
