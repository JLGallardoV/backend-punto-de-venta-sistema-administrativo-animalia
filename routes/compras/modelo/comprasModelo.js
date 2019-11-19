/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/
/* INICIO- WS LISTAR COMPRAS--*/
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
        var query = 'SELECT compras.idCompra,compras.montoCompra,compras.fechaCompra,proveedores.nombreProveedor, usuarios.nombreUsuario, productos.nombreProducto, compras_productos.numeroProductosEnCompra FROM compras INNER JOIN proveedores ON compras.idProveedor = proveedores.idProveedor INNER  JOIN usuarios ON compras.idUsuario = usuarios.idUsuario INNER JOIN compras_productos ON compras.idCompra= compras_productos.idCompra INNER JOIN  productos ON compras_productos.idProducto=productos.idProducto WHERE compras.estatusBL=1 order by idCompra ASC;';

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
} //FIN - WS LISTAR COMPRAS


/* INICIO - WS AGREGAR COMPRA */
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
        let productos = body.productos; //traer un arreglo de objetos
        let idProveedor = body.idProveedor;
        let idUsuario = body.idUsuario;

        // INICIO - GENERANDO INSERCION COMPRAS
        let query = `INSERT INTO compras(montoCompra,idUsuario,idProveedor) VALUES('${montoCompra}','${idUsuario}','${idProveedor}');`;
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
        });// FIN - INSERCION COMPRAS

        // INICIO - GENERANDO INSERCION COMPRAS_PRODUCTOS
        for (var i = 0; i < productos.length; i++) {//con esto me aseguro de que se hayan insertado todos los productos
          //agregando...
          let queryI = `INSERT INTO compras_productos(idCompra,idProducto,numeroProductosEnCompra)
                       VALUES(LAST_INSERT_ID(),'${productos[i].idProducto}','${productos[i].cantidadProducto}');`;
          database.query(queryI, function(error, success) {
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

          //esta parte es para actualizar el stock del producto cada vez que haya una compra
          let queryU = `UPDATE productos SET stockProducto = stockProducto + ${productos[i].cantidadProducto} WHERE idProducto = ${productos[i].idProducto};`;
          database.query(queryU, function(error, success) {
            if (error) {
              reject({
                estatus: -1,
                respuesta: error
              });
            } else {
              resolve({
                estatus: 1,
                respuesta: 'transaccion dada de alta correctamente'
              });
            }
          });
        }// FIN - INSERCION COMPRAS_PRODUCTOS
      }
    });
  });
} // FIN - WS AGREGAR COMPRA


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
