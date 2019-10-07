var express = require('express');
var router = express.Router();
var accesosModelo = require('../modelo/accesosModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR ACCESOS- EXPORTANDO RUTA
router.get('/listarAccesos', function(req, res, next) {
  try {
    //web service
    accesosModelo.listarAccesos(req).then(
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

// AGREGAR ACCESOS- EXPORTANDO RUTA
router.post('/agregarAcceso', function(req, res, next) {
  try {
    //web service
    accesosModelo.agregarAcceso(req).then(
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
