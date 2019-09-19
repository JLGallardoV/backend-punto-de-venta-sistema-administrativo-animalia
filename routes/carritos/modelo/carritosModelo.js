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
        //tenemos conexión
        var query = 'select * from carritos where estatusBL = 1';

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
        let query = `update carritos set ? where idCarrito = ${idCarrito}`; //las comillas son diferentes

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
