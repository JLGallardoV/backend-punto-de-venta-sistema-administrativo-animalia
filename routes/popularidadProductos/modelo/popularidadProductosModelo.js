/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE --LISTAR POPULARIDAD PRODUCTOS--*/
exports.listarPopularidadProductos = function(req) {
  console.log("listando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    let inicioFechaTransacciones = req.params.inicioFechaTransacciones;
    let finalFechaTransacciones = req.params.finalFechaTransacciones;
    //conectar con la base de datos
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        //REGRESA QUE TAN BUENO ES UN PRODUCTO SEGUN SUS COMPRAS REALIZADAS EN UN PERIODO DETERMINADO
        var query = `SELECT productos.nombreProducto, count(*) as vendidos FROM transacciones_productos INNER JOIN productos ON transacciones_productos.idProducto = productos.idProducto INNER JOIN transacciones ON transacciones_productos.idTransaccion = transacciones.idTransaccion WHERE fechaTransaccion between '${inicioFechaTransacciones} 00:00:00' AND '${finalFechaTransacciones} 23:59:59' group by nombreProducto order by vendidos DESC;`;

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
                respuesta: "No existen registros en ese rango de fechas"
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
} //fin listarPopularidadProductos
