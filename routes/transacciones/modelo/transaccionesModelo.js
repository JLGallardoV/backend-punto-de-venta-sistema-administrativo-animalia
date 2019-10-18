/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/* INICIO - WS LISTAR TRANSACCIONES*/
exports.listarTransacciones = function(req) {
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
        var query = 'SELECT * FROM transacciones;';

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
} //FIN - WS LISTAR TRANSACCION


/* INICIO - WS AGREGAR TRANSACCION*/
exports.agregarTransaccion = function(req) {
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

        let tiposDePagos = body.tiposDePagos;//recibe un array de objetos
        let productos = body.productos;//recibe un array de objetos
        let pagoTransaccion = body.pagoTransaccion;
        let idCliente = body.idCliente;
        let idVendedor = body.idVendedor;

        /*INICIO - GENERANDO VALORES AUTOMATIVOS*/
        /*cantidad de todos los productos de la transaccion*/
        let cantidadProductosTransaccion = 0; //funje como acumulador
        for (var i = 0; i < productos.length; i++) {
          cantidadProductosTransaccion = cantidadProductosTransaccion + productos[i].cantidadProducto; //cantidadProducto definelo en el postman
        }
        /*monto total sin iva*/
        let montoNoIvaTransaccion = 0;
        for (var i = 0; i < productos.length; i++) {
          montoNoIvaTransaccion = montoNoIvaTransaccion + (productos[i].precioUnitarioProducto * productos[i].cantidadProducto);
        }
        /*iva*/
        let ivaTransaccion = 0;
        ivaTransaccion = montoNoIvaTransaccion * .16;
        /*monto total con iva*/
        let montoConIvaTransaccion = montoNoIvaTransaccion + ivaTransaccion;
        /*cambio*/
        let cambioTransaccion = pagoTransaccion - montoConIvaTransaccion;
        /*pendiente*/
        let subtotalTransaccionProducto = 0;
        let totalTransaccionProducto = 0;
        let ivaTransaccionProducto = 0;
        /*FIN - GENERANDO VALORES AUTOMATICOS*/

        //INICIO - GENERANDO INSERCION TRANSACCIONES
        let query = `INSERT INTO transacciones(montoNoIvaTransaccion,ivaTransaccion,montoConIvaTransaccion,cantidadProductosTransaccion,pagoTransaccion,cambioTransaccion,idCliente,idVendedor)
                     VALUES('${montoNoIvaTransaccion}','${ivaTransaccion}','${montoConIvaTransaccion}','${cantidadProductosTransaccion}','${pagoTransaccion}','${cambioTransaccion}','${idCliente}','${idVendedor}');`;

        database.query(query, function(error, success) {
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
        });//FIN - GENERANDO INSERCION TRANSACCIONES

        //INICIO - GENERANDO INSERCION TRANSACCIONES_PRODUCTOS
        for (var i = 0; i < productos.length; i++) { //ciclo para asegurarme que se hayan insertado todos los productos.
          //con este query vamos agregando los productos a la transaccion
          let queryI = `INSERT INTO transacciones_productos(idTransaccion,idProducto,numeroProductosEnTransaccion,subtotalTransaccionProducto,totalTransaccionProducto,ivaTransaccionProducto)
                       VALUES(LAST_INSERT_ID(),${productos[i].idProducto},${productos[i].cantidadProducto},'${subtotalTransaccionProducto}','${totalTransaccionProducto}','${ivaTransaccionProducto}');`;

          database.query(queryI, function(error, success) {
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

          //con este query actualizare el stock (lo tenia en un procedimiento almacenado pero por alguna razon no actualizo)
          let queryU = `UPDATE productos SET stockProducto = stockProducto - ${productos[i].cantidadProducto} WHERE idProducto = ${productos[i].idProducto};`;

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

        }//FIN - GENERANDO INSERCION TRANSACCIONES_PRODUCTOS

        //INICIO - GENERANDO INSERCION TRANSACCIONES_TIPOSDEPAGOS
        for (var i = 0; i < tiposDePagos.length; i++) { //ciclo para asegurarme que se hayan insertado todos los productos.
          let query = `INSERT INTO transacciones_tiposDePagos(idTransaccion,idTipoPago)
                       VALUES(LAST_INSERT_ID(),'${tiposDePagos[i].idTipoPago}');`;

          database.query(query, function(error, success) {
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
        }//FIN - GENERANDO INSERCION TRANSACCIONES_TIPOSDEPAGOS

      }
    });
  });
} //FIN - WS AGREGAR TRANSACCION



/*INICIO - ELIMINAR TRANSACCIONES CON UN TOQUE DE BORRADO LOGICO*/
exports.eliminarTransaccion = function(req) {
  //regresaremos una promesa
  console.log("eliminando...");
  return new Promise((resolve, reject) => {
    /*web service para eliminar un registro*/
    let idTransaccion = req.params.idTransaccion;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let query = `update transacciones set ? where idTransaccion = ${idTransaccion}`; //las comillas son diferentes

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
              respuesta: 'transaccion eliminada correctamente'
            });
          }
        });
      }
    });
  });
} //FIN - WS ELIMINAR TRANSACCION
