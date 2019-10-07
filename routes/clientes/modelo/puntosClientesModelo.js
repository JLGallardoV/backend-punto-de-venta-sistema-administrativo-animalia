
/*WEB SERVICE --LISTAR CLIENTES--*/
exports.listarPuntosClientes = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let inicioFechaTransacciones = req.params.inicioFechaTransacciones;
    let finalFechaTransacciones = req.params.finalFechaTransacciones;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        /*ENTREGA LOS PUNTOS ACUMULADOS DE CADA CLIENTE*/
        var query = 'SELECT transacciones_clientes.idCliente, clientes.nombreCliente,SUM(productos.puntosProducto * transacciones_productos.numeroProductosEnTransaccion) AS puntosTotales FROM transacciones_clientes INNER JOIN clientes ON transacciones_clientes.idCliente = clientes.idCliente INNER JOIN productos ON transacciones_clientes.idTransaccion = productos.idProducto INNER JOIN transacciones_productos ON transacciones_clientes.idTransaccion = transacciones_productos.idTransaccion group by nombreCliente;';

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
} //fin listarNumeroComprasClientes
