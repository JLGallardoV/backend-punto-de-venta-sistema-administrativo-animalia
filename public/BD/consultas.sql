--CONSULTAS *NOTA CORRIJA LAS FECHAS PARA QUE SE PUEDA HACER LAS SUMAS:

-- MONTO DE COMPRAS
SELECT (SELECT IFNULL(sum(montoCompra),0) from compras WHERE fechaCompra BETWEEN '2019-09-23 00:00:00' AND '2019-10-23 23:59:59') AS montoCompra;

-- MONTO DE TRANSACCIONES
SELECT (SELECT IFNULL(sum(montoConIvaTransaccion),0) from transacciones WHERE fechaTransaccion BETWEEN '2019-09-23 00:00:00' AND '2019-10-23 23:59:59') AS montoTransaccion;

-- UTILIDAD
select ((select ifnull(sum(montoConIvaTransaccion),0) from transacciones where fechaTransaccion between '2019-08-11 00:00:00' and '2019-10-03 23:59:59') - (select ifnull(sum(montoCompra),0) from compras where fechaCompra between '2019-09-23 00:00:00' and '2019-09-24 23:59:59')) AS total;

--EL PRODUCTO MAS VENDIDO *verificar que tenga datos la tabla de relacion:
SELECT productos.nombreProducto, count(*) as vendidos
FROM transacciones_productos
INNER JOIN productos ON transacciones_productos.idProducto = productos.idProducto
INNER JOIN transacciones ON transacciones_productos.idTransaccion = transacciones.idTransaccion
WHERE fechaTransaccion between '2019-09-23 00:00:00' and '2019-09-28 23:59:59'
group by nombreProducto order by vendidos DESC;

--EL MEJOR VENDEDOR:
SELECT vendedores.nombreVendedor, count(*) AS vendidos
FROM transacciones
INNER JOIN vendedores ON transacciones.idVendedor = vendedores.idVendedor
WHERE fechaTransaccion between '2019-09-23 00:00:00' and '2019-09-26 23:59:59'
group by nombreVendedor order by vendidos DESC;

--PUNTOS POR NUMERO DE COMPRAS A CLIENTES - ALTERNATIVA:
SELECT clientes.nombreCliente, clientes.idCliente, clientes.puntuajeCliente, count(*) as compras
FROM transacciones_clientes
INNER JOIN clientes ON transacciones_clientes.idCliente = clientes.idCliente
INNER JOIN transacciones ON transacciones_clientes.idTransaccion = transacciones.idTransaccion
WHERE fechaTransaccion between '2019-09-23 00:00:00' and '2019-10-28 23:59:59'
group by nombreCliente order by compras DESC;


/*PUNTOS POR PRODUCTO: MULTIPLICA EL NUMERO DE PRODUCTOS COMPRADOS Y DESPUES LOS SUMA PARA DAR EL "VALOR TOTAL" DE PUNTOS
POR USUARIO:*/
SELECT transacciones_clientes.idCliente, clientes.nombreCliente, productos.nombreProducto, SUM(productos.puntosProducto * transacciones_productos.numeroProductosEnTransaccion) AS puntosTotales
FROM transacciones_clientes
INNER JOIN clientes ON transacciones_clientes.idCliente = clientes.idCliente
INNER JOIN productos ON transacciones_clientes.idTransaccion = productos.idProducto
INNER JOIN transacciones_productos ON transacciones_clientes.idTransaccion = transacciones_productos.idTransaccion
group by nombreCliente;

--A CONTINUACION SE MUESTRAN LOS INNER JOINS ADECUADOS PARA ESPECIFICAR LAS ENTIDADES DE LOS VALORES DE ID EN LAS RELACIONES:

--TRANSACCIONES_PRODUCTOS_CLIENTES:
    SELECT transacciones_productos.idTransaccion, productos.nombreProducto, transacciones.montoConIvaTransaccion, transacciones.fechaTransaccion, transacciones_productos.numeroProductosEnTransaccion, vendedores.nombreVendedor, clientes.nombreCliente
    FROM transacciones_productos
    INNER JOIN productos ON transacciones_productos.idProducto = productos.idProducto
    INNER JOIN transacciones ON transacciones_productos.idTransaccion = transacciones.idTransaccion
    INNER JOIN vendedores ON transacciones.idTransaccion = vendedores.idVendedor
    INNER JOIN transacciones_clientes ON transacciones_productos.idTransaccion = transacciones_clientes.idTransaccion
    INNER JOIN clientes ON transacciones_clientes.idCliente = clientes.idCliente;

--ACCESOS - ¿QUIEN ACCEDIO?
SELECT accesos.idAcceso, accesos.fechaAcceso, accesos.accionAcceso, usuarios.nombreUsuario
FROM accesos
INNER JOIN usuarios ON accesos.idUsuario = usuarios.idUsuario;

--CARRITOS - ¿DE QUIEN ES CADA CARRITO?
SELECT carritos.idCarrito, carritos.numeroProductosCarrito, carritos.montoTotalCarrito, clientes.nombreCliente
FROM carritos
INNER JOIN clientes ON carritos.idCliente = clientes.idCliente
WHERE carritos.estatusBL = 1;

--CLIENTES - ¿QUE TIPO DE CLIENTE ES?
SELECT clientes.idCliente,clientes.nombreCliente,clientes.apellidoPaternoCliente,clientes.apellidoMaternoCliente,clientes.ciudadCliente,clientes.estadoCliente,clientes.paisCliente,clientes.direccionCliente,clientes.coloniaCliente,clientes.cpCliente,clientes.telefonoCliente,clientes.emailCliente,clientes.puntuajeCliente,tiposDeClientes.tipoCliente
FROM clientes
INNER JOIN tiposDeClientes ON clientes.idTipoCliente = tiposDeClientes.idTipoCliente
WHERE clientes.estatusBL = 1;

--DEVOLUCIONES - ¿QUIEN HIZO LA DEVOLUCION? ¿PORQUE (TIPO DE PROBLEMA)? ¿CUAL FUE LA COMPENSACION? ¿QUE PRODUCTO SE DEVOLVIO?

SELECT devoluciones.idDevolucion,productos.nombreProducto,devoluciones.montoConIvaDevolucion,devoluciones.fechaDevolucion,devoluciones.motivoDevolucion,clientes.nombreCliente,tiposDeProblemas.tipoProblema,compensaciones.tipoCompensacion
FROM devoluciones
INNER JOIN clientes ON devoluciones.idCliente = clientes.idCliente
INNER JOIN compensaciones ON devoluciones.idCompensacion = compensaciones.idCompensacion
INNER JOIN productos ON devoluciones.idProducto = productos.idProducto
INNER JOIN tiposDeProblemas ON devoluciones.idTipoProblema = tiposDeProblemas.idTipoProblema;

--PRODUCTOS - ¿A QUE CATEGORIA PERTENECE? ¿EN CUAL ALMACEN ESTA?
SELECT productos.idProducto,productos.nombreProducto,productos.detalleProducto,productos.contenidoProducto,productos.fechaCaducidadProducto,productos.paisOrigenProducto,productos.stockProducto,productos.puntosProducto,productos.precioUnitarioProducto,productos.precioMayoreoProducto,categorias.nombreCategoria,almacenes.ciudadAlmacen,almacenes.telefonoAlmacen
FROM productos
INNER JOIN categorias ON productos.idCategoria = categorias.idCategoria
INNER JOIN almacenes ON productos.idAlmacen = almacenes.idAlmacen
WHERE productos.estatusBL = 1;

--TRANSACCIONES - ¿QUIEN FUE EL VENDEDOR?
SELECT transacciones.idTransaccion, transacciones.montoNoIvaTransaccion, transacciones.ivaTransaccion, transacciones.montoConIvaTransaccion, transacciones.fechaTransaccion, vendedores.nombreVendedor
FROM transacciones
INNER JOIN vendedores ON transacciones.idVendedor = vendedores.idVendedor
WHERE vendedores.estatusBL = 1;

--USUARIOS - ¿A QUE VENDEDOR LE PERTENECE LA CUENTA? ¿QUE TIPO DE USUARIO ES?
SELECT usuarios.idUsuario, usuarios.nombreUsuario, usuarios.emailUsuario, usuarios.idVendedor, tiposDeUsuarios.tipoUsuario
FROM usuarios
INNER JOIN tiposDeUsuarios ON usuarios.idTipoUsuario = tiposDeUsuarios.idTipoUsuario

--ENVIOS - ¿DE QUE VENTA ES EL ENVIO? ¿POR QUE MEDIO SE ENVIA?
SELECT envios.idEnvio, envios.ciudadEnvio, envios.estadoEnvio, envios.paisEnvio, envios.observacionesEnvio, envios.fechaEnvio, envios.idTransaccion, mediosDeEntrega.viaMedioEntrega
FROM envios
INNER JOIN mediosDeEntrega ON envios.idMedioEntrega = mediosDeEntrega.idMedioEntrega;


/*COMPRAS - ¿QUIEN HIZO LA COMPRA? ¿A QUIEN SE LE REALIZO LA COMPRA?: PROCESO
OPC 1: ALTERNATIVA
SELECT compras_productos.idCompra, productos.nombreProducto, usuarios.nombreUsuario, compras_productos.numeroProductosEnCompra
FROM compras_productos
INNER JOIN productos ON compras_productos.idProducto = productos.idProducto
INNER JOIN
(compras INNER JOIN usuarios ON compras.idUsuario = usuarios.idUsuario)
GROUP BY idCompra;*/

--OPC 2: EN USO
  SELECT compras.idCompra, productos.nombreProducto, usuarios.nombreUsuario, compras_productos.numeroProductosEnCompra, proveedores.nombreProveedor
  FROM compras
  INNER JOIN proveedores ON compras.idProveedor = proveedores.idProveedor
  INNER JOIN usuarios ON compras.idUsuario = usuarios.idUsuario
  INNER JOIN compras_productos ON compras.idCompra = compras_productos.idCompra
  INNER JOIN productos ON compras_productos.idCompra = productos.idProducto;
