/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR PREMIOS--*/
exports.listarPremios = function(req) {
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
        var query = 'select * from premios where estatusBL = 1';

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
} //fin listarPremios


/*WEB SERVICE --AGREGAR PREMIO---*/
exports.agregarPremio = function(req) {
  //regresaremos una promesa
  console.log("agregando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar un nuevo premio*/
    let body = req.body;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = 'insert into premios set ?';

        let requestBody = {
          premio: body.premio,
          descripcionPremio: body.descripcionPremio,
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
              respuesta: 'premio dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarPremio


/*WEB SERVICE --ACTUALIZAR PREMIO--*/
exports.actualizarPremio = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar un nuevo premio*/
    let body = req.body;
    let idPremio = req.params.idPremio;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update premios set ? where idPremio = ${idPremio}`; //las comillas son diferentes

        let requestBody = {
          premio: body.premio,
          descripcionPremio: body.descripcionPremio,
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
              respuesta: 'premio actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarPremio


/*WEB SERVICE --ELIMINAR PREMIO-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarPremio = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar un nuevo premio*/
    let idPremio = req.params.idPremio;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update premios set ? where idPremio = ${idPremio}`; //las comillas son diferentes

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
              respuesta: 'premio eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarPremio
