exports.promesa = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("hola");
    },10000);
  }
);
