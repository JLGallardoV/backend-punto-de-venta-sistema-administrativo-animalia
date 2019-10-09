/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR USUARIOS--*/
exports.listarUsuarios = function(req) {
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
        var query = 'SELECT usuarios.idUsuario, usuarios.nombreUsuario, usuarios.emailUsuario, usuarios.idVendedor, tiposDeUsuarios.tipoUsuario FROM usuarios INNER JOIN tiposDeUsuarios ON usuarios.idTipoUsuario = tiposDeUsuarios.idTipoUsuario';

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
} //fin listarUsuarios


/*WEB SERVICE --AGREGAR USUARIOS---*/
exports.agregarUsuario = function(req) {
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
        let nombreUsuario = body.nombreUsuario;
        let contraseniaUsuario = body.contraseniaUsuario;

        var query = `select * from usuarios where nombreUsuario ='${nombreUsuario}' and  estatusBL = 1`;
        database.query(query, function(error, success){

          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          }
          if(success.length == 0) {
            let query = 'insert into usuarios set ?';

            let requestBody = {
              nombreUsuario: body.nombreUsuario,
              emailUsuario: body.emailUsuario,
              contraseniaUsuario: body.contraseniaUsuario,
              idVendedor: body.idVendedor,
              idTipoUsuario: body.idTipoUsuario
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
                  respuesta: 'usuario dado de alta correctamente'
                });
              }
            });
          }else {
            reject({
              estatus: -1,
              respuesta: 'usuario duplicado, intenta nuevamente'
            });
          }
        });
      }
    });
  });
} //fin agregarUsuario


/*WEB SERVICE --ACTUALIZAR USUARIOS--*/
exports.actualizarUsuario = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idUsuario = req.params.idUsuario;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update usuarios set ? where idUsuario = ${idUsuario}`; //las comillas son diferentes

        let requestBody = {
          nombreUsuario: body.nombreUsuario,
          emailUsuario: body.emailUsuario,
          contraseniaUsuario: body.contraseniaUsuario,
          idVendedor: body.idVendedor,
          idTipoUsuario: body.idTipoUsuario
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
              respuesta: ' de usuario actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarUsuario


/*WEB SERVICE --ELIMINAR USUARIOS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarUsuario = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idUsuario = req.params.idUsuario;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update usuarios set ? where idUsuario = ${idUsuario}`; //las comillas son diferentes

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
              respuesta: ' de usuario eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarUsuario
