const electron = require('electron')
const {app, BrowserWindow, Menu} = electron
const path = require('path')
const url = require('url')
fs = require('fs');

//Referencia a libreria para mandar mensajes del main al renderer
const {ipcMain} = require('electron')

// hacemos referencia a la dependencia 
var mongodb = require('mongodb');

// obtenemos el server MongoDB que dejamos corriendo
// *** el puerto 27017 es el default de MongoDB
var server = new mongodb.Server("127.0.0.1", 27017, {});

// obtenemos la base de datos de prueba que creamos
var db = new mongodb.Db('pruebas', server, {})

var totalRegistros = "";
var aggData = "";

// abrimos la base pasando el callback para cuando esté lista para usar
db.open(function (error, client) {
  if (error) throw error;

  //en el parámetro client recibimos el cliente para comenzar a hacer llamadas
  //este parámetro sería lo mismo que hicimos por consola al llamar a mongo
  
  //Obtenemos la coleccion personas que creamos antes
  var collection = db.collection("prueba8");
  
	  //disparamos un query buscando la persona que habiamos insertado por consola
	  collection.find({}).toArray(function(err, docs) {

		//imprimimos en la consola el resultado
		totalRegistros = docs.length;
		console.log(totalRegistros);

		
	  });
	  

	collection.aggregate([
					{
					$project: { "monto_presupuestado" : 1, "programa_desc": 1, _id: 0 }
					},
                    { 
					$group: {"programa_desc": "$\"programa_desc\"", "monto_presupuestado": { $sum: Number("$\"monto_presupuestado\"") } }
					},
                    { 
					$sort: { "monto_presupuestado": -1 } 
					}
					]).toArray(function(err, docs) {

    //imprimimos en la consola el resultado
	aggData = docs;
	console.log(aggData);

	
  });
  

  

});


ipcMain.on('mensaje', (event, arg) => {
	event.sender.send('cantidadDocumentos', totalRegistros, totalLeyesNac)
})







let mainWindow

function createWindow () {

  // Crea la ventana principal
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon:__dirname+"/img/logo.png"

  })

  // Renderizando HTML
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))



  mainWindow.on('closed', () => {
    mainWindow = null

  })
}

electron.app.on('browser-window-created',function(e,window) {
  //Cuando la ventana sea creada asegurate que no tenga menu y este en fullscreen
    window.setMenu(null);
	// Descomenta si queres que inicie en fullscreen.
  //window.setFullScreen(true);
});



// Crea ventana al iniciar app
app.on('ready', () => {
  createWindow()
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

// Cierra app en ventanas cerradass
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Para MacOs
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})









