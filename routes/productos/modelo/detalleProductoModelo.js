/* INICIO - WS LISTAR DETALLE PRODUCTO*/
exports.listarDetalleProducto = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let body = req.body;
    let idProducto = req.params.idProducto;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //tenemos conexión
        var query = `
        SELECT productos.idProducto,productos.nombreProducto,productos.detalleProducto,productos.contenidoProducto,productos.fechaCaducidadProducto,productos.paisOrigenProducto,productos.stockProducto,productos.puntosProducto,productos.precioUnitarioProducto,productos.precioCompraProducto,categorias.nombreCategoria,almacenes.ciudadAlmacen,almacenes.telefonoAlmacen
        FROM productos
        INNER JOIN categorias ON productos.idCategoria = categorias.idCategoria
        INNER JOIN almacenes ON productos.idAlmacen = almacenes.idAlmacen
        WHERE productos.idProducto = ${idProducto} AND productos.estatusBL = 1;
        `;

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
} //FIN - WS LISTAR DETALLE PRODUCTO
