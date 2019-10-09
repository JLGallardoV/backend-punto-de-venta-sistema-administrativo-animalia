### 03-OCT-2019

## MODIFICACIONES EN EXPRESS

- Cree de WS login (routes/login) este genera un JWT para un posterior uso.
- WS transaccion este ws lo que hace es que automatiza una venta, llena los datos de la venta asi como como la de las relaciones en las que se ve involucrada, transacciones_clientes, transacciones_productos, transacciones_tiposDePagos, es decir, llenando campos referentes a la transaccion automaticamente se verá reflejada tal transaccion en sus diferentes relaciones. Esto se realizo con prodecimiento almacenado.
- Termine APIs REST que me faltaban (detallesTransacciones (routes/transacciones), devoluciones(routes/devoluiones), tiposProblemas(routes/tiposProblemas))
- Añadi el verify de JWT a WS de listar categorias(routes/categorias/categoriasModelo)


## MODIFICACIONES EN MI DISEÑO DE BASE DE DATOS

- Me vi en la necesidad de eliminar la relación de muchos a muchos de proveedores a productos.
- Añadi una nueva relacion de muchos(productos) a uno(compras).
>todo esto porque al momento de querer ver en que compra se compro que producto por fecha, proveedor, nombre de producto y que usuario realizo la compra no podia ya que no tenia una relacion directa de producto a compra -.-'



### 04-OCT-2019

- Corregi el ws agregar transaccion(routes/transacciones/transaccionesModelo), elimine el atributo idTransaccion ya que es completamente inutil puesto que lo defini como autoincremental


# CORRECCIONES

- TIPOS DE DATO, AGREGA VARCHAR(100) A TODO (x).
- DOCUMENTA POSTMAN(x)
- AGREGAR CABECERAS.(x)
- EVITAR MODIFICAR, ELIMINAR EN:(x)
  - ACCESOS(x)
  - COMPRAS(x)
  - VENTAS(x)
- NO REGRESAR CONTRASEÑAS(x)
- NO REGRESAR BORRADO LOGICO(x)
- NO REGRESAR FECHA DE REGISTRO (ESTA ES ESTATICA)(x)
- REGRESAR 0 Y NO NULL EN WS DONDE FILTRO ENTRE FECHAS(x)
- VERIFICA DOBLES INSERCIONES!(x)
  - VALIDAR USUARIOS QUE YA EXISTEN(x)
- VERIFICA QUE QUIERES QUE HAGA LA TABLA DE DETALLES(x)
  - TIENE MULTIPLES DETALLES PARA UNA VENTAS(x)
- EN LISTAR VENTAS... ¿QUE VENDÍ?(x)
  - HACER LOS INNER JOINS ADECUADOS.(x)
- VERIFICA EL WS DE AGREGAR VENDEDOR.(x)
- HAZ LA RELACION DE MUCHOS A MUCHOS (COMPRAS - PRODUCTOS)(x)



>Para el lunes me quede pendiente en la consulta transaccionCompleta_procedimiento (que actualice el stock)
>Crear relacion carrito productos ¿que productos estan en el carrito?
>Hacer el procedimiento almacendo para realizar una devolucion en forma: (producto, motivo)
>proveedores fecha de actualizacion pendiente
>que pasa si se cancela una venta en caja
