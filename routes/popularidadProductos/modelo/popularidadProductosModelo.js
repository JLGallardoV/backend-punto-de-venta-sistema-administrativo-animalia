/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR POPULARIDAD PRODUCTOS--*/
exports.listarPopularidadProductos = function(req) {
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
        var query = 'select * from popularidadProductos where estatusBL = 1';

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
} //fin listarPopularidadProductos


/*WEB SERVICE --AGREGAR POPULARIDAD PRODUCTOS---*/
exports.agregarPopularidadProducto = function(req) {
  //regresaremos una promesa
  console.log("agregando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar popularidadProductos*/
    let body = req.body;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = 'insert into popularidadProductos set ?';

        let requestBody = {
          popularidadProducto: body.popularidadProducto,
          descripcionPopularidadProducto: body.descripcionPopularidadProducto,
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
              respuesta: 'popularidadProducto de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarCategoria


/*WEB SERVICE --ACTUALIZAR POPULARIDAD PRODUCTOS--*/
exports.actualizarPopularidadProducto = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar una nueva categoria*/
    let body = req.body;
    let idPopularidadProducto = req.params.idPopularidadProducto;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update popularidadProductos set ? where idPopularidadProducto = ${idPopularidadProducto}`; //las comillas son diferentes

        let requestBody = {
          popularidadProducto: body.popularidadProducto,
          descripcionPopularidadProducto: body.descripcionPopularidadProducto,
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
              respuesta: 'popularidadProducto actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarPopularidadProducto


/*WEB SERVICE --ELIMINAR POPULARIDAD PRODUCTOS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarPopularidadProducto = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro de popularidadProductos*/
    let idPopularidadProducto = req.params.idPopularidadProducto;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update popularidadProductos set ? where idPopularidadProducto = ${idPopularidadProducto}`; //las comillas son diferentes

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
              respuesta: 'popularidadProducto eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarPopularidadProducto
