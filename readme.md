### CORRECCIONES 10-OCT-2019

- TIPOS DE DATO, AGREGA VARCHAR(100) A TODO (x).
- SEPARACION CODIGO SQL
- DOCUMENTA POSTMAN(x)
- QUITAR EL JEJE DE JWT SERVICIO(x)
- AGREGAR CABECERAS.(x)
- EVITAR MODIFICAR, ELIMINAR EN:(x)
  - ACCESOS(x)
  - COMPRAS(x)
  - VENTAS(x)
- NO REGRESAR CONTRASEÑAS(x)
- NO REGRESAR BORRADO LOGICO(x)
- NO REGRESAR FECHA DE REGISTRO (ESTA ES ESTATICA)(x)
- REGRESAR 0 Y NO NULL EN WS DONDE FILTRO ENTRE FECHAS(x)
- VERIFICA DOBLES INSERCIONES EN LA CREACION USUARIO Y CLIENTE!(x)
  - VALIDAR USUARIOS QUE YA EXISTEN(x)
- VERIFICA QUE QUIERES QUE HAGA LA TABLA DE DETALLES - LA TRANSFORME A ENVIOS(x)
  - TIENE MULTIPLES DETALLES PARA UNA VENTAS(x)
- EN LISTAR VENTAS... ¿QUE VENDÍ?(x)
  - HACER LOS INNER JOINS ADECUADOS.(x)
- VERIFICA EL WS DE AGREGAR VENDEDOR.(x)
- HAZ LA RELACION DE MUCHOS A MUCHOS (COMPRAS - PRODUCTOS)(x)
- VERIFICAR WS DEVOLUCIONES (x)
- VERIFICAR WS VERIFY JWT (CATEGORIA) (x)

**NOTAS:**
> 1. *La correccion de comprar y vender muchos productos de diferentes categorias esta en proceso, estamos tan cerca casi a nada de terminar esperamos mañana mismo antes de la revisión tenerla y mostrarla (el proceso de la consulta esta en public/BD/consultas.sql por si quiere ver el procedimiento); probablemente no le funcione el ws de agregar transaccion por lo mismo*

> 2. *El Verify de los JWT ya salio el proceso por completo y respeta el token que es, pero por el momento solo la tengo en el listar categorias, me falta ese mismo codigo incrustrarlo en cada uno de los demas WS, pero pues es lo mismo*

# Gracias
