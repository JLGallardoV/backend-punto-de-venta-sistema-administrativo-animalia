/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR DETALLES TRANSACCIONES--*/
exports.listarDetallesTransacciones = function(req) {
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
        var query = 'select * from detallesTransacciones where estatusBL = 1';

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
} //fin listarDetallesTransaccion


/*WEB SERVICE --AGREGAR DETALLES TRANSACCIONES---*/
exports.agregarDetalleTransaccion = function(req) {
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

        let query = 'insert into detallesTransacciones set ?';

        let requestBody = {
          ciudadDetalleTransaccion: body.ciudadDetalleTransaccion,
          estadoDetalleTransaccion: body.estadoDetalleTransaccion,
          paisDetalleTransaccion: body.paisDetalleTransaccion,
          observacionesDetalleTransaccion: body.observacionesDetalleTransaccion,
          idTransaccion: body.idTransaccion,
          idMedioEntrega: body.idMedioEntrega
        };

        database.query(query,requestBody, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'detalle transaccion dada de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarDetalleTransaccion


/*WEB SERVICE --ACTUALIZAR DETALLES TRANSACCIONES--*/
exports.actualizarDetalleTransaccion = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idDetalleTransaccion = req.params.idDetalleTransaccion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update detallesTransacciones set ? where idDetalleTransaccion = ${idDetalleTransaccion}`; //las comillas son diferentes

        let requestBody = {
          ciudadDetalleTransaccion: body.ciudadDetalleTransaccion,
          estadoDetalleTransaccion: body.estadoDetalleTransaccion,
          paisDetalleTransaccion: body.paisDetalleTransaccion,
          observacionesDetalleTransaccion: body.observacionesDetalleTransaccion,
          idTransaccion: body.idTransaccion,
          idMedioEntrega: body.idMedioEntrega
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
              respuesta: 'detalle transaccion actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarDetalleTransaccion


/*WEB SERVICE --ELIMINAR DETALLES TRANSACCIONES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarDetalleTransaccion = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idDetalleTransaccion = req.params.idDetalleTransaccion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update detallesTransacciones set ? where idDetalleTransaccion = ${idDetalleTransaccion}`; //las comillas son diferentes

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
              respuesta: 'detalle transaccion eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarDetalleTransaccion
