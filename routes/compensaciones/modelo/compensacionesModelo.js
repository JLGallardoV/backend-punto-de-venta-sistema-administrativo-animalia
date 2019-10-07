/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR COMPENSACIONES--*/
exports.listarCompensaciones = function(req) {
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
        var query = 'select idCompensacion,tipoCompensacion,descripcionCompensacion from compensaciones where estatusBL = 1';

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
} //fin listarCompensaciones


/*WEB SERVICE --AGREGAR COMPENSACIONES---*/
exports.agregarCompensacion = function(req) {
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
        let query = 'insert into compensaciones set ?';

        let requestBody = {
          tipoCompensacion: body.tipoCompensacion,
          descripcionCompensacion: body.descripcionCompensacion
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
              respuesta: 'compensacion dada de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarCompensacion


/*WEB SERVICE --ACTUALIZAR COMPENSACIONES--*/
exports.actualizarCompensacion = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idCompensacion = req.params.idCompensacion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update compensaciones set ? where idCompensacion = ${idCompensacion}`; //las comillas son diferentes

        let requestBody = {
          tipoCompensacion: body.tipoCompensacion,
          descripcionCompensacion: body.descripcionCompensacion
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
              respuesta: 'compensacion actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarCompensacion


/*WEB SERVICE --ELIMINAR COMPENSACIONES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarCompensacion = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idCompensacion = req.params.idCompensacion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update compensaciones set ? where idCompensacion = ${idCompensacion}`; //las comillas son diferentes

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
              respuesta: 'compensacion eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarCompensacion
