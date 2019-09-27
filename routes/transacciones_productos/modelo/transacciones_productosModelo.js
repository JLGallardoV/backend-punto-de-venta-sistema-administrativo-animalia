/*
ESTRUCTURA RESPUESTA MODELO
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*
CONDICIONALES POPULARIDAD PRODUCTO
1 - 20: Malo
21 - 40: bueno
+41: excelente
*/

/*WEB SERVICE --LISTAR RELACION TRANSACCIONES-PRODUCTOS--*/
exports.listarTransacciones_productos = function(req) {
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
        var query = 'SELECT transacciones_productos.idTransaccion, productos.nombreProducto, transacciones.fechaTransaccion FROM transacciones_productos INNER JOIN productos ON transacciones_productos.idProducto = productos.idProducto INNER JOIN transacciones ON transacciones_productos.idTransaccion = transacciones.idTransaccion;';

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

              /*definiendo segun sean las ventas del producto, su popularidad*/
              for (var i = 0; i < success.length; i++) {
                if (success[i].vendidos > 0 && success[i].vendidos <= 20) {
                  success[i].vendidos = "malo"
                }
                if (success[i].vendidos > 20 && success[i].vendidos <= 40) {
                  success[i].vendidos = "bueno"
                }
                if (success[i].vendidos > 41) {
                  success[i].vendidos = "excelente"
                }
              }

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


/*WEB SERVICE --AGREGAR RELACION TRANSACCIONES-PRODUCTOS---*/
exports.agregarTransaccion_producto = function(req) {
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
        let query = 'insert into transacciones_productos set ?';

        let requestBody = {
          idTransaccion: body.idTransaccion,
          idProducto: body.idProducto,
          numeroProductosEnTransaccion: body.numeroProductosEnTransaccion
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


/*WEB SERVICE --ACTUALIZAR RELACION TRANSACCIONES-PRODUCTOS--*/
exports.actualizarTransaccion_producto = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idTransaccion = req.params.idTransaccion;
    let idProducto = req.params.idProducto;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update transacciones_productos set ? where idTransaccion = ${idTransaccion} and idProducto = ${idProducto}`; //las comillas son diferentes

        let requestBody = {
          idTransaccion: body.idTransaccion,
          idProducto: body.idProducto,
          numeroProductosEnTransaccion: body.numeroProductosEnTransaccion
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


/*WEB SERVICE --ELIMINAR RELACION TRANSACCIONES-PRODUCTOS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarTransaccion_producto = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idTransaccion = req.params.idTransaccion;
    let idProducto = req.params.idProducto;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update transacciones_productos set ? where idTransaccion = ${idTransaccion} and idProducto = ${idProducto}`; //las comillas son diferentes

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
