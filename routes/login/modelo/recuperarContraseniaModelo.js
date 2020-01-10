var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');
var nodemailer = require('nodemailer');


//INICIO - ENVIAR CORREO

/*WEB SERVICE QUE CONSTA EN GENERAR UN EMAIL QUE ENVIA UNA URL QUE REDIRIGE A UN FORMULARIO PARA EL RESTABLECIMIENTO DE CONTRASEÑA*/
exports.enviarCorreo = function(req) {
  return new Promise((resolve, reject) => {
    let body = req.body; //contiene el correo del usuario

    payload = {
      emailUsuario: body.emailUsuario
    }
    expiracion = {
      expiresIn: 60 * 60 * 24 // expira en 24 horas
    }

    //generando el jwt configurados con los objetos anteriores
    jsonWebToken.sign(payload, jwt.claveSecreta, expiracion, function(error, token) {
      if (token) {

        //informacion requerida para conectarnos a nuestro servicio de correo
        var transporter = nodemailer.createTransport({
          service: 'yandex',
          auth: {
            user: 'JLGallardoV@yandex.com',
            pass: 'Princesa.Athena.Yara.Canela'
          }
        });

        //configurando el correo
        var mailOptions = {
          from: 'JLGallardoV@yandex.com',
          to: body.emailUsuario,
          subject: 'Restablece tu contraseña',
          text: 'Entra a este enlace para reestablecer tu contraseña: http://localhost:4200/recuperarContrasenia?token='+token+'&idUsuario='+body.idUsuario
        };

        //console.log("esto es lo que se envia: ", body.emailUsuario,".",token);

        //enviamos el correo ya configurado segun los objetos recibidos en las lineas de arriba
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'correo enviado satisfactoriamente'
            });
          }
        });

      }
      if (error) {
        //en caso de que por alguna razon no se genere el jwt
        reject({
          estatus: -1,
          respuesta: error
        });
      }
    });
  });

} // FIN - ENVIAR CORREO


//INICIO - VERIFICAR TOKEN

//CON ESTE WS REGRESAREMOS AL CLIENTE SI EL USUARIO QUE ENVIO EL TOKEN FUE EL CORRECTO O NO
exports.verificarJWT = function(req) {
  return new Promise((resolve, reject) => {
    let body = req.body;
    jsonWebToken.verify(body.jwt, jwt.claveSecreta, function(error, decoded) {
      if (decoded) {
        console.log("entro a jwt correcto");
        resolve({
          estatus: 1,
          respuesta: "Token correcto"
        });
      } else if (error) {
        reject({
          estatus: -1,
          respuesta: "Token incorrecto, intenta generar de nuevo un link a tu email"
        });
      }
    });
  });
}//FIN - VERIFICAR TOKEN



//INICIO - NUEVA CONTRASEÑA
//CON ESTE WS PRACTICAMENTE ACTUALIZAMOS LA CONTRASEÑA DEL USUARIO SOLICITANTE
exports.cambiarContrasenia = function(req) {
  return new Promise((resolve, reject) => {

    let body = req.body;

    req.getConnection(function(error, database) {
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      } else {
        let contraseniaUsuario = body.contraseniaUsuario;

        let query = `update usuarios set contraseniaUsuario = '${contraseniaUsuario}', fechaActualizacionUsuario = now() where idUsuario = ${body.idUsuario}`; //las comillas son diferentes


        database.query(query, function(error, success) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 1,
              respuesta: 'contraseña actualizada correctamente'
            });
          }
        });
      }
    });
  });//FIN - NUEVA CONTRASEÑA
}
