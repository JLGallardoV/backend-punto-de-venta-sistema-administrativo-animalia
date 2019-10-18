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
    let inicioFecha= req.params.inicioFecha;
    let finalFecha = req.params.finalFecha;
    //conectar con la base de datos
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `CALL reportes_procedimiento('${inicioFecha} 00:00:00','${finalFecha} 23:59:59')`;

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

              /*elimino el ultimo elemento (imprime success) que es un objeto nativo del procedure
              con esto solo muestro los resultados que quiero*/

              var resultado = [];
              for (var i = 0; i < success.length - 1; i++) {
                resultado[i] = success[i];
              }
              resolve({
                estatus: 1,
                respuesta: resultado
              });
            }
          }
        });
      }
    });
  });
} //fin listarReportesEconomicos
