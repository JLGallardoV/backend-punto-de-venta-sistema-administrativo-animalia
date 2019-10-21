/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR ALMACENES--*/
exports.listarAlmacenes = function(req) {
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
        var query = 'select idAlmacen,ciudadAlmacen,estadoAlmacen,paisAlmacen,direccionAlmacen,referenciaAlmacen,telefonoAlmacen from almacenes where estatusBL = 1;';

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
} //fin listarAlmacenes


/*WEB SERVICE --AGREGAR ALMACENES---*/
exports.agregarAlmacen = function(req) {
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
        let query = 'insert into almacenes set ?';

        let requestBody = {
          ciudadAlmacen: body.ciudadAlmacen,
          estadoAlmacen: body.estadoAlmacen,
          paisAlmacen: body.paisAlmacen,
          direccionAlmacen: body.direccionAlmacen,
          referenciaAlmacen: body.referenciaAlmacen,
          telefonoAlmacen: body.telefonoAlmacen
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
              respuesta: 'almacen dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarAlmacen


/*WEB SERVICE --ACTUALIZAR ALMACENES--*/
exports.actualizarAlmacen = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idAlmacen = req.params.idAlmacen;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {

        let ciudadAlmacen = body.ciudadAlmacen;
        let estadoAlmacen = body.estadoAlmacen;
        let paisAlmacen = body.paisAlmacen;
        let direccionAlmacen = body.direccionAlmacen;
        let referenciaAlmacen = body.referenciaAlmacen;
        let telefonoAlmacen = body.telefonoAlmacen;

        let query = `update almacenes set ciudadAlmacen = '${ciudadAlmacen}', estadoAlmacen = '${estadoAlmacen}', paisAlmacen = '${paisAlmacen}', direccionAlmacen = '${direccionAlmacen}', referenciaAlmacen = '${referenciaAlmacen}', telefonoAlmacen = '${telefonoAlmacen}', fechaActualizacionAlmacen = now() where idAlmacen = ${idAlmacen}`; //las comillas son diferentes




        database.query(query,function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'almacen actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarAlmacen


/*WEB SERVICE --ELIMINAR ALMACENES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarAlmacen = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idAlmacen = req.params.idAlmacen;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update almacenes set ? where idAlmacen = ${idAlmacen}`; //las comillas son diferentes

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
              respuesta: 'almacen eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarAlmacen
