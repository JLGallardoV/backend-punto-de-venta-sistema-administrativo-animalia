/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/
/*WEB SERVICE --LISTAR VENDEDORES--*/
exports.listarVendedores = function(req) {
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
        var query = 'select * from vendedores where estatusBL = 1';

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
} //fin listarVendedores


/*WEB SERVICE --AGREGAR VENDEDORES---*/
exports.agregarVendedor = function(req) {
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
        let query = 'insert into vendedores set ?';

        let requestBody = {
          nombreVendedor: body.nombreVendedor,
          ciudadVendedor: body.ciudadVendedor,
          estadoVendedor: body.estadoVendedor,
          direccionVendedor: body.direccionVendedor,
          telefonoVendedor: body.telefonoVendedor,
          emailVendedor: body.emailVendedor,
          fechaNacimientoVendedor: body.fechaNacimientoVendedor,
          rfcVendedor: body.rfcVendedor,
          numeroSeguroSocialVendedor: body.numeroSeguroSocialVendedor,
          antiguedadVendedor: body.antiguedadVendedor
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
              respuesta: 'vendedor dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarVendedor


/*WEB SERVICE --ACTUALIZAR VENDEDORES--*/
exports.actualizarVendedor = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idVendedor = req.params.idVendedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
          let query = `update vendedores set ? where idVendedor = ${idVendedor}`; //las comillas son diferentes

        let requestBody = {
          nombreVendedor: body.nombreVendedor,
          ciudadVendedor: body.ciudadVendedor,
          estadoVendedor: body.estadoVendedor,
          direccionVendedor: body.direccionVendedor,
          telefonoVendedor: body.telefonoVendedor,
          emailVendedor: body.emailVendedor,
          fechaNacimientoVendedor: body.fechaNacimientoVendedor,
          rfcVendedor: body.rfcVendedor,
          numeroSeguroSocialVendedor: body.numeroSeguroSocialVendedor,
          antiguedadVendedor: body.antiguedadVendedor
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
              respuesta: 'vendedor actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarVendedor


/*WEB SERVICE --ELIMINAR VENDEDORES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarVendedor = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idVendedor = req.params.idVendedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update vendedores set ? where idVendedor = ${idVendedor}`; //las comillas son diferentes

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
              respuesta: 'vendedor eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarVendedor
