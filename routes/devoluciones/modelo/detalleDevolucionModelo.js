/* INICIO - WS LISTAR DETALLE DEVOLUCION*/
exports.listarDetalleDevolucion = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let body = req.body;
    let idDevolucion = req.params.idDevolucion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `
        SELECT devoluciones.idDevolucion,productos.nombreProducto,devoluciones.fechaDevolucion,devoluciones.motivoDevolucion,clientes.nombreCliente,tiposDeProblemas.tipoProblema,compensaciones.tipoCompensacion,devoluciones.idTransaccion
        FROM devoluciones
        INNER JOIN clientes ON devoluciones.idCliente = clientes.idCliente
        INNER JOIN compensaciones ON devoluciones.idCompensacion = compensaciones.idCompensacion
        INNER JOIN productos ON devoluciones.idProducto = productos.idProducto
        INNER JOIN tiposDeProblemas ON devoluciones.idTipoProblema = tiposDeProblemas.idTipoProblema
        WHERE idDevolucion = ${idDevolucion};
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
} //FIN - WS LISTAR DETALLE DEVOLUCION
