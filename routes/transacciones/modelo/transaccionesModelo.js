/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR TRANSACCIONES--*/
exports.listarTransacciones = function(req) {
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
        var query = 'SELECT transacciones_productos.idTransaccion, productos.nombreProducto, transacciones.montoConIvaTransaccion, transacciones.fechaTransaccion, transacciones_productos.numeroProductosEnTransaccion, vendedores.nombreVendedor, clientes.nombreCliente FROM transacciones_productos INNER JOIN productos ON transacciones_productos.idProducto = productos.idProducto INNER JOIN transacciones ON transacciones_productos.idTransaccion = transacciones.idTransaccion INNER JOIN vendedores ON transacciones.idTransaccion = vendedores.idVendedor INNER JOIN transacciones_clientes ON transacciones_productos.idTransaccion = transacciones_clientes.idTransaccion INNER JOIN clientes ON transacciones_clientes.idCliente = clientes.idCliente;';

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
} //fin listarTransacciones


/*WEB SERVICE --AGREGAR TRANSACCIONES---*/
exports.agregarTransaccion = function(req) {
  //regresaremos una promesa
  console.log("agregando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar*/
    let body = req.body;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {

        let montoNoIvaTransaccion = body.montoNoIvaTransaccion;
        let ivaTransaccion = body.ivaTransaccion;
        let montoConIvaTransaccion = body.montoConIvaTransaccion;
        let idVendedor = body.idVendedor;
        let idTipoPago = body.idTipoPago;
        let idTransaccion = body.idTransaccion;
        let idProducto = body.idProducto;
        let numeroProductosEnTransaccion = body.numeroProductosEnTransaccion;
        let idCliente = body.idCliente;

        let query = `CALL transaccionCompleta_procedimiento('${montoNoIvaTransaccion}','${ivaTransaccion}','${montoConIvaTransaccion}','${idVendedor}','${idTipoPago}','${idTransaccion}','${idProducto}','${numeroProductosEnTransaccion}','${idCliente}');`;

        database.query(query, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'transaccion dada de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarTransaccion


/*WEB SERVICE --ACTUALIZAR TRANSACCIONES--*/
exports.actualizarTransaccion = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idTransaccion = req.params.idTransaccion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update transacciones set ? where idTransaccion = ${idTransaccion}`; //las comillas son diferentes

        let requestBody = {
          montoNoIvaTransaccion: body.montoNoIvaTransaccion,
          ivaTransaccion: body.ivaTransaccion,
          montoConIvaTransaccion: body.montoConIvaTransaccion,
          cantidadTransaccion: body.cantidadTransaccion,
          idVendedor: body.idVendedor,
          idTipoPago: body.idTipoPago
        };

        database.query(query, requestBody, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'transaccion actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarTransaccion


/*WEB SERVICE --ELIMINAR TRANSACCIONES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarTransaccion = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idTransaccion = req.params.idTransaccion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update transacciones set ? where idTransaccion = ${idTransaccion}`; //las comillas son diferentes

        let requestBody = {
          estatusBL: 0,
        };

        database.query(query, requestBody, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'transaccion eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarTransaccion
