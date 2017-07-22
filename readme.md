# GraficARG
## Integración de ejemplo Datos.gob.ar + MongoDB + Jquery Datatables + ChartJS en entorno ElectronJS

![Graficarg](/zextras/muestra.png)

### AUTOR: Patricio J. Gerpe

### Alcance
Es una aplicación de escritorio no empaquetada de código abierto bajo el motor de ElectronJS la cuál carga los datos un csv del presupuesto 2017 descargado del dataset oficial del gobierno Argentino, tomando 3 parametros de interes migra todos los registros a una base de datos persistente en NEDB de manera automatizada, luego renderiza los datos en una tabla de HTML y con dicha información también renderiza un gráfico estilo torta para visualizar dicha información usando Chart.JS.

## Frameworks usados:
- Servidor: Electron v^1.4.8, NodeJS v6.11.1, MongoDB v3.5
- UI: Materialize, Jquery.

Otras tecnologías usadas: ChartJS, Jquery Datatable.


## Requisitos de instalación.
- Git instalado. https://git-scm.com/downloads
- NodeJs instalado. https://nodejs.org/es/download/
- MongoDB instalado. https://www.mongodb.com/download-center
- Electron instalado. `npm install -g electron`

## Instalación

1. Ingresa a una consola de comando.
2. Ejecuta el comando `git clone https://github.com/IAARhub/DatosARG.git `
3. Ubicate en el directorio del repositorio del proyecto.
4. Escribí `npm install .`
5. Dentro de tu disco duro principal crea la carpeta "data". (Ejem: En C:/data) {Este será el directorio del servidor de MongoDB}
6. En una sola consola de comando escribí `mongod --dbpath=<directorio:: EJEM: C:/data>` (Reemplazando por tu directorio que le asignaste al servidor MongoDB en el paso 5. 
## Iniciando base de datos y preparando nuestros datos para la visualizando en Datatables:
7. En otra consola de comandos, dirigite al directorio del repositorio.
8. En un editor de texto plano abrimos "mongoinit.js" y editamos las siguientes lineas de código, remplazando <> por el directorio de nuestro repositoio:

Líneas 35 a 49
```javascript
//IMPORTANDO BASE DE DATOS DEL CSV A ESA COLECCION

var exec = require('child_process').exec;
setTimeout(function() {
			exec('mongoimport -d datosARG -c presupuesto2017 --type csv --file <UBICACION-DEL-REPOSITORIO>/db/presupuesto-2017.csv --headerline', function(error, stdout, stderr) {
			.......
			})
}, 1500);
```

Líneas 51 a 63
```javascript
//EXPORTANDO de MONGODB A UN ARRAY DE JSON
setTimeout(function() {
			exec('mongoexport -d datosARG -c presupuesto2017 --jsonArray --out <UBICACION-DEL-REPOSITORIO>/db/presupuesto.json', function(error, stdout, stderr) {
			.......
			})
}, 4500);
```

8. Ahora en consola, escribimos el comando `node mongoinit.js`




## Corriendo la aplicación
- En una sola consola de comando escribí `mongod --dbpath=<directorio:: EJEM: C:/data` (Reemplaza por el directorio que asignaste en pasos anteriores). Este comando abre el servidor de nuestra base de datos.
- En otra consola de comando, dentro del directorio del proyecto, escribí `npm start` para iniciar nuestra aplicación.




## DEBUGGEANDO
! PARA ACTIVAR DEV TOOLS APRETAR F12


## Fuentes | Documentación

* DOCUMENTACION ELECTRON
https://electron.atom.io/docs/

* Thomas Stuetz (2016). First steps in electron. Youtube. Recuperado de:
https://www.youtube.com/watch?v=ZHeP0ugMoqo

* Simon Schiller (2016). Electron demo. Github. Recuperado de:
https://github.com/simonschiller/electron-demo

* MONGODB Manual. (2017) MongoDB. Recuperado de:
https://docs.mongodb.com/manual

* MONGODB Mongo drivers quick start (2017) MongoDB. Recuperado de:
http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/

* MANUAL DATATABLES. (2017) Datatables. Recuperado de:
https://datatables.net/manual/index


* DOCUMENTACION Chart.JS (2017). Recuperado de:
http://www.chartjs.org/docs/latest/

* Gobierno de la Republica Argentina. Ministerio de Hacienda. Secretaría de Hacienda. Subsecretaría de Presupuesto (2017). Dataset "Ejecución Presupuestaria de la Administración Pública Nacional" --  2016-2017 [Data set: presupuesto-2017.csv]. Recuperado de:
http://datos.gob.ar/dataset/ejecucion-presupuestaria-de-la-administracion-publica-nacional
http://sitiodelciudadano.mecon.gov.ar/datasets/dgsiaf_gastos_listado_general.zip

* DOCUMENTACION OFICIAL del Presupuesto 2017. Ministerio de Hacienda. Secretaría de Hacienda. Subsecretaría de Presupuesto. (2017) Recuperado de:
https://github.com/datosgobar/datasets-portal/blob/master/presupuesto/presupuesto-documentacion.md

* Fuente oficial presupuesto 2017 (2017). 
http://sitiodelciudadano.mecon.gov.ar/sici/#4

* Novas, Pablo (2012). TUTORIAL Mongo y Node. "Buenos amigos, NodeJs MongoDB". FernetJS recuperado de: https://fernetjs.com/2012/08/buenos-amigos-nodejs-mongodb/


