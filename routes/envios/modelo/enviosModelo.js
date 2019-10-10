/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR ENVIOS--*/
exports.listarEnvios = function(req) {
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
        var query = 'SELECT envios.idEnvio, envios.ciudadEnvio, envios.estadoEnvio, envios.paisEnvio, envios.observacionesEnvio, envios.fechaEnvio, envios.idTransaccion, mediosDeEntrega.viaMedioEntrega FROM envios INNER JOIN mediosDeEntrega ON envios.idMedioEntrega = mediosDeEntrega.idMedioEntrega;';

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
} //fin listarEnvios


/*WEB SERVICE --AGREGAR ENVIOS---*/
exports.agregarEnvio = function(req) {
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

        let query = 'insert into envios set ?';

        let requestBody = {
          ciudadEnvio: body.ciudadEnvio,
          estadoEnvio: body.estadoEnvio,
          paisEnvio: body.paisEnvio,
          observacionesEnvio: body.observacionesEnvio,
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
              respuesta: 'envio dada de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarEnvio


/*WEB SERVICE --ACTUALIZAR ENVIOS--*/
exports.actualizarEnvio = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idEnvio = req.params.idEnvio;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update envios set ? where idEnvio = ${idEnvio}`; //las comillas son diferentes

        let requestBody = {
          ciudadEnvio: body.ciudadEnvio,
          estadoEnvio: body.estadoEnvio,
          paisEnvio: body.paisEnvio,
          observacionesEnvio: body.observacionesEnvio,
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
              respuesta: 'envio actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarEnvio


/*WEB SERVICE --ELIMINAR ENVIOS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarEnvio = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idEnvio = req.params.idEnvio;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update envios set ? where idEnvio = ${idEnvio}`; //las comillas son diferentes

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
              respuesta: 'envio eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarEnvio
