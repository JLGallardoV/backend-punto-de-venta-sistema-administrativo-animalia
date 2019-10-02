var express = require('express');
var router = express.Router();
var categoriasModelo = require('../modelo/categoriasModelo');
var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');

// LISTAR CATEGORIAS - EXPORTANDO RUTA
router.get('/listarCategorias', jwt.verificarExistenciaToken, function(req, res, next) {
  try {
    console.log("entro 0 - inicio: ", req.token);

    jsonWebToken.verify(req.token, jwt.claveSecreta, function(error, success) {
          categoriasModelo.listarCategorias(req).then(
            (success) => {
              console.log("entro 4 - raro");
              res.json(success);
            },
            (error) => {
              console.log("entro 5 - error de listado");
              res.json({key:1});
              return next(error)
            }
          );
    });
  }catch (error) {
    return next(error);
  }
});

// AGREGAR CATEGORIA - EXPORTANDO RUTA
router.post('/agregarCategoria', function(req, res, next) {
  try {
    //web service
    categoriasModelo.agregarCategoria(req).then(
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


// ACTUALIZAR CATEGORIA - EXPORTANDO RUTA
router.put('/actualizarCategoria/:idCategoria', function(req, res, next) {
  try {
    //web service
    categoriasModelo.actualizarCategoria(req).then(
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

// ELIMINAR CATEGORIA - EXPORTANDO RUTA
router.delete('/eliminarCategoria/:idCategoria', function(req, res, next) {
  try {
    //web service
    categoriasModelo.eliminarCategoria(req).then(
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
