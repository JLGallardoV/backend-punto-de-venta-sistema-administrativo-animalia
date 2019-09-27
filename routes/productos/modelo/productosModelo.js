/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/
/*WEB SERVICE --LISTAR PRODUCTOS--*/
exports.listarProductos = function(req) {
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
        var query = 'select * from productos where estatusBL = 1';

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
} //fin listarProductos


/*WEB SERVICE --AGREGAR PRODUCTOS---*/
exports.agregarProducto = function(req) {
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
        let query = 'insert into productos set ?';

        let requestBody = {
          nombreProducto: body.nombreProducto,
          detalleProducto: body.detalleProducto,
          contenidoProducto: body.contenidoProducto,
          fechaCaducidadProducto: body.fechaCaducidadProducto,
          paisOrigenProducto: body.paisOrigenProducto,
          stockProducto: body.stockProducto,
          puntosProducto: body.puntosProducto,
          precioUnitarioProducto: body.precioUnitarioProducto,
          precioMayoreoProducto: body.precioMayoreoProducto,
          idCategoria: body.idCategoria,
          idAlmacen: body.idAlmacen
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
              respuesta: 'producto dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarProducto


/*WEB SERVICE --ACTUALIZAR PRODUCTOS--*/
exports.actualizarProducto = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idProducto = req.params.idProducto;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update productos set ? where idProducto = ${idProducto}`; //las comillas son diferentes

        let requestBody = {
          nombreProducto: body.nombreProducto,
          detalleProducto: body.detalleProducto,
          contenidoProducto: body.contenidoProducto,
          fechaCaducidadProducto: body.fechaCaducidadProducto,
          paisOrigenProducto: body.paisOrigenProducto,
          stockProducto: body.stockProducto,
          puntosProducto: body.puntosProducto,
          precioUnitarioProducto: body.precioUnitarioProducto,
          precioMayoreoProducto: body.precioMayoreoProducto,
          idCategoria: body.idCategoria,
          idAlmacen: body.idAlmacen
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
              respuesta: 'producto actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarProducto


/*WEB SERVICE --ELIMINAR PRODUCTOS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarProducto = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idProducto = req.params.idProducto;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update productos set ? where idProducto = ${idProducto}`; //las comillas son diferentes

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
              respuesta: 'producto eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarProducto
