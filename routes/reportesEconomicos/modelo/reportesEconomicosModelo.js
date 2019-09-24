/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR REPORTES ECONOMICOS--*/
exports.listarReportesEconomicos = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    let inicioFechaTransacciones = req.params.inicioFechaTransacciones;
    let finalFechaTransacciones = req.params.finalFechaTransacciones;
    let inicioFechaCompras = req.params.inicioFechaCompras;
    let finalFechaCompras = req.params.finalFechaCompras;
    //conectar con la base de datos
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `SELECT ((SELECT IFNULL(SUM(montoConIvaTransaccion),0) FROM transacciones WHERE fechaTransaccion BETWEEN '${inicioFechaTransacciones} 00:00:00' AND '${finalFechaTransacciones} 23:59:59') - (SELECT IFNULL(SUM(montoCompra),0) FROM compras WHERE fechaCompra BETWEEN '${inicioFechaCompras} 00:00:00' AND '${finalFechaCompras} 23:59:59')) AS utilidad;`;

        //ejecutamos el query
        database.query(query, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            //validar que venga vacío
            if (success.length == 0) {
              resolve({
                estatus: 0,
                respuesta: success
              });
            } else if (success.length > 0) {
              resolve({
                estatus: 1,
                respuesta: success
              });
            }
          }
        });
      }
    });
  });
} //fin listarReportesEconomicos


/*WEB SERVICE --AGREGAR REPORTE ECONOMICO---*/
exports.agregarReporteEconomico = function(req) {
  //regresaremos una promesa
  console.log("agregando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar*/
    let body = req.body;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = 'insert into reportesEconomicos set ?';

        let requestBody = {
          montoCompras: body.montoCompras,
          montoVentas: body.montoVentas,
          diferencia: body.diferencia
        };

        database.query(query, requestBody, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'reporte economico dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarReporteEconomico


/*WEB SERVICE --ACTUALIZAR REPORTE ECONOMICO--*/
exports.actualizarReporteEconomico = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idReporteEconomico = req.params.idReporteEconomico;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update reportesEconomicos set ? where idReporteEconomico = ${idReporteEconomico}`; //las comillas son diferentes

        let requestBody = {
          montoCompras: body.montoCompras,
          montoVentas: body.montoVentas,
          diferencia: body.diferencia
        };

        database.query(query, requestBody, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'reporte economico actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarReporteEconomico


/*WEB SERVICE --ELIMINAR REPORTE ECONOMICO-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarReporteEconomico = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idReporteEconomico = req.params.idReporteEconomico;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update reportesEconomicos set ? where idReporteEconomico = ${idReporteEconomico}`; //las comillas son diferentes

        let requestBody = {
          estatusBL: 0,
        };

        database.query(query, requestBody, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'reporte economico eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarReporteEconomico
