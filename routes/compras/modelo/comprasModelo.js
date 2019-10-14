/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/
/*WEB SERVICE --LISTAR COMPRAS--*/
exports.listarCompras = function(req) {
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
        //muestra las diferentes compras existentes, quien fue el proveedor, que producto se compro y quien lo compro
        var query = '  SELECT compras.idCompra, productos.nombreProducto, usuarios.nombreUsuario, compras_productos.numeroProductosEnCompra, proveedores.nombreProveedor FROM compras INNER JOIN proveedores ON compras.idProveedor = proveedores.idProveedor INNER JOIN usuarios ON compras.idUsuario = usuarios.idUsuario INNER JOIN compras_productos ON compras.idCompra = compras_productos.idCompra INNER JOIN productos ON compras_productos.idCompra = productos.idProducto;';

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
} //fin listarCompras


/*WEB SERVICE --AGREGAR COMPRAS---*/
exports.agregarCompra = function(req) {
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
        let montoCompra = body.montoCompra;
        let idCompra = body.idCompra;
        let idProducto = body.idProducto;
        let numeroProductosEnCompra = body.numeroProductosEnCompra;
        let idProveedor = body.idProveedor;
        let idUsuario = body.idUsuario;

        let query = `CALL compraCompleta_procedimiento('${montoCompra}','${idCompra}','${idProducto}','${numeroProductosEnCompra}','${idProveedor}','${idUsuario}');`;

        database.query(query, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'compra dada de alta correctamente'
            });
          }
        });
      }
    });
  });
} //fin agregarCompra


/*WEB SERVICE --ACTUALIZAR COMPRAS--*/
exports.actualizarCompra = function(req) {
  //regresaremos una promesa
  console.log("actualizando...");
  return new Promise((resolve, reject) => {
    /*web service para actualizar*/
    let body = req.body;
    let idCompra = req.params.idCompra;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update compras set ? where idCompra = ${idCompra}`; //las comillas son diferentes

        let requestBody = {
          montoCompra: body.montoCompra,
          idUsuario: body.idUsuario,
          idProveedor: body.idProveedor,
          idReporteEconomico: body.idReporteEconomico
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
              respuesta: 'compra actualizada correctamente'
            });
          }
        });
      }
    });
  });
} //fin actualizarCompra


/*WEB SERVICE --ELIMINAR COMPRAS-- CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarCompra = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idCompra = req.params.idCompra;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update compras set ? where idCompra = ${idCompra}`; //las comillas son diferentes

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
              respuesta: 'compra eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //fin eliminarCompra
