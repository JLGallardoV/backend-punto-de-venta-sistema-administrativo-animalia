var express = require('express');
var router = express.Router();
var categoriasModelo = require('../modelo/categoriasModelo');


// LISTAR CATEGORIAS - EXPORTANDO RUTA
router.get('/listarCategorias', function(req, res, next) {
  try {
    //web service
    categoriasModelo.listarCategorias(req).then(
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
