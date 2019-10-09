/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR TIPOS DE PROBLEMAS--*/
exports.listarTiposProblemas = function(req) {
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
        var query = 'select idTipoProblema,tipoProblema FROM tiposDeProblemas where estatusBL = 1';

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
} //fin listarTiposProblemas


/*WEB SERVICE --AGREGAR TIPOS DE PROBLEMAS---*/
exports.agregarTipoProblema = function(req) {
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
        let query = 'insert into tiposDeProblemas set ?';

        let requestBody = {
          tipoProblema: body.tipoProblema
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
              respuesta: 'tipo de problema dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarTipoProblema


/*WEB SERVICE --ACTUALIZAR TIPOS DE PROBLEMAS--*/
exports.actualizarTipoProblema = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idTipoProblema = req.params.idTipoProblema;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update tiposDeProblemas set ? where idTipoProblema = ${idTipoProblema}`; //las comillas son diferentes

        let requestBody = {
          tipoProblema: body.tipoProblema
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
              respuesta: 'tipo de problema actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarTipoProblema


/*WEB SERVICE --ELIMINAR TIPOS DE PROBLEMAS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarTipoProblema = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idTipoProblema = req.params.idTipoProblema;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update tiposDeProblemas set ? where idTipoProblema = ${idTipoProblema}`; //las comillas son diferentes

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
              respuesta: 'tipo de problema eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarTipoProblema
