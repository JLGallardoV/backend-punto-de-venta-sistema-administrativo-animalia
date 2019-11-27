/* INICIO - WS LISTAR DETALLE PROVEEDOR*/
exports.listarDetalleProveedor = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let body = req.body;
    let idProveedor = req.params.idProveedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `
        SELECT idProveedor,nombreProveedor,ciudadProveedor,estadoProveedor,paisProveedor,direccionProveedor,telefonoProveedor,emailProveedor,descripcionProveedor,fechaActualizacionProveedor
        FROM proveedores
        WHERE idProveedor = ${idProveedor} AND estatusBL = 1
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
} //FIN - WS LISTAR DETALLE PROVEEDOR
