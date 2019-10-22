/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/
/*WEB SERVICE --LISTAR PROVEEDORES--*/
exports.listarProveedores = function(req) {
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
        var query = 'select idProveedor,nombreProveedor,ciudadProveedor,estadoProveedor,paisProveedor,direccionProveedor,telefonoProveedor,emailProveedor,descripcionProveedor,fechaActualizacionProveedor from proveedores where estatusBL = 1';

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
} //fin listarProveedores


/*WEB SERVICE --AGREGAR PROVEEDORES---*/
exports.agregarProveedor = function(req) {
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
        let query = 'insert into proveedores set ?';

        let requestBody = {
          nombreProveedor: body.nombreProveedor,
          ciudadProveedor: body.ciudadProveedor,
          estadoProveedor: body.estadoProveedor,
          paisProveedor: body.paisProveedor,
          direccionProveedor: body.direccionProveedor,
          telefonoProveedor: body.telefonoProveedor,
          emailProveedor: body.emailProveedor,
          descripcionProveedor: body.descripcionProveedor
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
              respuesta: 'proveedor dado de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarProveedor


/*WEB SERVICE --ACTUALIZAR PROVEEDORES--*/
exports.actualizarProveedor = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idProveedor = req.params.idProveedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let nombreProveedor = body.nombreProveedor;
        let ciudadProveedor = body.ciudadProveedor;
        let estadoProveedor = body.estadoProveedor;
        let paisProveedor = body.paisProveedor;
        let direccionProveedor = body.direccionProveedor;
        let telefonoProveedor = body.telefonoProveedor;
        let emailProveedor = body.emailProveedor;
        let descripcionProveedor = body.descripcionProveedor;

        let query = `update proveedores set nombreProveedor = '${nombreProveedor}',ciudadProveedor= '${ciudadProveedor}',estadoProveedor= '${estadoProveedor}',paisProveedor= '${paisProveedor}',direccionProveedor= '${direccionProveedor}',telefonoProveedor= '${telefonoProveedor}',emailProveedor= '${emailProveedor}',descripcionProveedor= '${descripcionProveedor}', fechaActualizacionProveedor = now() where idProveedor = ${idProveedor}`; //las comillas son diferentes


        database.query(query,function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'proveedor actualizado correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarProveedor


/*WEB SERVICE --ELIMINAR PROVEEDORES-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarProveedor = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idProveedor = req.params.idProveedor;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update proveedores set ? where idProveedor = ${idProveedor}`; //las comillas son diferentes

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
              respuesta: 'proveedor eliminado correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarProveedor
