var express = require('express');
var router = express.Router();
var loginModelo = require('../modelo/loginModelo');


// AGREGAR ACCESOS- EXPORTANDO RUTA
router.post('/autenticarUsuarios', function(req, res, next) {
  try {
    //web service
    loginModelo.autenticarUsuarios(req).then(
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
