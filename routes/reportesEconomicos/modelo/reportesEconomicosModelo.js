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
