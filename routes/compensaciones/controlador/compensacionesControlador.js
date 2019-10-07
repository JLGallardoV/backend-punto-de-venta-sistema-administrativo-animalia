var express = require('express');
var router = express.Router();
var compensacionesModelo = require('../modelo/compensacionesModelo');

//CABECERAS
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	next();
});

// LISTAR COMPENSACIONES - EXPORTANDO RUTA
router.get('/listarCompensaciones', function(req, res, next) {
  try {
    //web service
    compensacionesModelo.listarCompensaciones(req).then(
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

// AGREGAR COMPENSACIONES - EXPORTANDO RUTA
router.post('/agregarCompensacion', function(req, res, next) {
  try {
    //web service
    compensacionesModelo.agregarCompensacion(req).then(
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


// ACTUALIZAR COMPENSACIONES - EXPORTANDO RUTA
router.put('/actualizarCompensacion/:idCompensacion', function(req, res, next) {
  try {
    //web service
    compensacionesModelo.actualizarCompensacion(req).then(
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

// ELIMINAR COMPENSACIONES - EXPORTANDO RUTA
router.delete('/eliminarCompensacion/:idCompensacion', function(req, res, next) {
  try {
    //web service
    compensacionesModelo.eliminarCompensacion(req).then(
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
