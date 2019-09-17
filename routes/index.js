var express = require('express');
var router = express.Router();


/*AÑADIENDO CABECERAS:*/
router.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Accept, Content-Type, Authorization");
	next();
});


module.exports = router;
