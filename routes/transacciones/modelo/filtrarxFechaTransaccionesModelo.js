/*WEB SERVICE FILTRAR TRANSACCIONES POR FECHA*/
exports.filtrarTransacciones = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let deFecha = req.params.deFecha;
    let aFecha = req.params.aFecha;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `SELECT (SELECT IFNULL(sum(montoConIvaTransaccion),0) from transacciones WHERE fechaTransaccion BETWEEN '${deFecha} 00:00:00' AND '${aFecha} 23:59:59') AS montoVentas`;

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
} //fin filtrarTransaccion
