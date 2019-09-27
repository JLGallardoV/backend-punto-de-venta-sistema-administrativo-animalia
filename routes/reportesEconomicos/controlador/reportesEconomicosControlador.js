var express = require('express');
var router = express.Router();
var reportesEconomicosModelo = require('../modelo/reportesEconomicosModelo');

// LISTAR REPORTE ECONOMICO - EXPORTANDO RUTA
router.get('/listarReportesEconomicos/:inicioFechaTransacciones/:finalFechaTransacciones/:inicioFechaCompras/:finalFechaCompras', function(req, res, next) {
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

module.exports = router;
