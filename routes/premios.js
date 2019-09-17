var express = require('express');
var router = express.Router();
var jwt = require('../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');

/*añadiendo cabeceras:*/
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});


/*seguridad por jwt*/

/*web service para listar premios*/
router.get('/listarPremios',function(req,res,next){
	try {
		req.getConnection(function(error,db){
			if (error) {
				console.log(error);
				return next(error);
			}
			else{
				let query = 'SELECT * FROM premios where estatusBL = 1';
				db.query(query,function(error, success){
					if (error) {
						console.log('error al ejecutar query', error);
						return next(error);
					}
					else{
						console.log(success);
						var resultados = [];
						console.log(success);

						/*for (var i in success) {
							success[i].valido = true;
						}*/
						res.json({
							estatus: 1,
							respuesta: success
						});
					}
				});
			}
		});
	}
	catch (error) {
		next(error); //cualquier error ocurrido lo salta
	}
});



/*web service para agregar un nuevo premio*/
router.post('/agregarPremio', function(req, res, next){
	try
	{
		let body = req.body;
		req.getConnection(function(error, database){
			if(error)
			{
				return next(error);
			}
			else
			{
				let query = 'insert into premios set ?';

				let requestBody = {
					premio: body.premio,
					descripcionPremio: body.descripcionPremio,
				};

				database.query(query, requestBody, function(error, success){
					if(error)
					{
						console.log('error en query ', error);
						return next(error);
					}
					else
					{
						res.json({
							estatus: 1,
							respuesta: 'premio dado de alta correctamente'
						});
					}
				});
			}
		});
	}
	catch(error)
	{
		return next(error);
	}
});



/*web service para actualizar premio*/
router.put('/actualizarPremio/:idPremio', function(req, res, next){
	try
	{
		let body = req.body;
		let idPremio = req.params.idPremio;
		req.getConnection(function(error, database){
			if(error)
			{
				return next(error);
			}
			else
			{
				let query = `update premios set ? where idPremio = ${idPremio}`;

				let requestBody = {
					premio: body.premio,
					descripcionPremio: body.descripcionPremio,
				};

				database.query(query, requestBody, function(error, success){
					if(error)
					{
						console.log('error en query ', error);
						return next(error);
					}
					else
					{
						console.log('inserción exitosa: ', success);
						res.json({
							estatus: 1,
							respuesta: 'premio actualizado correctamente'
						});
					}
				});
			}
		});
	}
	catch(error)
	{
		return next(error);
	}
});


/*web service para eliminar premio (boorado logico)*/
router.delete('/eliminarPremio/:idPremio', function(req, res, next){
	try
	{
		let idPremio = req.params.idPremio;
		req.getConnection(function(error, database){
			if(error)
			{
				return next(error);
			}
			else
			{
				let query = `update premios set ? where idPremio = ${idPremio}`;

				let requestBody = {
					estatusBL: 0
				};

				database.query(query, requestBody, function(error, success){
					if(error)
					{
						console.log('error en query ', error);
						return next(error);
					}
					else
					{
						console.log('eliminación exitosa: ', success);
						res.json({
							estatus: 1,
							respuesta: 'premio eliminado correctamente'
						});
					}
				});
			}
		});
	}
	catch(error)
	{
		return next(error);
	}
});

module.exports = router;
