/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR TIPOS DE PAGOS--*/
exports.listarTiposPagos = function(req) {
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
        var query = 'select idTipoPago,tipoPago,viaTipoPago,descripcionTipoPago from tiposDePagos where estatusBL = 1';

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
} //fin listarTiposPagos


/*WEB SERVICE --AGREGAR TIPOS DE PAGOS---*/
exports.agregarTipoPago = function(req) {
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
        let query = 'insert into tiposDePagos set ?';

        let requestBody = {
          tipoPago: body.tipoPago,
          viaTipoPago: body.viaTipoPago,
          descripcionTipoPago: body.descripcionTipoPago
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
              respuesta: 'tipo de pago dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarTipoPago


/*WEB SERVICE --ACTUALIZAR TIPOS DE PAGOS--*/
exports.actualizarTipoPago = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idTipoPago = req.params.idTipoPago;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update tiposDePagos set ? where idTipoPago = ${idTipoPago}`; //las comillas son diferentes

        let requestBody = {
          tipoPago: body.tipoPago,
          viaTipoPago: body.viaTipoPago,
          descripcionTipoPago: body.descripcionTipoPago
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
              respuesta: 'tipo de pago actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarTipoPago


/*WEB SERVICE --ELIMINAR TIPOS DE PAGOS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarTipoPago = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idTipoPago = req.params.idTipoPago;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update tiposDePagos set ? where idTipoPago = ${idTipoPago}`; //las comillas son diferentes

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
              respuesta: 'tipo de pago eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarTipoPago
