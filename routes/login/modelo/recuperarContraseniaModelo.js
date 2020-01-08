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
    jsonWebToken.sign(payload, jwt.claveSecreta,expiracion,function(error, token) {
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
          text: 'Entra a este enlace para reestablecer tu contraseña: http://localhost:4200/login/'+token
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
              estatus: 0,
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

}// FIN - ENVIAR CORREO
