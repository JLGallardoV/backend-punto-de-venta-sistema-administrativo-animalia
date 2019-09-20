/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR TIPOS DE USUARIOS--*/
exports.listarTiposUsuarios = function(req) {
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
        var query = 'select * from tiposDeUsuarios where estatusBL = 1';

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
} //fin listarTiposUsuarios


/*WEB SERVICE --AGREGAR TIPOS DE USUARIOS---*/
exports.agregarTipoUsuario = function(req) {
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
        let query = 'insert into tiposDeUsuarios set ?';

        let requestBody = {
          tipoUsuario: body.tipoUsuario,
          privilegiosTipoUsuario: body.privilegiosTipoUsuario
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
              respuesta: 'tipo de usuario dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarTipoUsuario


/*WEB SERVICE --ACTUALIZAR TIPOS DE USUARIOS--*/
exports.actualizarTipoUsuario = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idTipoUsuario = req.params.idTipoUsuario;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update tiposDeUsuarios set ? where idTipoUsuario = ${idTipoUsuario}`; //las comillas son diferentes

        let requestBody = {
          tipoUsuario: body.tipoUsuario,
          privilegiosTipoUsuario: body.privilegiosTipoUsuario
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
              respuesta: 'tipo de usuario actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarTipoUsuario


/*WEB SERVICE --ELIMINAR TIPOS DE USUARIOS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarTipoUsuario = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idTipoUsuario = req.params.idTipoUsuario;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update tiposDeUsuarios set ? where idTipoUsuario = ${idTipoUsuario}`; //las comillas son diferentes

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
              respuesta: 'tipo de usuario eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarTipoUsuario
