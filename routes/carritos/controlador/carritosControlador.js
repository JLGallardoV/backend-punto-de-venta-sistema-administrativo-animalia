var express = require('express');
var router = express.Router();
var carritosModelo = require('../modelo/carritosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});


//LISTAR CARRITOS - EXPORTANDO RUTA
router.get('/listarCarritos', function(req, res, next) {
  try {
    //web service
    carritosModelo.listarCarritos(req).then(
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

//LISTAR CARRITOS SEGUN USUARIO- EXPORTANDO RUTA
router.get('/listarCarritoUsuario/:idCliente', function(req, res, next) {
  try {
    //web service
    carritosModelo.listarCarritoUsuario(req).then(
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

//AGREGAR CARRITOS - EXPORTANDO RUTA
router.post('/agregarCarrito', function(req, res, next) {
  try {
    //web service
    carritosModelo.agregarCarrito(req).then(
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


//ACTUALIZAR CARRITOS - EXPORTANDO RUTA
router.put('/actualizarCarrito/:idCarrito', function(req, res, next) {
  try {
    //web service
    carritosModelo.actualizarCarrito(req).then(
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

//ELIMINAR CARRITOS - EXPORTANDO RUTA
router.delete('/eliminarCarrito/:idCarrito', function(req, res, next) {
  try {
    //web service
    carritosModelo.eliminarCarrito(req).then(
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
