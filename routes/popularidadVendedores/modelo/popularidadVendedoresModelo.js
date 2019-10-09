/*
ESTRUCTURA RESPUESTA MODELO
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*
CONDICIONALES POPULARIDAD PRODUCTO
1 - 20: Malo
21 - 40: bueno
+41: excelente
*/



/*WEB SERVICE --LISTAR POPULARIDAD VENDEDORES--*/
exports.listarPopularidadVendedores = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    let inicioFechaTransacciones = req.params.inicioFechaTransacciones;
    let finalFechaTransacciones = req.params.finalFechaTransacciones;
    //conectar con la base de datos
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //REGRESA QUE TAN BUENO ES UN VENDEDOR SEGUN SUS VENTAS REALIZADAS EN UN PERIODO DETERMINADO
        var query = `SELECT vendedores.nombreVendedor, count(*) AS vendidos  FROM transacciones INNER JOIN vendedores ON transacciones.idVendedor = vendedores.idVendedor WHERE fechaTransaccion between '${inicioFechaTransacciones} 00:00:00' AND '${finalFechaTransacciones} 23:59:59' group by nombreVendedor order by vendidos DESC;`;

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
                respuesta: "No existen registros en ese rango de fechas"
              });
            } else if (success.length > 0) {
              /*definiendo segun sean las ventas de un vendedor, su popularidad*/
              for (var i = 0; i < success.length; i++) {
                if (success[i].vendidos > 0 && success[i].vendidos <= 20) {
                  success[i].vendidos = "malo"
                }
                if (success[i].vendidos > 20 && success[i].vendidos <= 40) {
                  success[i].vendidos = "bueno"
                }
                if (success[i].vendidos >= 41) {
                  success[i].vendidos = "excelente"
                }
              }

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
} //fin listarPopularidadVendedores
