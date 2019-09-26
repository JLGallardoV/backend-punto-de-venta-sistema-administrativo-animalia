/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR RELACION TRANSACCIONES-CLIENTES--*/
exports.listarTransacciones_clientes = function(req) {
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
        var query = 'SELECT * FROM transacciones_clientes WHERE estatusBL = 1';

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
} //fin listarRelacion


/*WEB SERVICE --AGREGAR RELACION TRANSACCIONES-CLIENTES---*/
exports.agregarTransaccion_cliente = function(req) {
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
        let query = 'insert into transacciones_clientes set ?';

        let requestBody = {
          idTransaccion: body.idTransaccion,
          idCliente: body.idCliente,
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
              respuesta: 'relacion dada de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarRelacion


/*WEB SERVICE --ACTUALIZAR RELACION TRANSACCIONES-CLIENTES--*/
exports.actualizarTransaccion_cliente = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idTransaccion = req.params.idTransaccion;
    let idCliente = req.params.idCliente;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update transacciones_clientes set ? where idTransaccion = ${idTransaccion} and idCliente = ${idCliente}`; //las comillas son diferentes

        let requestBody = {
          idTransaccion: body.idTransaccion,
          idCliente: body.idCliente
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
              respuesta: 'relacion actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarRelacion


/*WEB SERVICE --ELIMINAR RELACION TRANSACCIONES-CLIENTES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarTransaccion_cliente = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idTransaccion = req.params.idTransaccion;
    let idCliente = req.params.idCliente;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update transacciones_clientes set ? where idTransaccion = ${idTransaccion} and idCliente = ${idCliente}`; //las comillas son diferentes

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
              respuesta: 'relacion eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarRelacion
