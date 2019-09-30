--Nota: SE USO ON DELETE CASCADE PARA QUE AL MOMENTO DE ELIMINAR UN REGISTRO QUE ESTE SINCRONIZADO MEDIANTE RELACIONES, NO AFECTE Y ELIMINE ORDENADAMENTE CADA RELACION DONDE SE HAGA PRESENTE.
--anexar a datos importantes fecha de registro y modificacion.
CREATE DATABASE tiendaMascotas;

USE tiendaMascotas;

CREATE TABLE premios(
	idPremio INT AUTO_INCREMENT,
	premio VARCHAR(35),
	descripcionPremio VARCHAR(70),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idPremio)
);


CREATE TABLE tiposDeClientes(
	idTipoCliente INT AUTO_INCREMENT,
	tipoCliente VARCHAR(30),
	descripcionTipoCliente VARCHAR(70),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoCliente)
);

CREATE TABLE clientes(
	idCliente INT AUTO_INCREMENT,
	nombreCliente VARCHAR(30),
	apellidoPaternoCliente VARCHAR(20),
	apellidoMaternoCliente VARCHAR(20),
	ciudadCliente VARCHAR(20),
	estadoCliente VARCHAR(20),
	paisCliente VARCHAR(20),
	direccionCliente VARCHAR(30),
	coloniaCliente VARCHAR(30),
	cpCliente INT(7),
	telefonoCliente VARCHAR(20),
	emailCliente VARCHAR(40),
	constraseniaCliente BLOB,
	puntuajeCliente INT(5),
	estatusBL tinyint(2) default 1,
	fechaRegistroCliente DATETIME DEFAULT NOW(),
	fechaActualizacionCliente DATETIME DEFAULT NOW(),
	idTipoCliente INT NOT NULL,
	PRIMARY KEY (idCliente),
	FOREIGN KEY (idTipoCliente) REFERENCES tiposDeClientes (idTipoCliente) ON DELETE CASCADE
);


CREATE TABLE carritos(
	idCarrito INT AUTO_INCREMENT,
	numeroProductosCarrito INT(4) UNSIGNED,
	montoTotalCarrito NUMERIC(7,2) UNSIGNED,
	estatusBL tinyint(2) default 1,
	idCliente INT NOT NULL,
	PRIMARY KEY (idCarrito),
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);


CREATE TABLE vendedores(
	idVendedor INT AUTO_INCREMENT,
	nombreVendedor VARCHAR(20),
	ciudadVendedor VARCHAR(20),
	estadoVendedor VARCHAR(20),
	direccionVendedor VARCHAR(20),
	telefonoVendedor VARCHAR(20),
	emailVendedor VARCHAR(40),
	fechaNacimientoVendedor DATE,
	rfcVendedor VARCHAR(20),
	numeroSeguroSocialVendedor INT(10),
	antiguedadVendedor tinyint(3),
	fechaRegistroVendedor DATETIME DEFAULT NOW(),
	fechaActualizacionVendedor DATETIME DEFAULT NOW(),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idVendedor)
);

CREATE TABLE tiposDeUsuarios(
	idTipoUsuario INT AUTO_INCREMENT,
	tipoUsuario VARCHAR(20),
	privilegiosTipoUsuario VARCHAR(20),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoUsuario)
);

CREATE TABLE usuarios(
	idUsuario INT AUTO_INCREMENT,
	nombreUsuario VARCHAR(20),
	emailUsuario VARCHAR(20),
	contraseniaUsuario BLOB,
	estatusBL tinyint(2) default 1,
	fechaRegistroUsuario DATETIME DEFAULT NOW(),
	fechaActualizacionUsuario DATETIME DEFAULT NOW(),
	idVendedor INT,
	idTipoUsuario INT NOT NULL,
	PRIMARY KEY (idUsuario),
	FOREIGN KEY (idVendedor) REFERENCES vendedores (idVendedor) ON DELETE CASCADE,
	FOREIGN KEY (idTipoUsuario) REFERENCES tiposDeUsuarios (idTipoUsuario) ON DELETE CASCADE
);

CREATE TABLE accesos(
	idAcceso INT AUTO_INCREMENT,
	fechaAcceso DATETIME DEFAULT NOW(),
	fechaModificacionAcceso DATETIME DEFAULT NOW(),
	accionAcceso VARCHAR(20),
	estatusBL tinyint(2) default 1,
	idUsuario INT NOT NULL,	
	PRIMARY KEY (idAcceso),
	FOREIGN KEY (idUsuario) REFERENCES usuarios (idUsuario) ON DELETE CASCADE
);

CREATE TABLE proveedores(
	idProveedor INT AUTO_INCREMENT,
	nombreProveedor VARCHAR(20),
	ciudadProveedor VARCHAR(20),
	estadoProveedor VARCHAR(20),
	paisProveedor VARCHAR(20),
	direccionProveedor VARCHAR(20),
	telefonoProveedor VARCHAR(20),
	emailProveedor VARCHAR(20),
	descripcionProveedor VARCHAR(40),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idProveedor)
);

	
CREATE TABLE compras(
	idCompra INT AUTO_INCREMENT,
	montoCompra NUMERIC(7,2),
	idUsuario INT,
	idProveedor INT,
	fechaCompra DATETIME DEFAULT NOW(),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idCompra),
	FOREIGN KEY (idUsuario) REFERENCES usuarios (idUsuario) ON DELETE CASCADE,
	FOREIGN KEY (idProveedor) REFERENCES proveedores (idProveedor) ON DELETE CASCADE
);


CREATE TABLE almacenes(
	idAlmacen INT AUTO_INCREMENT,
	ciudadAlmacen VARCHAR(20),
	estadoAlmacen VARCHAR(20),
	paisAlmacen VARCHAR(20),
	direccionAlmacen VARCHAR(20),
	referenciaAlmacen VARCHAR(45),
	telefonoAlmacen VARCHAR(12),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idAlmacen)
);


CREATE TABLE tiposDePagos(
	idTipoPago INT AUTO_INCREMENT,
	tipoPago VARCHAR(20),
	viaTipoPago VARCHAR(20),
	descripcionTipoPago VARCHAR(70),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoPago)
);


CREATE TABLE transacciones(
	idTransaccion INT AUTO_INCREMENT,
	montoNoIvaTransaccion NUMERIC(7,2) UNSIGNED,
	ivaTransaccion INT(5) UNSIGNED,
	montoConIvaTransaccion NUMERIC(7,2) UNSIGNED,
	fechaTransaccion DATETIME DEFAULT NOW(),
	cantidadTransaccion INT(5) UNSIGNED,
	estatusBL tinyint(2) default 1,
	idVendedor INT NOT NULL,
	idTipoPago INT NOT NULL,
	PRIMARY KEY (idTransaccion),
	FOREIGN KEY (idVendedor) REFERENCES vendedores (idVendedor) ON DELETE CASCADE,
	FOREIGN KEY (idTipoPago) REFERENCES tiposDePagos (idTipoPago) ON DELETE CASCADE
);

CREATE TABLE mediosDeEntrega(
	idMedioEntrega INT AUTO_INCREMENT,
	medioEntrega VARCHAR(20),
	viaMedioEntrega VARCHAR(20),
	descripcionMedioEntrega VARCHAR(30),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idMedioEntrega)
);


CREATE TABLE detallesTransacciones(
	idDetalleTransaccion INT AUTO_INCREMENT,
	ciudadDetalleTransaccion VARCHAR(20),
	estadoDetalleTransaccion VARCHAR(20),
	paisDetalleTransaccion VARCHAR(20),
	medioEntregaDetalleTransaccion VARCHAR(20),
	observacionesDetalleTransaccion VARCHAR(20),
	estatusBL tinyint(2) default 1,
	idTransaccion INT NOT NULL,
	idMedioEntrega INT NOT NULL,
	PRIMARY KEY (idDetalleTransaccion),
	FOREIGN KEY (idTransaccion) REFERENCES transacciones (idTransaccion) ON DELETE CASCADE,
	FOREIGN KEY (idMedioEntrega) REFERENCES mediosDeEntrega (idMedioEntrega) ON DELETE CASCADE
);

CREATE TABLE categorias(
	idCategoria INT AUTO_INCREMENT,
	nombreCategoria VARCHAR(20),
	subCategoria VARCHAR(20),
	descripcionCategoria VARCHAR(30),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idCategoria)
);


CREATE TABLE tiposDeProblemas(
	idTipoProblema INT AUTO_INCREMENT,
	tipoProblema VARCHAR(20),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoProblema)
);

CREATE TABLE devoluciones(
	idDevolucion INT AUTO_INCREMENT,
	ivaDevolucion INT(5) UNSIGNED,
	montoConIvaDevolucion NUMERIC(7,2) UNSIGNED,
	fechaDevolucion DATETIME DEFAULT NOW(),
	motivoDevolucion VARCHAR(20),
	estatusBL tinyint(2) default 1,
	idCliente INT NOT NULL,
	idTipoProblema INT NOT NULL,
	PRIMARY KEY (idDevolucion),
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE,
	FOREIGN KEY (idTipoProblema) REFERENCES tiposDeProblemas (idTipoProblema) ON DELETE CASCADE
);

CREATE TABLE compensaciones(
	idCompensacion INT AUTO_INCREMENT,
	tipoCompensacion VARCHAR(25),
	estatusBL tinyint(2) default 1,
	idDevolucion INT NOT NULL,
	PRIMARY KEY (idCompensacion),
	FOREIGN KEY (idDevolucion) REFERENCES devoluciones (idDevolucion) ON DELETE CASCADE
);


CREATE TABLE productos(
	idProducto INT AUTO_INCREMENT,
	nombreProducto VARCHAR(20),
	detalleProducto VARCHAR(40),
	contenidoProducto VARCHAR(40),
	fechaCaducidadProducto DATE,
	paisOrigenProducto VARCHAR(20),
	stockProducto INT(5),
	puntosProducto INT(5) UNSIGNED,
	precioUnitarioProducto NUMERIC(7,2) UNSIGNED,
	precioMayoreoProducto NUMERIC(7,2) UNSIGNED,
	estatusBL tinyint(2) default 1,
	fechaRegistroProducto DATETIME DEFAULT NOW(),
	fechaActualizacionProducto DATETIME DEFAULT NOW(),
	idCategoria INT NOT NULL,
	idAlmacen INT NOT NULL,
	PRIMARY KEY (idProducto),
	FOREIGN KEY (idCategoria) REFERENCES categorias (idCategoria) ON DELETE CASCADE,
	FOREIGN KEY (idAlmacen) REFERENCES almacenes (idAlmacen) ON DELETE CASCADE
);

--AQUI COMIENZAN LAS TABLAS DE RELACIONES. CUANDO ES DE MUCHOS A MUCHOS EN CARDINALIDAD, GENERO UNA NUEVA TABLA PARA EVITAR REPETICION DE REGISTROS

CREATE TABLE tiposDeClientes_clientes(
	idTipoCliente INT NOT NULL,
	idCliente INT NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoCliente, idCliente),
	FOREIGN KEY (idTipoCliente) REFERENCES tiposDeClientes (idTipoCliente) ON DELETE CASCADE,
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);

CREATE TABLE premios_clientes(
	idPremio INT NOT NULL,
	idCliente INT NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idPremio, idCliente),
	FOREIGN KEY (idPremio) REFERENCES premios (idPremio) ON DELETE CASCADE,
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);


CREATE TABLE transacciones_productos(
	idTransaccion INT NOT NULL,
	idProducto INT NOT NULL,
	numeroProductosEnTransaccion INT(6),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTransaccion, idProducto),
	FOREIGN KEY (idTransaccion) REFERENCES transacciones (idTransaccion) ON DELETE CASCADE,
	FOREIGN KEY (idProducto) REFERENCES productos (idProducto) ON DELETE CASCADE
);

CREATE TABLE transacciones_clientes(
	idTransaccion INT NOT NULL,
	idCliente INT NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTransaccion, idCliente),
	FOREIGN KEY (idTransaccion) REFERENCES transacciones (idTransaccion) ON DELETE CASCADE,
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);

CREATE TABLE devoluciones_productos(
	idDevolucion INT NOT NULL,
	idProducto INT NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idDevolucion, idProducto),
	FOREIGN KEY (idDevolucion) REFERENCES devoluciones (idDevolucion) ON DELETE CASCADE,
	FOREIGN KEY (idProducto) REFERENCES productos (idProducto) ON DELETE CASCADE
);


CREATE TABLE proveedores_productos(
	idProveedor INT NOT NULL,
	idProducto INT NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idProveedor, idProducto),
	FOREIGN KEY (idProveedor) REFERENCES proveedores (idProveedor) ON DELETE CASCADE,
	FOREIGN KEY (idProducto) REFERENCES productos (idProducto) ON DELETE CASCADE
);

CREATE TABLE almacenes_categorias(
	idAlmacen INT NOT NULL,
	idProducto INT NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idAlmacen, idProducto),
	FOREIGN KEY (idAlmacen) REFERENCES almacenes (idAlmacen) ON DELETE CASCADE,
	FOREIGN KEY (idProducto) REFERENCES productos (idProducto) ON DELETE CASCADE
);

CREATE TABLE compensaciones_clientes(
	idCompensacion INT NOT NULL,
	idCliente INT NOT NULL,
	fechaCompensacion DATETIME DEFAULT NOW(),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idCompensacion, idCliente),
	FOREIGN KEY (idCompensacion) REFERENCES compensaciones (idCompensacion) ON DELETE CASCADE,
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);


--REGISTROS PARA PRUEBA


--PREMIOS:
INSERT INTO premios (idPremio,premio,descripcionPremio)
VALUES (NULL, 'envio gratis', 'unicamente republica mexicana'),
			 (NULL, '15% descuento', 'unicamente en mascotas');

--TIPOS DE CLIENTES:
INSERT INTO tiposDeClientes (idTipoCliente,tipoCliente,descripcionTipoCliente)
VALUES (NULL, 'premium', 'descuentos, unicos envios gratis'),
			 (NULL, 'premiado', 'segun sea el premio');

--TIPOS DE PROBLEMAS:
INSERT INTO tiposDeProblemas (idTipoProblema,tipoProblema)
VALUES (NULL, 'caducado'),
			 (NULL, 'mal estado');


--TIPOS DE USUARIOS
INSERT INTO tiposDeUsuarios (idTipoUsuario,tipoUsuario,privilegiosTipoUsuario)
VALUES (NULL, 'gerente','ver,eliminar,editar,agregar'),
			 (NULL, 'vendedor', 'ver');


--TIPOS DE PAGO:
INSERT INTO tiposDePagos (idTipoPago,tipoPago,viaTipoPago, descripcionTipoPago)
VALUES (NULL, 'tarjeta credito','visa', '12 meses s/intereses'),
			 (NULL, 'efectivo', 'caja', 'sin descripcion');

--MEDIO DE ENTREGA:
INSERT INTO mediosDeEntrega (idMedioEntrega,medioEntrega,viaMedioEntrega, descripcionMedioEntrega)
VALUES (NULL, 'envio','DHL', 'sucursal'),
			 (NULL, 'envio','fedex', 'domicilio');

--ALMACENES:
INSERT INTO almacenes (idAlmacen,ciudadAlmacen,estadoAlmacen,paisAlmacen,direccionAlmacen,referenciaAlmacen,telefonoAlmacen)
VALUES (NULL, 'abasolo', 'gto', 'mexico', 'primavera 217','cerca de aurrera', '234211'),
			 (NULL, 'irapuato', 'gto', 'mexico', 'las fresas 219', 'esquina hidalgo','4409245');

--CATEGORIAS:
INSERT INTO categorias (idCategoria,nombreCategoria,subCategoria,descripcionCategoria)
VALUES (NULL, 'articulos', 'correas', 'tambien se incluyen pecheras'),
			 (NULL, 'alimentos', 'alimento humedo', 'productos unicamente enlatados');

--VENDEDORES:
INSERT INTO vendedores (idVendedor,nombreVendedor,ciudadVendedor,estadoVendedor,direccionVendedor,telefonoVendedor,emailVendedor,fechaNacimientoVendedor,rfcVendedor,numeroSeguroSocialVendedor,antiguedadVendedor)
VALUES (NULL, 'vendedor1', 'abasolo', 'gto', 'primavera 217', '4291226929', 'vendedor1@vendedor1.com', '2019-08-13', 'JKSLEOR', '234211','4'),
			 (NULL, 'vendedor2', 'irapuato', 'gto', 'las fresas 219', '4621226929', 'vendedor2@vendedor2.com', '2019-08-15', 'FGRFDSG', '4409245','3');

--USUARIOS:
INSERT INTO usuarios (idUsuario,nombreUsuario,emailUsuario,contraseniaUsuario,idVendedor,idTipoUsuario)
VALUES (NULL, 'prueba1', 'prueba1@prueba1.com', '12345',NULL, '1');

--PROVEEDORES:
INSERT INTO proveedores (idProveedor,nombreProveedor,ciudadProveedor,estadoProveedor,paisProveedor,direccionProveedor,telefonoProveedor,emailProveedor,descripcionProveedor)
VALUES (NULL, 'proveedor1', 'abdul', 'guato', 'india','alaa 210','2121230987','proveedor1@proveedor1.com','croquetas premium baratas'),
 			 (NULL, 'proveedor2', 'irapuato', 'gto', 'mexico','fresas 123','2121230987','proveedor2@proveedor2.com','proteina premium baratas');

--CLIENTES:
INSERT INTO clientes (idCliente,nombreCliente,apellidoPaternoCliente,apellidoMaternoCliente,ciudadCliente,estadoCliente,paisCliente,direccionCliente,coloniaCliente,cpCliente,telefonoCliente,emailCliente, constraseniaCliente, puntuajeCliente,fechaRegistroCliente,fechaActualizacionCliente,idTipoCliente)
VALUES (NULL, 'cliente1', 'perez', 'figueroa', 'abasolo','gto','mexico','juarez 101','colonia juarez','36970','4291093589','cliente1@cliente1.com','1234','1200',NULL,NULL,1),
			 (NULL, 'cliente2', 'conde', 'jimenez', 'leon','gto','mexico','juarez 201','colonia juarez','36970','4291093589','cliente2@cliente2.com','1234','1200',NULL,NULL,2);

--PRODUCTOS:
INSERT INTO productos (idProducto,nombreProducto,detalleProducto,contenidoProducto,fechaCaducidadProducto,paisOrigenProducto,stockProducto,puntosProducto,precioUnitarioProducto,precioMayoreoProducto,idCategoria,idAlmacen)
VALUES (NULL, 'collar de castigo', 'marca granpet','1 corrar de castigo mediano',NULL,'e.u.','20','100','30.00','23.22','1','1'),
			(NULL, 'carne de res', 'marca dogchow','caja 24 latas de 480grs','2019-09-08','india.','10','200','299.99','269.99','2','2'),
			(NULL, 'collar de entrenar', 'marca granpet','1 corrar de castigo mediano','2019-08-08','e.u.','20','100','30.00','23.22','1','1'),
			(NULL, 'correa', 'marca granpet','1 corrar de castigo mediano','2019-08-08','e.u.','20','100','30.00','23.22','1','1');

--COMPRAS:
INSERT INTO compras (montoCompra,idUsuario,idProveedor)
VALUES ('300.00', '1','1'),
			('400.00', '1','1');

--VENTAS - COMPRAS:
INSERT INTO transacciones (idTransaccion,montoNoIvaTransaccion,ivaTransaccion,montoConIvaTransaccion,cantidadTransaccion,idVendedor, idTipoPago)
VALUES (NULL, '30.00', '16','34.80','1','1','1'),
			 (NULL, '299.99', '16','347.98','1','1','1');

--DEVOLUCIONES:
INSERT INTO devoluciones (idDevolucion,ivaDevolucion,montoConIvaDevolucion,motivoDevolucion,idCliente,idTipoProblema)
VALUES (NULL, '16','34.80','mal estado, oxidado','1','1'),
			 (NULL, '16','347.98','caducada','1','2');

--COMPENSACIONES:
INSERT INTO compensaciones (idCompensacion,tipoCompensacion,idDevolucion)
VALUES (NULL, 'regreso dinero','1'),
			 (NULL, 'cambio producto','2');

--RELACION COMPENSACIONES-CLIENTES:
INSERT INTO compensaciones_clientes (idCompensacion,idCliente)
VALUES ('2', '1'),
		('1', '2');

--RELACION TRANSACCIONES-CLIENTES:
INSERT INTO transacciones_clientes (idTransaccion,idCliente)
VALUES ('2', '1'),
		('1', '2');



--CONSULTAS *NOTA CORRIJA LAS FECHAS PARA QUE SE PUEDA HACER LAS SUMAS:

-- MONTO DE COMPRAS
SELECT sum(montoCompra) from compras WHERE fechaCompra BETWEEN '2019-09-23 00:00:00' AND '2019-09-23 23:59:59';

-- UTILIDAD
select ((select ifnull(sum(montoConIvaTransaccion),0) from transacciones where fechaTransaccion between '2019-08-11 00:00:00' and '2019-09-28 23:59:59') - (select ifnull(sum(montoCompra),0) from compras where fechaCompra between '2019-09-23 00:00:00' and '2019-09-24 23:59:59')) AS total;

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


--PUNTOS POR NUMERO DE COMPRAS A CLIENTES:
SELECT clientes.nombreCliente, clientes.idCliente, clientes.puntuajeCliente, count(*) as compras 
FROM transacciones_clientes 
INNER JOIN clientes ON transacciones_clientes.idCliente = clientes.idCliente
INNER JOIN transacciones ON transacciones_clientes.idTransaccion = transacciones.idTransaccion
WHERE fechaTransaccion between '2019-09-23 00:00:00' and '2019-09-28 23:59:59' 
group by nombreCliente order by compras DESC;


--MULTIPLICA EL NUMERO DE PRODUCTOS COMPRADOS Y DESPUES LOS SUMA PARA DAR EL "VALOR TOTAL" DE PUNTOS POR USUARIO:
SELECT transacciones_clientes.idCliente, clientes.nombreCliente, productos.nombreProducto, sum(productos.puntosProducto * transacciones.cantidadTransaccion) as puntosTotales
FROM transacciones_clientes
INNER JOIN clientes ON transacciones_clientes.idCliente = clientes.idCliente
INNER JOIN productos ON transacciones_clientes.idTransaccion = productos.idProducto
INNER JOIN transacciones ON transacciones_clientes.idTransaccion = transacciones.idTransaccion
group by nombreCliente;









	
