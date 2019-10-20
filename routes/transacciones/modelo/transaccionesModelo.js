var test = require('./promesa');
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
  console.log("agregando...");
  return new Promise((resolve, reject) => {

    let body = req.body;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
        return;
      }
      let tiposDePagos = body.tiposDePagos; //recibe un array de objetos
      let productos = body.productos; //recibe un array de objetos
      let pagoTransaccion = body.pagoTransaccion;
      let idCliente = body.idCliente;
      let idVendedor = body.idVendedor;
      let cantidadProductosTransaccion = 0; //suma de los diferentes productos de la transaccion
      let montoNoIvaTransaccion = 0; //monto total sin iva
      let ivaTransaccion = 0;
      let montoConIvaTransaccion = 0; //monto con iva de la transaccion
      let cambioTransaccion = 0 //cambio
      let arregloOperaciones = []; //aqui se guardaran los resultados, para invocarlos despues


      /*INICIO - GENERANDO VALORES AUTOMATIVOS*/
      let operaciones = function(){
        return new Promise((resolve,reject) => {

          /*cantidad de todos los productos de la transaccion*/
          for (var j = 0; j < productos.length; j++) {
            cantidadProductosTransaccion = cantidadProductosTransaccion + productos[j].cantidadProducto; //cantidadProducto definelo en el postman
          }

          //obtener precio unitario del producto en la posicion [i]
          for (let i = 0; i < productos.length; i++) {
            let queryPU = `SELECT precioUnitarioProducto FROM productos WHERE idProducto = ${productos[i].idProducto}`;
            database.query(queryPU, function(error, success) {
              if (error) {
                console.log("error: ", error);
                reject({
                  estatus: -1,
                  respuesta: error
                });
                return;
              }
              //acumulando el precio de los  productos por su cantidad y sumando el monto
              montoNoIvaTransaccion = montoNoIvaTransaccion + (success[0].precioUnitarioProducto * productos[i].cantidadProducto)

              //me aseguro de que sea la ultima iteracion del ciclo para que pueda resolverse la promesa y mande el valor correcto
              if (i == productos.length -1) {
                ivaTransaccion = montoNoIvaTransaccion * .16;
                montoConIvaTransaccion = montoNoIvaTransaccion + ivaTransaccion;
                cambioTransaccion = pagoTransaccion - montoConIvaTransaccion;
                resolve(
                  arregloOperaciones = [cantidadProductosTransaccion, montoNoIvaTransaccion, ivaTransaccion, montoConIvaTransaccion, cambioTransaccion]
                );
              }
            });
          }
        });/*FIN - GENERANDO VALORES AUTOMATICOS*/
      }

      //hacemos uso de la promesa para meter lo valores del success en el insert
      operaciones().then(
        (success) => {
          console.log("valor success: ", success);
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
          }); //FIN - GENERANDO INSERCION TRANSACCIONES
        },
        (error) => {
          console.log("error: ",error);
        });


      //INICIO - GENERANDO INSERCION TRANSACCIONES_PRODUCTOS
      for (var i = 0; i < productos.length; i++) { //ciclo para asegurarme que se hayan insertado todos los productos.
        //con este query vamos agregando los productos a la transaccion
        let queryI = `INSERT INTO transacciones_productos(idTransaccion,idProducto,numeroProductosEnTransaccion,subtotalTransaccionProducto,totalTransaccionProducto,ivaTransaccionProducto)
                       VALUES(LAST_INSERT_ID(),${productos[i].idProducto},${productos[i].cantidadProducto},0,0,0);`;

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

      } //FIN - GENERANDO INSERCION TRANSACCIONES_PRODUCTOS

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
      } //FIN - GENERANDO INSERCION TRANSACCIONES_TIPOSDEPAGOS

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
