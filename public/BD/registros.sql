--REGISTROS PRUEBA *NOTA SI SE ACABA DE EJECUTAR EL QUERY DE CREACION, DESHABILITAR EL DELIMITER :
--PREMIOS:
INSERT INTO premios (idPremio,premio,descripcionPremio)
VALUES (NULL, 'envio gratis', 'unicamente republica mexicana'),
			 (NULL, '15% descuento', 'unicamente en mascotas');

--TIPOS DE CLIENTES:
INSERT INTO tiposDeClientes (idTipoCliente,tipoCliente,descripcionTipoCliente)
VALUES (NULL, 'premium', 'descuentos unicos, envios gratis'),
			 (NULL, 'premiado', 'segun sea el premio'),
			 (NULL, 'normal', 'usuario ordinario');

--TIPOS DE PROBLEMAS:
INSERT INTO tiposDeProblemas (idTipoProblema,tipoProblema)
VALUES (NULL, 'caducado'),
			 (NULL, 'mal estado');

--TIPOS DE USUARIOS
INSERT INTO tiposDeUsuarios (idTipoUsuario,tipoUsuario,descripcionTipoUsuario)
VALUES (NULL, 'gerente','opciones completas'),
			 (NULL, 'vendedor', 'opciones limitadas');

--TIPOS DE PAGO:
INSERT INTO tiposDePagos (idTipoPago,tipoPago,viaTipoPago, descripcionTipoPago)
VALUES (NULL, 'tarjeta','visa', '12 meses s/intereses'),
			 (NULL, 'efectivo', 'caja', 'sin descripcion');

--MEDIO DE ENTREGA:
INSERT INTO mediosDeEntrega (idMedioEntrega,viaMedioEntrega, descripcionMedioEntrega)
VALUES (NULL, 'DHL', 'sucursal'),
			 (NULL, 'fedex', 'domicilio');

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
VALUES (NULL, 'prueba1', 'prueba1@prueba1.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',NULL, '1');

--PROVEEDORES:
INSERT INTO proveedores (idProveedor,nombreProveedor,ciudadProveedor,estadoProveedor,paisProveedor,direccionProveedor,telefonoProveedor,emailProveedor,descripcionProveedor)
VALUES (NULL, 'proveedor1', 'abdul', 'guato', 'india','alaa 210','2121230987','proveedor1@proveedor1.com','croquetas premium baratas'),
 			 (NULL, 'proveedor2', 'irapuato', 'gto', 'mexico','fresas 123','2121230987','proveedor2@proveedor2.com','proteina premium baratas');

--CLIENTES:
INSERT INTO clientes (idCliente,nombreCliente,apellidoPaternoCliente,apellidoMaternoCliente,ciudadCliente,estadoCliente,paisCliente,direccionCliente,coloniaCliente,cpCliente,telefonoCliente,emailCliente, contraseniaCliente, puntuajeCliente,fechaRegistroCliente,fechaActualizacionCliente,idTipoCliente)
VALUES (NULL, 'cliente1', 'perez', 'figueroa', 'abasolo','gto','mexico','juarez 101','colonia juarez','36970','4291093589','cliente1@cliente1.com','1234','1200',NULL,NULL,1),
			 (NULL, 'cliente2', 'conde', 'jimenez', 'leon','gto','mexico','juarez 201','colonia juarez','36970','4291093589','cliente2@cliente2.com','1234','1200',NULL,NULL,2);

--CARRITOS:
INSERT INTO carritos (numeroProductosCarrito,montoTotalCarrito,idCliente)
VALUES ('10', '100.00','1');

--PRODUCTOS:
INSERT INTO productos (idProducto,nombreProducto,detalleProducto,contenidoProducto,fechaCaducidadProducto,paisOrigenProducto,stockProducto,puntosProducto,precioUnitarioProducto,precioCompraProducto,idCategoria,idAlmacen)
VALUES (NULL, 'collar de castigo', 'marca granpet','1 corrar de castigo mediano',NULL,'e.u.','20','100','30.00','20','1','1'),
			 (NULL, 'collar de entrenar', 'marca grandog','1 corrar de entrenamiento mediano',NULL,'e.u.','20','100','30.00','20','1','1'),
			 (NULL, 'bulto croqueta adulto', 'marca pedigrie','25 kg','2020-02-10','mexico.','20','100','30.00','20','1','1');


--COMPENSACIONES:
INSERT INTO compensaciones (idCompensacion,tipoCompensacion,descripcionCompensacion)
VALUES (NULL, 'regreso dinero','devolucion total efectivo'),
			 (NULL, 'cambio producto','otro producto del mismo precio');

--DEVOLUCIONES:
INSERT INTO devoluciones (idDevolucion,motivoDevolucion,idCliente,idTipoProblema,idCompensacion,idProducto,idTransaccion)
VALUES (NULL,'mal estado, oxidado','1','1','1','1','1'),
			 (NULL,'caducada','1','2','1','2','1');
