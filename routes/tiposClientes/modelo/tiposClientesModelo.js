/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR TIPOS DE CLIENTES--*/
exports.listarTiposClientes = function(req) {
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
        var query = 'select idTipoCliente,tipoCliente,descripcionTipoCliente from tiposDeClientes where estatusBL = 1';

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
} //fin listarTiposClientes


/*WEB SERVICE --AGREGAR TIPOS DE CLIENTES---*/
exports.agregarTipoCliente = function(req) {
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
        let query = 'insert into tiposDeClientes set ?';

        let requestBody = {
          tipoCliente: body.tipoCliente,
          descripcionTipoCliente: body.descripcionTipoCliente
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
              respuesta: 'tipo de cliente dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarTipoCliente


/*WEB SERVICE --ACTUALIZAR TIPOS DE CLIENTES--*/
exports.actualizarTipoCliente = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idTipoCliente = req.params.idTipoCliente;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update tiposDeClientes set ? where idTipoCliente = ${idTipoCliente}`; //las comillas son diferentes

        let requestBody = {
          tipoCliente: body.tipoCliente,
          descripcionTipoCliente: body.descripcionTipoCliente
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
              respuesta: 'tipo de cliente actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarTipoCliente


/*WEB SERVICE --ELIMINAR TIPOS DE CLIENTES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarTipoCliente = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idTipoCliente = req.params.idTipoCliente;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update tiposDeClientes set ? where idTipoCliente = ${idTipoCliente}`; //las comillas son diferentes

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
              respuesta: 'tipo de cliente eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarTipoCliente
