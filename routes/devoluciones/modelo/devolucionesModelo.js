/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR DEVOLUCIONES--*/
exports.listarDevoluciones = function(req) {
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
        var query = 'select * from devoluciones where estatusBL = 1';

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
} //fin listarDevoluciones


/*WEB SERVICE --AGREGAR DEVOLUCION---*/
exports.agregarDevolucion = function(req) {
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
        let query = 'insert into devoluciones set ?';

        let requestBody = {
          ivaDevolucion: body.ivaDevolucion,
          montoConIvaDevolucion: body.montoConIvaDevolucion,
          motivoDevolucion: body.motivoDevolucion,
          idCliente : body.idCliente,
          idTipoProblema: body.idTipoProblema
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
              respuesta: 'devolucion dada de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarDevolucion


/*WEB SERVICE --ACTUALIZAR DEVOLUCION--*/
exports.actualizarDevolucion = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idDevolucion = req.params.idDevolucion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update devoluciones set ? where idDevolucion = ${idDevolucion}`; //las comillas son diferentes

        let requestBody = {
          ivaDevolucion: body.ivaDevolucion,
          montoConIvaDevolucion: body.montoConIvaDevolucion,
          motivoDevolucion: body.motivoDevolucion,
          idCliente : body.idCliente,
          idTipoProblema: body.idTipoProblema
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
              respuesta: 'devolucion actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarDevolucion


/*WEB SERVICE --ELIMINAR DEVOLUCION-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarDevolucion = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idDevolucion = req.params.idDevolucion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update devoluciones set ? where idDevolucion = ${idDevolucion}`; //las comillas son diferentes

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
              respuesta: 'devolucion eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarDevolucion
