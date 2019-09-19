/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR MEDIOS DE ENTREGA--*/
exports.listarMediosEntrega = function(req) {
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
        var query = 'select * from mediosDeEntrega where estatusBL = 1';

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
} //fin listarMediosEntrega


/*WEB SERVICE --AGREGAR MEDIOS DE ENTREGA---*/
exports.agregarMedioEntrega = function(req) {
  //regresaremos una promesa
  console.log("agregando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar una nuevo medio de entrega*/
    let body = req.body;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = 'insert into mediosDeEntrega set ?';

        let requestBody = {
          medioEntrega: body.medioEntrega,
          viaMedioEntrega: body.viaMedioEntrega,
          descripcionMedioEntrega: body.descripcionMedioEntrega
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
              respuesta: 'medio de entrega dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarMedioEntrega


/*WEB SERVICE --ACTUALIZAR MEDIOS DE ENTREGA--*/
exports.actualizarMedioEntrega = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para agregar un nuevo medio de entrega*/
    let body = req.body;
    let idMedioEntrega = req.params.idMedioEntrega;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update mediosDeEntrega set ? where idMedioEntrega = ${idMedioEntrega}`; //las comillas son diferentes

        let requestBody = {
          medioEntrega: body.medioEntrega,
          viaMedioEntrega: body.viaMedioEntrega,
          descripcionMedioEntrega: body.descripcionMedioEntrega
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
              respuesta: 'medio de entrega actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarMedioEntrega


/*WEB SERVICE --ELIMINAR MEDIOS DE ENTREGA-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarMedioEntrega = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {

    let idMedioEntrega = req.params.idMedioEntrega;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update mediosDeEntrega set ? where idMedioEntrega = ${idMedioEntrega}`; //las comillas son diferentes

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
              respuesta: 'medio de entrega eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarMedioEntrega
