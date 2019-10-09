/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR CLIENTES--*/
exports.listarClientes = function(req) {
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
        //listando clientes
        var query = 'SELECT clientes.idCliente,clientes.nombreCliente,clientes.apellidoPaternoCliente,clientes.apellidoMaternoCliente,clientes.ciudadCliente,clientes.estadoCliente,clientes.paisCliente,clientes.direccionCliente,clientes.coloniaCliente,clientes.cpCliente,clientes.telefonoCliente,clientes.emailCliente,clientes.puntuajeCliente,tiposDeClientes.tipoCliente FROM clientes INNER JOIN tiposDeClientes ON clientes.idTipoCliente = tiposDeClientes.idTipoCliente WHERE clientes.estatusBL = 1;';

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
} //fin listarClientes


/*WEB SERVICE --AGREGAR CLIENTES---*/
exports.agregarCliente = function(req) {
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
        let nombreCliente = body.nombreCliente;
        let emailCliente = body.emailCliente;

        var query = `select * from clientes where (nombreCliente ='${nombreCliente}' or emailCliente='${emailCliente}') and  estatusBL = 1`;
        database.query(query,function(error,success){

          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          }
          if(success.length == 0) {
            let query = 'insert into clientes set ?';

            let requestBody = {
              nombreCliente: body.nombreCliente,
              apellidoPaternoCliente: body.apellidoPaternoCliente,
              apellidoMaternoCliente: body.apellidoMaternoCliente,
              ciudadCliente: body.ciudadCliente,
              estadoCliente: body.estadoCliente,
              paisCliente: body.paisCliente,
              direccionCliente: body.direccionCliente,
              coloniaCliente: body.coloniaCliente,
              cpCliente: body.cpCliente,
              telefonoCliente: body.telefonoCliente,
              emailCliente: body.emailCliente,
              contraseniaCliente: body.contraseniaCliente,
              puntuajeCliente: body.puntuajeCliente,
              idTipoCliente: body.idTipoCliente
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
                  respuesta: 'cliente dado de alta correctamente'
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
} //fin agregarCliente


/*WEB SERVICE --ACTUALIZAR CLIENTES--*/
exports.actualizarCliente = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idCliente = req.params.idCliente;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update clientes set ? where idCliente = ${idCliente}`; //las comillas son diferentes

        let requestBody = {
          nombreCliente: body.nombreCliente,
          apellidoPaternoCliente: body.apellidoPaternoCliente,
          apellidoMaternoCliente: body.apellidoMaternoCliente,
          ciudadCliente: body.ciudadCliente,
          estadoCliente: body.estadoCliente,
          paisCliente: body.paisCliente,
          direccionCliente: body.direccionCliente,
          coloniaCliente: body.coloniaCliente,
          cpCliente: body.cpCliente,
          telefonoCliente: body.telefonoCliente,
          emailCliente: body.emailCliente,
          contraseniaCliente: body.contraseniaCliente,
          puntuajeCliente: body.puntuajeCliente,
          idTipoCliente: body.idTipoCliente
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
              respuesta: 'cliente actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarCliente


/*WEB SERVICE --ELIMINAR CLIENTES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarCliente = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idCliente = req.params.idCliente;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update clientes set ? where idCliente = ${idCliente}`; //las comillas son diferentes

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
              respuesta: 'cliente eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarCliente
