--CONSULTAS *NOTA CORRIJA LAS FECHAS PARA QUE SE PUEDA HACER LAS SUMAS:

-- MONTO DE COMPRAS
SELECT (SELECT IFNULL(sum(montoCompra),0) from compras WHERE fechaCompra BETWEEN '2019-09-23 00:00:00' AND '2019-10-23 23:59:59') AS montoCompra;

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


--TRANSACCIONES_PRODUCTOS:
SELECT transacciones_productos.idTransaccion, productos.nombreProducto, transacciones.fechaTransaccion
FROM transacciones_productos
INNER JOIN productos ON transacciones_productos.idProducto = productos.idProducto
INNER JOIN transacciones ON transacciones_productos.idTransaccion = transacciones.idTransaccion;

--TRANSACCIONES_CLIENTES:
SELECT transacciones_clientes.idTransaccion, clientes.nombreCliente, transacciones.fechaTransaccion, productos.nombreProducto
FROM transacciones_clientes
INNER JOIN clientes ON transacciones_clientes.idCliente = clientes.idCliente
INNER JOIN productos ON transacciones_clientes.idTransaccion = productos.idProducto
INNER JOIN transacciones ON transacciones_clientes.idTransaccion = transacciones.idTransaccion;


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






/*VER DETALLES DE UNA COMPRA (PRODUCTO, PROVEDOR, MONTO, FECHA) -ANDA EN PROCESO...
SELECT compras.idCompra, proveedores.idProveedor, compras.fechaCompra, productos.nombreProducto, usuarios.nombreUsuario
FROM compras
INNER JOIN proveedores ON compras.idProveedor = proveedores.idProveedor
INNER JOIN productos ON compras.idProveedor = proveedores.idProveedor*/
