var express = require('express');
var router = express.Router();
var detalleProveedorModelo = require('../modelo/detalleProveedorModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


// LISTAR PROVEEDOR - EXPORTANDO RUTA
router.get('/listarDetalleProveedor/:idProveedor', function(req, res, next) {
  try {
    //web service
    detalleProveedorModelo.listarDetalleProveedor(req).then(
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
