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
        var query = 'SELECT transacciones.idTransaccion, transacciones.montoNoIvaTransaccion, transacciones.ivaTransaccion, transacciones.montoConIvaTransaccion,transacciones.pagoTransaccion,transacciones.cambioTransaccion,transacciones.fechaTransaccion,productos.nombreProducto,transacciones_productos.numeroProductosEnTransaccion,vendedores.nombreVendedor,clientes.nombreCliente,tiposDePagos.tipoPago FROM transacciones  INNER JOIN transacciones_productos ON transacciones.idTransaccion = transacciones_productos.idTransaccion INNER JOIN productos ON transacciones_productos.idProducto = productos.idProducto INNER JOIN vendedores  ON transacciones.idVendedor = vendedores.idVendedor INNER JOIN clientes  ON transacciones.idCliente = clientes.idCliente INNER JOIN transacciones_tiposDePagos ON transacciones.idTransaccion = transacciones_tiposDePagos.idTransaccion INNER JOIN tiposDePagos ON transacciones_tiposDePagos.idTipoPago = tiposDePagos.idTipoPago WHERE transacciones.estatusBL = 1;';

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
      var tiposDePagos = body.tiposDePagos; //recibe un array de objetos
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
      let arregloProductosInsuficientes = []; //para los productos los cuales se pedian mas de los que habia en el stock
      let transaccionInsertada = false; //valor bandera para asegurarme que no se realize una operacion + de 1 vez
      let msjProductoInsuficiente = false; // permite recordar insertar transaccion que tuvimos productos insufientes
      let msjTransaccionCompleta = false // permite recordar a productos insufientes que tuvimos productos exitosos
      //INICIO - GENERANDO VALORES AUTOMATIVOS (CREANDO PROMESA)
      let operaciones = function(){
        return new Promise((resolve,reject) => {

          //obtener precio unitario y su id del producto en la posicion [i] y stockProducto
          for (let j = 0; j < productos.length; j++) {
            let queryPU = `SELECT precioUnitarioProducto,stockProducto FROM productos WHERE idProducto = ${productos[j].idProducto}`;
            database.query(queryPU, function(error, success) {
              if (error) {
                console.log("error: ", error);
                reject({
                  estatus: -1,
                  respuesta: error
                });
                return;
              }
              //acumulando el precio de los  productos por su cantidad y sumando el monto asi tambien la cantidad de productos de la transaccion
              //NOTA: los productos ya contienen iva
              if (productos[j].cantidadProducto < success[0].stockProducto) {
                montoConIvaTransaccion = montoConIvaTransaccion + (success[0].precioUnitarioProducto * productos[j].cantidadProducto);
                cantidadProductosTransaccion = cantidadProductosTransaccion + productos[j].cantidadProducto; //cantidadProducto definelo en el postman

              }

              //me aseguro de que sea la ultima iteracion del ciclo para que pueda resolverse la promesa y mande el valor correcto
              if (j == productos.length -1) {
                ivaTransaccion = montoConIvaTransaccion * .16;
                montoNoIvaTransaccion = montoConIvaTransaccion - ivaTransaccion;
                cambioTransaccion = pagoTransaccion - montoConIvaTransaccion;
                resolve(
                  arregloOperaciones = [cantidadProductosTransaccion, montoNoIvaTransaccion, ivaTransaccion, montoConIvaTransaccion, cambioTransaccion]
                );
              }
            });
          }
        });//FIN - GENERANDO VALORES AUTOMATICOS (CREANDO PROMESA)
      }




      //INICIO - RESOLVIENDO PROMESA OPERACIONES
      operaciones().then(//hacemos uso de la promesa para meter lo valores del success a los insert
        (success) => {//COMPORTAMIENTO: Al ser exitosa la resolucion de la promesa los valores de las variables globales toman el valor que tomaron en la creacion de la promesa

          // INICIO - RECORRIENDO PRODUCTOS
          for (let i = 0; i < productos.length; i++) {
            //verificamos el stock de los productos en iteracion
            let querySS = `SELECT stockProducto FROM productos WHERE idProducto = ${productos[i].idProducto}`;
            database.query(querySS, function(error, productosStock) {
              if (error) {
                reject({
                  estatus: -1,
                  respuesta: error
                });
              } else {
                //INICIO - VALIDACION CANTIDAD < STOCK
                if (productos[i].cantidadProducto < productosStock[0].stockProducto) {

                  //validando que no se inserte una transaccion mas de una vez
                  if (transaccionInsertada == false) {
                    transaccionInsertada = true;
                    msjTransaccionCompleta = true //recordando que se hizo una transaccion exitosa a productos insufientes (else)
                    //INICIO - GENERANDO INSERCION TRANSACCIONES
                    console.log("el producto con id: ", productos[i].idProducto, " SI fue insertado");
                    let queryIT = `INSERT INTO transacciones(montoNoIvaTransaccion,ivaTransaccion,montoConIvaTransaccion,cantidadProductosTransaccion,pagoTransaccion,cambioTransaccion,idCliente,idVendedor)
                    VALUES('${montoNoIvaTransaccion}','${ivaTransaccion}','${montoConIvaTransaccion}','${cantidadProductosTransaccion}','${pagoTransaccion}','${cambioTransaccion}','${idCliente}','${idVendedor}');`;

                    database.query(queryIT, function(error, success) {
                      if (error) {
                        reject({
                          estatus: -1,
                          respuesta: error
                        });
                      } else {
                        let mensaje
                        if (msjProductoInsuficiente == true) {
                            mensaje = "transaccion exitosa pero hay un problema, unidades insufientes -> "+ arregloProductosInsuficientes;
                        }else {
                            mensaje = "transaccion dada de alta correctamente"
                        }
                        resolve({
                          estatus: 1,
                          respuesta: mensaje
                        });
                      }
                    }); //FIN - GENERANDO INSERCION TRANSACCIONES
                  }


                  //INICIO - GENERANDO INSERCION TRANSACCIONES_PRODUCTOS
                  //con este query vamos agregando los productos a la transaccion
                  console.log("valor de I: ", i);
                  let queryITP = `INSERT INTO transacciones_productos(idTransaccion,idProducto,numeroProductosEnTransaccion)
                                   VALUES(LAST_INSERT_ID(),${productos[i].idProducto},${productos[i].cantidadProducto});`;
                  console.log("este es el producto que se pretende insertar: ",productos[i].idProducto);
                  database.query(queryITP, function(error, success) {
                    console.log("error:::::>",error,"success::::>",success);
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
                  let queryUP = `UPDATE productos SET stockProducto = stockProducto - ${productos[i].cantidadProducto} WHERE idProducto = ${productos[i].idProducto};`;

                  database.query(queryUP, function(error, success) {
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
                  //INICIO - GENERANDO INSERCION TRANSACCIONES_TIPOSDEPAGOS
                  for (var j = 0; j < tiposDePagos.length; j++) {
                    let queryITT = `INSERT INTO transacciones_tiposDePagos(idTransaccion,idTipoPago)
                    VALUES(LAST_INSERT_ID(),'${tiposDePagos[j].idTipoPago}');`;

                    database.query(queryITT, function(error, success) {
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



                }else {
                  //cambio valor aqui para que se vea reflejado en una transaccion con un ultimo producto exitoso (if)
                  msjProductoInsuficiente = true;
                  //acumulo productos insufientes
                  arregloProductosInsuficientes[i] = " producto con id: "+productos[i].idProducto + " actualmente existen " + productosStock[0].stockProducto +" unidades disponibles";

                  let mensaje;
                  if (msjTransaccionCompleta == true) {
                    mensaje = "transaccion exitosa pero hay un problema, unidades insuficientes ->"+arregloProductosInsuficientes;
                  }else {
                    mensaje = "unidades insufientes ->"+ arregloProductosInsuficientes;
                  }

                  //me aseguro de que sea la ultima iteracion del ciclo para que pueda resolverse la promesa y mandar el msj
                  if (i == productos.length - 1) {
                    reject({
                      estatus: 1,
                      respuesta: mensaje
                    });
                  }
                } //FIN - VALIDACION CANTIDAD < STOCK
              }
            });
          } // FIN - RECORRIENDO PRODUCTOS
        },
        (error) => {
          console.log("error: ",error);
        }); //FIN - REOLVIENDO PROMESA OPERACIONES
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
