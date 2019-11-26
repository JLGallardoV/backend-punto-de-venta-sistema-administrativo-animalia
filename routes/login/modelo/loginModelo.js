var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');

/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE ----*/
exports.autenticarUsuarios = function(req) {
  console.log("autenticando...");
  //regresaremos una promesa...
  return new Promise((resolve, reject) => {
    //conectar con la base de datos
    let body = req.body;
    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let nombreUsuario = body.nombreUsuario;
        let contraseniaUsuario = body.contraseniaUsuario;
        var query = `select idUsuario,nombreUsuario,idTipoUsuario from usuarios where nombreUsuario ='${nombreUsuario}' and contraseniaUsuario='${contraseniaUsuario}' and  estatusBL = 1`;

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
                respuesta: "verifica credenciales"
              });
            } else if (success.length > 0) {
              console.log("generando token...");
              payload = {
                idUsuario: success[0].idUsuario,
                nombreUsuario: success[0].nombreUsuario,
                idTipoUsuario: success[0].idTipoUsuario
              };
              jsonWebToken.sign(payload,jwt.claveSecreta, function(error, token){
                if (token) {
                  console.log("tu token: ", token);
                  resolve({
                    estatus: 1,
                    respuesta: token
                  });
                }
                if (error) {
                  reject({
                    estatus: -1,
                    respuesta: error
                  });
                }
              });
            }
          }
          /*generando token...*/

        });//fin ejecucion query SQL
      }
    });
  });
} //fin AutenticarUsuarios
