/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR RENDIMIENTO VENDEDORES--*/
exports.listarRendimientoVendedores = function(req) {
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
        var query = 'select * from rendimientoVendedores where estatusBL = 1';

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
} //fin listarRendimientoVendedores


/*WEB SERVICE --AGREGAR RENDIMIENTO VENDEDORES---*/
exports.agregarRendimientoVendedor = function(req) {
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
        let query = 'insert into rendimientoVendedores set ?';

        let requestBody = {
          rendimientoVendedor: body.rendimientoVendedor,
          descripcionRendimientoVendedor: body.descripcionRendimientoVendedor
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
              respuesta: 'rendimiento vendedor dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarRendimientoVendedor


/*WEB SERVICE --ACTUALIZAR RENDIMIENTO VENDEDORES--*/
exports.actualizarRendimientoVendedor = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idRendimientoVendedor = req.params.idRendimientoVendedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update rendimientoVendedores set ? where idRendimientoVendedor = ${idRendimientoVendedor}`; //las comillas son diferentes

        let requestBody = {
          rendimientoVendedor: body.rendimientoVendedor,
          descripcionRendimientoVendedor: body.descripcionRendimientoVendedor
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
              respuesta: 'rendimiento vendedor actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarRendimientoVendedor


/*WEB SERVICE --ELIMINAR RENDIMIENTO VENDEDORES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarRendimientoVendedor = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idRendimientoVendedor = req.params.idRendimientoVendedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update rendimientoVendedores set ? where idRendimientoVendedor = ${idRendimientoVendedor}`; //las comillas son diferentes

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
              respuesta: 'rendimiento vendedor eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarRendimientoVendedor
