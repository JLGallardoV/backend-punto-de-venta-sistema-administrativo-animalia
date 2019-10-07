/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR CATEGORIAS--*/
exports.listarCategorias = function(req) {
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
        var query = 'SELECT idCategoria,nombreCategoria,subCategoria,descripcionCategoria FROM categorias WHERE estatusBL = 1;';

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
} //fin listarCategorias


/*WEB SERVICE --AGREGAR CATEGORIA---*/
exports.agregarCategoria = function(req) {
  //regresaremos una promesa
  console.log("agregando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar una nueva categoria*/
    let body = req.body;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = 'insert into categorias set ?';

        let requestBody = {
          nombreCategoria: body.nombreCategoria,
          subCategoria: body.subCategoria,
          descripcionCategoria: body.descripcionCategoria
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
              respuesta: 'categoria de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarCategoria


/*WEB SERVICE --ACTUALIZAR CATEGORIA--*/
exports.actualizarCategoria = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar una nueva categoria*/
    let body = req.body;
    let idCategoria = req.params.idCategoria;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update categorias set ? where idCategoria = ${idCategoria}`; //las comillas son diferentes

        let requestBody = {
          nombreCategoria: body.nombreCategoria,
          subCategoria: body.subCategoria,
          descripcionCategoria: body.descripcionCategoria
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
              respuesta: 'categoria actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarCategoria


/*WEB SERVICE --ELIMINAR CATEGORIA-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarCategoria = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar una nueva categoria*/
    let idCategoria = req.params.idCategoria;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update categorias set ? where idCategoria = ${idCategoria}`; //las comillas son diferentes

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
              respuesta: 'categoria eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarCategoria
