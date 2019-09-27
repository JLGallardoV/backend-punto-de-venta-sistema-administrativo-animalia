/*WEB SERVICE --LISTAR LAS VENTAS DE LOS VENDEDORES--*/
exports.listarVentasVendedores = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //CUANTAS VENTAS HIZO TAL VENDEDOR
        var query = 'SELECT transacciones.idTransaccion, vendedores.nombreVendedor, count(*) AS vendidos FROM transacciones INNER JOIN vendedores ON transacciones.idVendedor = vendedores.idVendedor group by nombreVendedor order by vendidos DESC;';

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
} //fin listarVentasVendedores
