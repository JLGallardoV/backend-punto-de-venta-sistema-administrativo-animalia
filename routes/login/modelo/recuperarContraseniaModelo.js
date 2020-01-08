var jwt = require('../../../public/servicios/jwt');
var jsonWebToken = require('jsonwebtoken');
var nodemailer = require('nodemailer');

/*
Estructura de respuesta del modelo
{
estatus: -1/0/1,
respuesta: []/string
}
*/

/*WEB SERVICE QUE CONSTA EN GENERAR UN EMAIL QUE ENVIA UNA URL QUE REDIRIGE A UN FORMULARIO PARA EL RESTABLECIMIENTO DE CONTRASEÑA----*/
exports.recuperarContrasenia = function(req) {
  return new Promise((resolve, reject) => {
    let body = req.body;

    //    pd: el token formara parte de la url para que sea única*/
    payload = {
      emailUsuario: body.emailUsuario
    }
    jsonWebToken.sign(payload, jwt.claveSecreta, function(error, token) {
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
          subject: 'Prueba envio de correo desde nodejs',
          text: 'funciono!'
        };
        console.log("esto es lo que se envia: ", body.emailUsuario,".",token);
        //enviamos el correo ya configurado segun los datos recibidos en las lineas de arriba
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            reject({
              estatus: -1,
              respuesta: error
            });
          } else {
            resolve({
              estatus: 0,
              respuesta: 'correo enviado satisfactoriamente'
            });
          }
        });

      }
      if (error) {
        reject({
          estatus: -1,
          respuesta: error
        });
      }
    });
  });

}
