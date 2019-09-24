var express = require('express');
var router = express.Router();
var comprasModelo = require('../modelo/comprasModelo');

/*AÑADIENDO CABECERAS:*/
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	return next();
});

// LISTAR COMPRAS - EXPORTANDO RUTA
router.get('/listarCompras', function(req, res, next) {
  try {
    var acumularCompras = 0;
    comprasModelo.listarCompras(req).then(
      (success) => {
        res.json(success);

        //acumulando el recurso economico:
        for (var i = 0; i < success.respuesta.length; i++) {
          acumularCompras += success.respuesta[i].montoCompra
        }
        console.log("acumulado: ", acumularCompras);

      },
      (error) => {
        res.json(error);
      }
    );
  } catch (error) {
    return next(error);
  }
});

// AGREGAR COMPRAS - EXPORTANDO RUTA
router.post('/agregarCompra', function(req, res, next) {
  try {
    //web service
    comprasModelo.agregarCompra(req).then(
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


// ACTUALIZAR COMPRAS - EXPORTANDO RUTA
router.put('/actualizarCompra/:idCompra', function(req, res, next) {
  try {
    //web service
    comprasModelo.actualizarCompra(req).then(
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

// ELIMINAR COMPRAS - EXPORTANDO RUTA
router.delete('/eliminarCompra/:idCompra', function(req, res, next) {
  try {
    //web service
    comprasModelo.eliminarCompra(req).then(
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
