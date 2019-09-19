var express = require('express');
var router = express.Router();
var reportesEconomicosModelo = require('../modelo/reportesEconomicosModelo');


// LISTAR REPORTE ECONOMICO - EXPORTANDO RUTA
router.get('/listarReportesEconomicos', function(req, res, next) {
  try {
    //web service
    reportesEconomicosModelo.listarReportesEconomicos(req).then(
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

// AGREGAR REPORTE ECONOMICO - EXPORTANDO RUTA
router.post('/agregarReporteEconomico', function(req, res, next) {
  try {
    //web service
    reportesEconomicosModelo.agregarReporteEconomico(req).then(
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


// ACTUALIZAR REPORTE ECONOMICO - EXPORTANDO RUTA
router.put('/actualizarReporteEconomico/:idReporteEconomico', function(req, res, next) {
  try {
    //web service
    reportesEconomicosModelo.actualizarReporteEconomico(req).then(
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

// ELIMINAR REPORTE ECONOMICO - EXPORTANDO RUTA
router.delete('/eliminarReporteEconomico/:idReporteEconomico', function(req, res, next) {
  try {
    //web service
    reportesEconomicosModelo.eliminarReporteEconomico(req).then(
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
