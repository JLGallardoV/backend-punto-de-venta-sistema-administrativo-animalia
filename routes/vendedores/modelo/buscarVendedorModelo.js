/*WEB SERVICE --BUSCAR VENDEDOR X NOMBRE--*/
exports.buscarVendedor = function(req) {
  console.log("Buscando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let body = req.body;
    let nombreVendedor = req.params.nombreVendedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
         var query = `SELECT vendedores.idVendedor, vendedores.nombreVendedor
                      FROM vendedores
                      WHERE nombreVendedor = '${nombreVendedor}';`;

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
} //fin buscarVendedor
