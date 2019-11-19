/* INICIO- WS LISTAR DETALLE COMPRA--*/
exports.listarDetalleCompra = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let body = req.body;
    let idCompra = req.params.idCompra;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //muestra las diferentes compras existentes, quien fue el proveedor, que producto se compro y quien lo compro
        var query = `SELECT compras.idCompra,compras.montoCompra,compras.fechaCompra,proveedores.nombreProveedor, usuarios.nombreUsuario, productos.nombreProducto, compras_productos.numeroProductosEnCompra FROM compras INNER JOIN proveedores ON compras.idProveedor = proveedores.idProveedor INNER  JOIN usuarios ON compras.idUsuario = usuarios.idUsuario INNER JOIN compras_productos ON compras.idCompra= compras_productos.idCompra INNER JOIN  productos ON compras_productos.idProducto=productos.idProducto WHERE compras.idCompra= ${idCompra} AND compras.estatusBL=1 order by idCompra ASC;`;

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
