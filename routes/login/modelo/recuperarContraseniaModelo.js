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
          service: 'gmail',
          auth: {
            user: '216030181@uppenjamo.edu.mx',
            pass: 'gokuxsiempre00'
          }
        });

        //configurando el correo
        var mailOptions = {
          from: '216030181@uppenjamo.edu.mx',
          to: body.emailUsuario,
          subject: 'Restablece tu contraseña',
          text: 'Entra a este enlace para reestablecer tu contraseña: http://localhost:4200/recuperarContrasenia?token='+token+'&idUsuario='+body.idUsuario,
          html: `
                <!doctype html>
                <html>
                <head>
                  <meta charset="utf-8">
                    <style>
                      .fondo{
                        background: #012440;
                      }
                      .cardFormulario {
                        background:white;
                        margin: auto;
                        margin-top: 20px;
                        border-radius: 10px;
                        height: auto;
                        width: 600px;
                        border-radius: 6px;
                        box-shadow: #353434 0px 1px 4px 0px;
                      }
                    </style>
                </head>
                <body>
                  <div class="fondo">
                    <br>
                    <div class="cardFormulario">
                      <div style="text-align: center;">
                        <br>
                        <img src="https://live.staticflickr.com/65535/49363892277_79568ebe79_m.jpg" alt="logo" style="height: 145px;width: 150px;">
                      </div>
                      <p style="padding:10px;">
                        Hemos detectado que perdiste tu contraseña, no te preocupes, podemos resolver tal problema, en el enlace que te dejamos abajo podras ingresar a un formulario exclusivo para ti el cual te permitirá crear una nueva contraseña, ojo, solo tienes 24 hrs, de lo contrario tendras que volver a generar un enlace:
                        <br>
                        <br>
                        <a href="http://localhost:4200/recuperarContrasenia?token=${token}&idUsuario=${body.idUsuario}">
                          Entra a este enlace para restablecer tu contraseña
                        </a>
                      </p>
                    </div>
                    <br>
                  </div>
                </body>
                </html>
                `
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
