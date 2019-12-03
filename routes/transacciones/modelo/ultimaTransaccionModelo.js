/* INICIO - WS LISTAR DETALLE TRANSACCION*/
exports.listarUltimaTransaccion = function(req) {
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
        //tenemos conexión
        var query = `SELECT transacciones.idTransaccion, transacciones.montoNoIvaTransaccion, transacciones.ivaTransaccion, transacciones.montoConIvaTransaccion,transacciones.pagoTransaccion,transacciones.cambioTransaccion,transacciones.fechaTransaccion,productos.nombreProducto,transacciones_productos.numeroProductosEnTransaccion,vendedores.nombreVendedor,clientes.nombreCliente,tiposDePagos.tipoPago
                      FROM transacciones
                      INNER JOIN transacciones_productos ON transacciones.idTransaccion = transacciones_productos.idTransaccion
                      INNER JOIN productos ON transacciones_productos.idProducto = productos.idProducto
                      INNER JOIN vendedores  ON transacciones.idVendedor = vendedores.idVendedor
                      INNER JOIN clientes  ON transacciones.idCliente = clientes.idCliente
                      INNER JOIN transacciones_tiposDePagos ON transacciones.idTransaccion = transacciones_tiposDePagos.idTransaccion
                      INNER JOIN tiposDePagos ON transacciones_tiposDePagos.idTipoPago = tiposDePagos.idTipoPago
                      WHERE transacciones.estatusBL = 1 order by idTransaccion DESC LIMIT 1;`;

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
} //FIN - WS LISTAR DETALLE TRANSACCION
