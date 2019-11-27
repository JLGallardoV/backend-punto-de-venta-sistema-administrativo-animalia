/* INICIO - WS LISTAR DETALLE CLIENTE*/
exports.listarDetalleCliente = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let body = req.body;
    let idCliente = req.params.idCliente;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `
        SELECT clientes.idCliente,clientes.nombreCliente,clientes.apellidoPaternoCliente,clientes.apellidoMaternoCliente,clientes.ciudadCliente,clientes.estadoCliente,clientes.paisCliente,clientes.direccionCliente,clientes.coloniaCliente,clientes.cpCliente,clientes.telefonoCliente,clientes.emailCliente,clientes.puntuajeCliente,tiposDeClientes.tipoCliente
        FROM clientes
        INNER JOIN tiposDeClientes ON clientes.idTipoCliente = tiposDeClientes.idTipoCliente
        WHERE clientes.idCliente = ${idCliente} AND clientes.estatusBL = 1;
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
} //FIN - WS LISTAR DETALLE CLIENTE
