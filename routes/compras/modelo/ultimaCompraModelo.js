/* INICIO - WS LISTAR DETALLE COMPRA*/
exports.listarUltimaCompra = function(req) {
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
        var query = `SELECT compras.idCompra,compras.montoCompra,compras.fechaCompra,proveedores.nombreProveedor, usuarios.nombreUsuario, productos.nombreProducto, compras_productos.numeroProductosEnCompra
                     FROM compras
                     INNER JOIN proveedores ON compras.idProveedor = proveedores.idProveedor
                     INNER  JOIN usuarios ON compras.idUsuario = usuarios.idUsuario
                     INNER JOIN compras_productos ON compras.idCompra= compras_productos.idCompra
                     INNER JOIN  productos ON compras_productos.idProducto=productos.idProducto
                     WHERE compras.estatusBL=1 order by idCompra DESC LIMIT 1;`;

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
} //FIN - WS LISTAR DETALLE COMPRA
