/* INICIO - WS LISTAR DETALLE VENDEDOR*/
exports.listarDetalleVendedor = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let body = req.body;
    let idVendedor = req.params.idVendedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `
        SELECT idVendedor,nombreVendedor,ciudadVendedor,estadoVendedor,direccionVendedor,telefonoVendedor,emailVendedor,fechaNacimientoVendedor,rfcVendedor,numeroSeguroSocialVendedor,antiguedadVendedor
        FROM vendedores
        WHERE idVendedor = ${idVendedor} AND estatusBL = 1;
        `;

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
} //FIN - WS LISTAR DETALLE VENDEDOR
