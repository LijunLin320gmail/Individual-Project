let express = require("express");
var path = require('path');
let app = express();
var debug = require('debug')('reactapp:server');
//var app = require('express')();
let http = require('http').createServer(app);
// let io = require('socket.io')(http);
const bodyParser = require('body-parser')
// const MongoClient = require('mongodb').MongoClient
/* routing interface */
var dataRouter = require('./routes/data');


var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))/* Receive and parse post data */


/* Link and instantiate the database */
const mongoose = require('./config/mongoose.js')
const db = mongoose();
/* access interface */
app.use('/data', dataRouter);

http.listen(port, () => {
  console.log("Listening on port ", port);
});
http.on('error', onError);
http.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = http.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

