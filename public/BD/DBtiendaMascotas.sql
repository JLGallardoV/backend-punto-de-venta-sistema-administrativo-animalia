--Nota: SE USO ON DELETE CASCADE PARA QUE AL MOMENTO DE ELIMINAR UN REGISTRO QUE ESTE SINCRONIZADO MEDIANTE RELACIONES, NO AFECTE Y ELIMINE ORDENADAMENTE CADA RELACION DONDE SE HAGA PRESENTE.
--anexar a datos importantes fecha de registro y modificacion.
CREATE DATABASE tiendaMascotas;

USE tiendaMascotas;

CREATE TABLE premios(
	idPremio INT UNSIGNED AUTO_INCREMENT,
	premio VARCHAR(100),
	descripcionPremio VARCHAR(70),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idPremio)
);


CREATE TABLE tiposDeClientes(
	idTipoCliente INT UNSIGNED AUTO_INCREMENT,
	tipoCliente VARCHAR(100),
	descripcionTipoCliente VARCHAR(70),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoCliente)
);

CREATE TABLE clientes(
	idCliente INT UNSIGNED AUTO_INCREMENT,
	nombreCliente VARCHAR(100),
	apellidoPaternoCliente VARCHAR(100),
	apellidoMaternoCliente VARCHAR(100),
	ciudadCliente VARCHAR(100),
	estadoCliente VARCHAR(100),
	paisCliente VARCHAR(100),
	direccionCliente VARCHAR(100),
	coloniaCliente VARCHAR(100),
	cpCliente INT(7),
	telefonoCliente VARCHAR(100),
	emailCliente VARCHAR(40),
	contraseniaCliente BLOB,
	puntuajeCliente INT(5) UNSIGNED,
	estatusBL tinyint(2) default 1,
	fechaRegistroCliente DATETIME DEFAULT NOW(),
	fechaActualizacionCliente DATETIME DEFAULT NOW(),
	idTipoCliente INT UNSIGNED NOT NULL,
	PRIMARY KEY (idCliente),
	FOREIGN KEY (idTipoCliente) REFERENCES tiposDeClientes (idTipoCliente) ON DELETE CASCADE
);


CREATE TABLE carritos(
	idCarrito INT UNSIGNED AUTO_INCREMENT,
	numeroProductosCarrito INT(4) UNSIGNED,
	montoTotalCarrito NUMERIC(7,2) UNSIGNED,
	estatusBL tinyint(2) default 1,
	idCliente INT UNSIGNED NOT NULL,
	PRIMARY KEY (idCarrito),
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);


CREATE TABLE vendedores(
	idVendedor INT UNSIGNED AUTO_INCREMENT,
	nombreVendedor VARCHAR(100),
	ciudadVendedor VARCHAR(100),
	estadoVendedor VARCHAR(100),
	direccionVendedor VARCHAR(100),
	telefonoVendedor VARCHAR(100),
	emailVendedor VARCHAR(40),
	fechaNacimientoVendedor DATE,
	rfcVendedor VARCHAR(100),
	numeroSeguroSocialVendedor INT(10),
	antiguedadVendedor tinyint(3) UNSIGNED,
	fechaRegistroVendedor DATETIME DEFAULT NOW(),
	fechaActualizacionVendedor DATETIME DEFAULT NOW(),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idVendedor)
);

CREATE TABLE tiposDeUsuarios(
	idTipoUsuario INT UNSIGNED AUTO_INCREMENT,
	tipoUsuario VARCHAR(100),
	privilegiosTipoUsuario VARCHAR(100),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoUsuario)
);

CREATE TABLE usuarios(
	idUsuario INT UNSIGNED AUTO_INCREMENT,
	nombreUsuario VARCHAR(100),
	emailUsuario VARCHAR(100),
	contraseniaUsuario BLOB,
	estatusBL tinyint(2) default 1,
	fechaRegistroUsuario DATETIME DEFAULT NOW(),
	fechaActualizacionUsuario DATETIME DEFAULT NOW(),
	idVendedor INT UNSIGNED,
	idTipoUsuario INT UNSIGNED NOT NULL,
	PRIMARY KEY (idUsuario),
	FOREIGN KEY (idVendedor) REFERENCES vendedores (idVendedor) ON DELETE CASCADE,
	FOREIGN KEY (idTipoUsuario) REFERENCES tiposDeUsuarios (idTipoUsuario) ON DELETE CASCADE
);

CREATE TABLE accesos(
	idAcceso INT UNSIGNED AUTO_INCREMENT,
	fechaAcceso DATETIME DEFAULT NOW(),
	fechaModificacionAcceso DATETIME DEFAULT NOW(),
	accionAcceso VARCHAR(100),
	estatusBL tinyint(2) default 1,
	idUsuario INT UNSIGNED NOT NULL,
	PRIMARY KEY (idAcceso),
	FOREIGN KEY (idUsuario) REFERENCES usuarios (idUsuario) ON DELETE CASCADE
);

CREATE TABLE proveedores(
	idProveedor INT UNSIGNED AUTO_INCREMENT,
	nombreProveedor VARCHAR(100),
	ciudadProveedor VARCHAR(100),
	estadoProveedor VARCHAR(100),
	paisProveedor VARCHAR(100),
	direccionProveedor VARCHAR(100),
	telefonoProveedor VARCHAR(100),
	emailProveedor VARCHAR(100),
	descripcionProveedor VARCHAR(100),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idProveedor)
);


CREATE TABLE compras(
	idCompra INT UNSIGNED AUTO_INCREMENT,
	montoCompra NUMERIC(7,2) UNSIGNED,
	idUsuario INT UNSIGNED,
	idProveedor INT UNSIGNED,
	fechaCompra DATETIME DEFAULT NOW(),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idCompra),
	FOREIGN KEY (idUsuario) REFERENCES usuarios (idUsuario) ON DELETE CASCADE,
	FOREIGN KEY (idProveedor) REFERENCES proveedores (idProveedor) ON DELETE CASCADE
);


CREATE TABLE almacenes(
	idAlmacen INT UNSIGNED AUTO_INCREMENT,
	ciudadAlmacen VARCHAR(100),
	estadoAlmacen VARCHAR(100),
	paisAlmacen VARCHAR(100),
	direccionAlmacen VARCHAR(100),
	referenciaAlmacen VARCHAR(100),
	telefonoAlmacen VARCHAR(40),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idAlmacen)
);


CREATE TABLE tiposDePagos(
	idTipoPago INT UNSIGNED AUTO_INCREMENT,
	tipoPago VARCHAR(100),
	viaTipoPago VARCHAR(100),
	descripcionTipoPago VARCHAR(100),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoPago)
);


CREATE TABLE transacciones(
	idTransaccion INT UNSIGNED AUTO_INCREMENT,
	montoNoIvaTransaccion NUMERIC(7,2) UNSIGNED,
	ivaTransaccion INT(5) UNSIGNED,
	montoConIvaTransaccion NUMERIC(7,2) UNSIGNED,
	fechaTransaccion DATETIME DEFAULT NOW(),
	estatusBL tinyint(2) default 1,
	idVendedor INT UNSIGNED NOT NULL,
	PRIMARY KEY (idTransaccion),
	FOREIGN KEY (idVendedor) REFERENCES vendedores (idVendedor) ON DELETE CASCADE
);

CREATE TABLE mediosDeEntrega(
	idMedioEntrega INT UNSIGNED AUTO_INCREMENT,
	medioEntrega VARCHAR(100),
	viaMedioEntrega VARCHAR(100),
	descripcionMedioEntrega VARCHAR(100),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idMedioEntrega)
);


CREATE TABLE detallesTransacciones(
	idDetalleTransaccion INT UNSIGNED AUTO_INCREMENT,
	ciudadDetalleTransaccion VARCHAR(100),
	estadoDetalleTransaccion VARCHAR(100),
	paisDetalleTransaccion VARCHAR(100),
	observacionesDetalleTransaccion VARCHAR(100),
	estatusBL tinyint(2) default 1,
	idTransaccion INT UNSIGNED NOT NULL,
	idMedioEntrega INT UNSIGNED NOT NULL,
	PRIMARY KEY (idDetalleTransaccion),
	FOREIGN KEY (idTransaccion) REFERENCES transacciones (idTransaccion) ON DELETE CASCADE,
	FOREIGN KEY (idMedioEntrega) REFERENCES mediosDeEntrega (idMedioEntrega) ON DELETE CASCADE
);

CREATE TABLE categorias(
	idCategoria INT UNSIGNED AUTO_INCREMENT,
	nombreCategoria VARCHAR(100),
	subCategoria VARCHAR(100),
	descripcionCategoria VARCHAR(100),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idCategoria)
);


CREATE TABLE tiposDeProblemas(
	idTipoProblema INT UNSIGNED AUTO_INCREMENT,
	tipoProblema VARCHAR(100),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoProblema)
);
CREATE TABLE compensaciones(
	idCompensacion INT UNSIGNED AUTO_INCREMENT,
	tipoCompensacion VARCHAR(100),
	descripcionCompensacion VARCHAR(100),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idCompensacion)
);

CREATE TABLE devoluciones(
	idDevolucion INT UNSIGNED AUTO_INCREMENT,
	ivaDevolucion INT(5) UNSIGNED,
	montoConIvaDevolucion NUMERIC(7,2) UNSIGNED,
	fechaDevolucion DATETIME DEFAULT NOW(),
	motivoDevolucion VARCHAR(100),
	estatusBL tinyint(2) default 1,
	idCliente INT UNSIGNED NOT NULL,
	idTipoProblema INT UNSIGNED NOT NULL,
	idCompensacion INT UNSIGNED NOT NULL,
	PRIMARY KEY (idDevolucion),
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE,
	FOREIGN KEY (idTipoProblema) REFERENCES tiposDeProblemas (idTipoProblema) ON DELETE CASCADE,
	FOREIGN KEY (idCompensacion) REFERENCES compensaciones (idCompensacion) ON DELETE CASCADE
);

CREATE TABLE productos(
	idProducto INT UNSIGNED AUTO_INCREMENT,
	nombreProducto VARCHAR(100),
	detalleProducto VARCHAR(100),
	contenidoProducto VARCHAR(100),
	fechaCaducidadProducto DATE,
	paisOrigenProducto VARCHAR(100),
	stockProducto INT(5) UNSIGNED,
	puntosProducto INT(5) UNSIGNED,
	precioUnitarioProducto NUMERIC(7,2) UNSIGNED,
	precioMayoreoProducto NUMERIC(7,2) UNSIGNED,
	estatusBL tinyint(2) default 1,
	fechaRegistroProducto DATETIME DEFAULT NOW(),
	fechaActualizacionProducto DATETIME DEFAULT NOW(),
	idCategoria INT UNSIGNED NOT NULL,
	idAlmacen INT UNSIGNED NOT NULL,
	idCompra INT UNSIGNED NOT NULL,
	PRIMARY KEY (idProducto),
	FOREIGN KEY (idCategoria) REFERENCES categorias (idCategoria) ON DELETE CASCADE,
	FOREIGN KEY (idCompra) REFERENCES compras (idCompra) ON DELETE CASCADE,
	FOREIGN KEY (idAlmacen) REFERENCES almacenes (idAlmacen) ON DELETE CASCADE
);

--AQUI COMIENZAN LAS TABLAS DE RELACIONES. CUANDO ES DE MUCHOS A MUCHOS EN CARDINALIDAD, GENERO UNA NUEVA TABLA PARA EVITAR REPETICION DE REGISTROS

CREATE TABLE tiposDeClientes_clientes(
	idTipoCliente INT UNSIGNED NOT NULL,
	idCliente INT UNSIGNED NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTipoCliente, idCliente),
	FOREIGN KEY (idTipoCliente) REFERENCES tiposDeClientes (idTipoCliente) ON DELETE CASCADE,
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);

CREATE TABLE premios_clientes(
	idPremio INT UNSIGNED NOT NULL,
	idCliente INT UNSIGNED NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idPremio, idCliente),
	FOREIGN KEY (idPremio) REFERENCES premios (idPremio) ON DELETE CASCADE,
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);


CREATE TABLE transacciones_productos(
	idTransaccion INT UNSIGNED AUTO_INCREMENT,
	idProducto INT UNSIGNED NOT NULL,
	numeroProductosEnTransaccion INT(6),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTransaccion, idProducto),
	FOREIGN KEY (idTransaccion) REFERENCES transacciones (idTransaccion) ON DELETE CASCADE,
	FOREIGN KEY (idProducto) REFERENCES productos (idProducto) ON DELETE CASCADE
);

CREATE TABLE transacciones_clientes(
	idTransaccion INT UNSIGNED AUTO_INCREMENT,
	idCliente INT UNSIGNED NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTransaccion, idCliente),
	FOREIGN KEY (idTransaccion) REFERENCES transacciones (idTransaccion) ON DELETE CASCADE,
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);

CREATE TABLE transacciones_tiposDePagos(
	idTransaccion INT UNSIGNED AUTO_INCREMENT,
	idTipoPago INT UNSIGNED NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idTransaccion, idTipoPago),
	FOREIGN KEY (idTransaccion) REFERENCES transacciones (idTransaccion) ON DELETE CASCADE,
	FOREIGN KEY (idTipoPago) REFERENCES tiposDePagos (idTipoPago) ON DELETE CASCADE
);

CREATE TABLE devoluciones_productos(
	idDevolucion INT UNSIGNED NOT NULL,
	idProducto INT UNSIGNED NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idDevolucion, idProducto),
	FOREIGN KEY (idDevolucion) REFERENCES devoluciones (idDevolucion) ON DELETE CASCADE,
	FOREIGN KEY (idProducto) REFERENCES productos (idProducto) ON DELETE CASCADE
);

CREATE TABLE almacenes_categorias(
	idAlmacen INT UNSIGNED NOT NULL,
	idProducto INT UNSIGNED NOT NULL,
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idAlmacen, idProducto),
	FOREIGN KEY (idAlmacen) REFERENCES almacenes (idAlmacen) ON DELETE CASCADE,
	FOREIGN KEY (idProducto) REFERENCES productos (idProducto) ON DELETE CASCADE
);

CREATE TABLE compensaciones_clientes(
	idCompensacion INT UNSIGNED NOT NULL,
	idCliente INT UNSIGNED NOT NULL,
	fechaCompensacion DATETIME DEFAULT NOW(),
	estatusBL tinyint(2) default 1,
	PRIMARY KEY (idCompensacion, idCliente),
	FOREIGN KEY (idCompensacion) REFERENCES compensaciones (idCompensacion) ON DELETE CASCADE,
	FOREIGN KEY (idCliente) REFERENCES clientes (idCliente) ON DELETE CASCADE
);

--PROCEDIMIENTO ALMACENADO INSERTAR DATOS A TRANSACCIONES CON SU RESPECTIVO PRODUCTO Y CANTIDAD DE PRODUCTOS
DELIMITER $$
CREATE PROCEDURE transaccionCompleta_procedimiento(IN montoNoIvaTransaccion DECIMAL(7,2) UNSIGNED, IN ivaTransaccion INT(5) UNSIGNED, IN montoConIvaTransaccion DECIMAL(7,2) UNSIGNED, IN idVendedor INT, IN idTipoPago INT, IN idProducto INT, IN numeroProductosEnTransaccion INT UNSIGNED, IN idCliente INT)
BEGIN
	 INSERT INTO transacciones (montoNoIvaTransaccion,ivaTransaccion,montoConIvaTransaccion,idVendedor)
	 VALUES (montoNoIvaTransaccion, ivaTransaccion, montoConIvaTransaccion, idVendedor);
	 INSERT INTO transacciones_productos (idProducto, numeroProductosEnTransaccion)
	 VALUES (idProducto, numeroProductosEnTransaccion);
	 INSERT INTO transacciones_tiposDePagos(idTipoPago)
	 VALUES (idTipoPago);
	 INSERT INTO transacciones_clientes(idCliente)
	 VAlUES (idCliente);
	 UPDATE productos SET stockProducto = (stockProducto - numeroProductosEnTransaccion) WHERE idProducto IN (SELECT idProducto FROM transacciones_productos);
END;
$$
