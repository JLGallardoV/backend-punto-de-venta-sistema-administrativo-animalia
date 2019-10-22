/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/
/*WEB SERVICE --LISTAR CARRITOS--*/
exports.listarCarritos = function(req) {
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
        //listando todos los carritos con sus respectivos atributos
        var query = 'SELECT carritos.idCarrito, carritos.numeroProductosCarrito, carritos.montoTotalCarrito, clientes.nombreCliente FROM carritos INNER JOIN clientes ON carritos.idCliente = clientes.idCliente WHERE carritos.estatusBL = 1;';

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
} //fin listarCarritos


/*WEB SERVICE --LISTAR CARRITOS SEGUN SU USUARIO--*/
exports.listarCarritoUsuario = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let idCliente = req.params.idCliente;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `SELECT montoTotalCarrito, numeroProductosCarrito FROM carritos WHERE idCliente = ${idCliente};`;

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
} //fin listarCarritoUsuario


/*WEB SERVICE --AGREGAR CARRITOS---*/
exports.agregarCarrito = function(req) {
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
        let idCliente = body.idCliente;
        var query = `select * from carritos where idCliente ='${idCliente}' and  estatusBL = 1`;
        database.query(query,function(error,success){
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          }

          if(success.length == 0) {
            let query = 'insert into carritos set ?';

            let requestBody = {
              numeroProductosCarrito: body.numeroProductosCarrito,
              montoTotalCarrito: body.montoTotalCarrito,
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
                  respuesta: 'carrito dado de alta correctamente'
                });
              }
            });
          }else {
            reject({
              estatus: -1,
              respuesta: 'Ese cliente ya tiene un carrito, intenta nuevamente'
            });
          }
        });
      }
    });
  });
} //fin agregarCarrito


/*WEB SERVICE --ACTUALIZAR CARRITOS--*/
exports.actualizarCarrito = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idCarrito = req.params.idCarrito;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {

        let numeroProductosCarrito = body.numeroProductosCarrito;
        let montoTotalCarrito = body.montoTotalCarrito;

        let query = `update carritos set numeroProductosCarrito = '${numeroProductosCarrito}', montoTotalCarrito = '${montoTotalCarrito}', fechaActualizacionCarrito = now() where idCarrito = ${idCarrito}`; //las comillas son diferentes


        database.query(query, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'carrito actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarCarrito


/*WEB SERVICE --ELIMINAR CARRITOS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarCarrito = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idCarrito = req.params.idCarrito;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update carritos set ? where idCarrito = ${idCarrito}`; //las comillas son diferentes

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
              respuesta: 'carrito eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarCarrito
