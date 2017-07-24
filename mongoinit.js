

//INICIANDO CLIENTE MONGO
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// CONECTANDOSE DEL CLIENTE MONGO
var mongoPath = 'mongodb://localhost:27017/pruebas';
// AL SERVIDOR
MongoClient.connect(mongoPath, function(err, db) {
  assert.equal(null, err);
  console.log("Conectado al servidor de Mongo");
  console.log("Creando colección de datos...");
	crearColeccion(db, function() {
    db.close();
  });
  
});


// CREA LA COLECCION DE DATOS PRESUPUESTO2017
var crearColeccion = function(db, callback) {
  db.createCollection("prueba8",
    function(err, results) {
      console.log("Coleccion creada");
	  console.log("1 de 4 completado");
	  console.log("Importando csv...");
	  console.log("Cargando...");
      callback();
    }
  );
};


//IMPORTANDO BASE DE DATOS DEL CSV A ESA COLECCION

var exec = require('child_process').exec;
setTimeout(function() {
			exec('mongoimport -d pruebas -c prueba8 --type csv --file c:/users/patel/documents/charts/db/presupuesto-2017.csv --headerline', function(error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				console.log("2 de 4 completado");
				console.log("Exportando json...");
				console.log("Cargando...");
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			})
}, 1500);

//EXPORTANDO de MONGODB A UN ARRAY DE JSON
setTimeout(function() {
			exec('mongoexport -d pruebas -c prueba8 --jsonArray --out c:/users/patel/documents/charts/db/prueba8.json', function(error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				console.log("3 de 4 completado");
				console.log("Editando json...");
				console.log("Cargando...");
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			})
}, 4500);

// Ajustando el JSON para la lectura de Jquery Datatable
fs = require('fs');
var contenido;
setTimeout(function() {

			fs.readFile('./db/prueba8.json', {
					encoding: 'utf8'
				}, 
				function read(err, data) {
				if (err) {
					throw err;
				}
				
				
				
				contenido = "{ \"data\": "+data+" }";
				
				
				

					var archiPath = './db/prueba8.json';
					fs.writeFile(archiPath, contenido, 
					{
						encoding: 'utf8'
					}, 
					function (err) {
					if (err) 
						return console.log(err);
					console.log("Archivo procesado exitosamente en "+archiPath);
					console.log("4 de 4 completado");
					});
			})
}, 8500);




